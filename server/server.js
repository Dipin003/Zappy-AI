import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import path from 'path'

const app = express()

// Connecting Cloudinary
await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

const __dirname = path.resolve()

app.use('/api', requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))


app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})