import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

import { motion } from "framer-motion";

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        <div className="fixed z-50 w-full backdrop-blur-2xl flex items-center justify-between py-3 px-7 sm:px-20  xl:px-32 ">
            <motion.h2
                initial={{ opacity: 0, x: -200 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                onClick={() => navigate("/")}
                whileHover={{
                    textShadow: "0 0 12px rgba(168, 85, 247, 0.8)",
                }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer"
            >
                Zappy.ai
            </motion.h2>

            {user ? (
                <UserButton />
            ) : (
                <motion.button
                    initial={{ opacity: 0, x: 200 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1 }}
                    onClick={openSignIn}
                    className="flex items-center gap-1 sm:gap-3 rounded-full bg-black text-white text-xs sm:text-sm p-1 sm:px-4 sm:py-2 md:px-7 md:py-2.5 cursor-pointer"
                >
                    Get started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
            )}
        </div>
    );
};

export default Navbar;
