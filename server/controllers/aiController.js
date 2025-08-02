import OpenAI from "openai";
import sql from '../configs/db.js'
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import FormData from 'form-data'
import path from 'path';

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});


export const removeImageBackground = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Prepare Remove.bg form data
    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(file.path));
    formData.append('size', 'auto');

    // Call Remove.bg API
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      responseType: 'arraybuffer',
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': process.env.REMOVE_BG_API_KEY,
      },
      timeout: 60000, // optional: increase timeout to 60s
    });

    // Convert ArrayBuffer to Buffer for Cloudinary upload
    const buffer = Buffer.from(response.data, 'binary');

    // Promisify Cloudinary upload_stream
    const uploadFromBuffer = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'background-removed' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    // Upload to Cloudinary
    const cloudinaryResult = await uploadFromBuffer(buffer);

    res.status(200).json({
      success: true,
      message: 'Background removed and uploaded to Cloudinary successfully',
      url: cloudinaryResult.secure_url,
    });
  } catch (error) {
    console.error('Remove.bg or Cloudinary Error:', error);
    res.status(500).json({ success: false, message: 'Failed to remove background or upload image' });
  }
};



export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth()
    const { prompt, length } = req.body
    const plan = req.plan
    const free_usage = req.free_usage

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: "Prompt is required" })
    }

    if (plan !== 'premium' && free_usage >= 10) {
      return res.status(403).json({ success: false, message: "Limit Reached. Upgrade to continue" })
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`

    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      })
    }

    res.json({ success: true, content })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth()
    const { prompt } = req.body
    const plan = req.plan
    const free_usage = req.free_usage

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: "Prompt is required" })
    }

    if (plan !== 'premium' && free_usage >= 10) {
      return res.status(403).json({ success: false, message: "Limit Reached. Upgrade to continue" })
    }

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`

    if (plan !== 'premium') {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1
        }
      })
    }

    res.json({ success: true, content })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth()
    const { prompt, publish } = req.body
    const plan = req.plan

    if (!prompt || prompt.trim() === '') {
      return res.status(400).json({ success: false, message: "Prompt is required" })
    }

    if (plan !== 'premium') {
      return res.status(403).json({ success: false, message: "This feature is only available for premium users" })
    }

    // Clipdrop API
    const formData = new FormData()
    formData.append('prompt', prompt)

    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API_KEY,
        ...formData.getHeaders(),
      },
      responseType: "arraybuffer",
    })

    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`

    // Storing image in Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image)

    await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`

    res.json({ success: true, content: secure_url })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}





export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth?.() || {}
    const { object } = req.body
    const file = req.file
    const plan = req.plan

    // ✅ Validate required data
    if (!file) {
      return res.status(400).json({ success: false, message: "Image file is required" })
    }

    if (!object || object.trim() === '') {
      return res.status(400).json({ success: false, message: "Object to remove is required" })
    }

    if (plan !== 'premium') {
      return res.status(403).json({ success: false, message: "This feature is only available for premium users" })
    }

    // ✅ Upload image to Cloudinary
    let uploadedImage
    try {
      uploadedImage = await cloudinary.uploader.upload(file.path, {
        resource_type: "image",
      })
    } catch (err) {
      console.error("Cloudinary Upload Error:", err)
      return res.status(500).json({ success: false, message: "Image upload failed" })
    }

    const public_id = uploadedImage.public_id

    // ✅ Generate transformation URL
    const transformedImageUrl = cloudinary.url(public_id, {
      transformation: [{
        effect: `gen_remove:${object}`
      }],
      resource_type: "image",
    })

    // ✅ Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type) 
      VALUES (${userId}, ${`Removed ${object} from image`}, ${transformedImageUrl}, 'image')
    `

    // ✅ Respond with image
    res.json({ success: true, content: transformedImageUrl })

  } catch (error) {
    console.error("Unexpected Error:", error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth()
    const file = req.file
    const plan = req.plan

    if (!file) {
      return res.status(400).json({ success: false, message: "Resume file is required" })
    }

    if (plan !== 'premium') {
      return res.status(403).json({ success: false, message: "This feature is only available for premium users" })
    }

    if (file.size > 5 * 1024 * 1024) {
      return res.status(400).json({ success: false, message: "File size should be less than 5MB" })
    }

    const dataBuffer = fs.readFileSync(file.path)
    const pdfData = await pdf(dataBuffer)

    const prompt = `Review the following resume and provide constructive feedback to its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the uploaded resume', ${content}, 'resume-review')`

    res.json({ success: true, content })

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ success: false, message: error.message })
  }
}
