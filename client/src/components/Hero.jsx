import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

import { delay, motion } from "framer-motion"

const Hero = () => {

    const navigate = useNavigate()

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: 0.6,
                staggerChildren: 0.2,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 100,
            },
        },
    };

    return (

        <div
            className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center 
        bg-[url(/src/assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center mb-6"
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <motion.h1
                    variants={textVariants}
                    className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]"
                >
                    Create Amazing Content <br />
                    With{" "}
                    <motion.span
                        whileHover={{
                            scale: 1.1,
                            textShadow: "0px 0px 8px rgba(0, 255, 255, 0.8)",
                        }}
                        className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 text-transparent font-extrabold bg-clip-text"
                    >
                        Zappy.AI
                    </motion.span>
                </motion.h1>

                <motion.p
                    variants={textVariants}

                    className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600"
                >
                    Transform your content creation with our suite of premium AI Tools.
                    Write articles, generate images, and enhance your workflow.
                </motion.p>
            </motion.div>

            <motion.div
                className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">

                <motion.button
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    whileHover={{
                        scale: 1.08,
                        boxShadow: "0 0 25px rgba(111, 0, 255, 0.6)",
                        transition: { duration: 0.2, ease: "easeInOut" }
                    }}
                    style={{ boxShadow: "0 0 20px rgba(111, 0, 255, 0.4)" }}
                    className="bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] px-8 py-3 rounded-full text-white font-semibold shadow-lg"
                    onClick={() => navigate('/ai')}
                >
                    Start Creating Now
                </motion.button>


                {/* Secondary CTA */}
                <motion.button
                    whileHover={{
                        scale: 1.05,
                        transition: { type: "spring", stiffness: 300 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="bg-[#1e293b] px-8 py-3 rounded-full border border-gray-600 text-gray-100 font-semibold shadow-md"
                >
                    Watch Demo
                </motion.button>


            </motion.div>
            <motion.div

                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 1.1 }}

                className="flex items-center gap-4 mt-8 mx-auto text-gray-600 px-5">
                <img src={assets.user_group} alt="" className="h-8" />Trusted by 10+ people
            </motion.div>
        </div>

    )
}

export default Hero