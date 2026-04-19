import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 pt-12 w-full text-gray-500 mt-20 bg-gray-50"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-300 pb-10">
        {/* Logo & Description */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-full md:max-w-sm"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-purple-600 cursor-pointer"
            onClick={() => navigate("/")}
            whileHover={{
              textShadow: "0 0 8px #8B5CF6, 0 0 15px #A78BFA, 0 0 25px #C084FC",
              color: "#9333EA",
              transition: { duration: 0.3 },
            }}
          >
            Zappy.ai
          </motion.h2>
          <p className="mt-5 text-sm md:text-base leading-relaxed">
            Zappy.ai is a platform offering a wide range of AI tools to enhance your creativity. <br />
            Unlock your potential with powerful tools built for creators, developers, and dreamers.
          </p>
        </motion.div>

        {/* Links and Newsletter Container */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row md:flex-1 md:justify-between gap-10"
        >
          {/* Get in Touch Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full sm:max-w-sm"
          >
            <h2 className="font-semibold text-gray-800 mb-4 text-base md:text-lg">
              Get in Touch
            </h2>
            <p className="text-sm md:text-base">
              Have questions or want to collaborate? Send me an email directly.
            </p>

            <div className="flex flex-col md:flex-row items-stretch gap-3 pt-4">

              <a
                href="mailto:kharayatdipin@gmail.com?subject=Let's%20Connect&body=Hi%20Dipin,%0A%0AI%20would%20like%20to%20reach%20out%20to%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 transition-all duration-200 cursor-pointer h-10 px-5 text-white rounded text-sm whitespace-nowrap flex items-center justify-center"
              >
                Email Me
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="pt-6 text-center text-xs sm:text-sm pb-6 text-gray-600"
      >
        © 2026 <a href="/" className="text-purple-500 font-medium">ZappyAI</a>. All Rights Reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;