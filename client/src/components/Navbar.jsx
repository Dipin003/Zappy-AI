import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate()
    const { user } = useUser()
    const { openSignIn } = useClerk()

    return (
        <div
            className="
        fixed z-50 w-full backdrop-blur-2xl
        flex items-center justify-between
        py-3 px-4 sm:px-20 xl:px-32
      "
        >
            <h2
                className="
          text-2xl sm:text-3xl md:text-4xl
          font-bold text-purple-500
          cursor-pointer
        "
                onClick={() => navigate('/')}
            >
                Zappy.ai
            </h2>

            {user ? (
                <UserButton />
            ) : (
                <button
                    onClick={openSignIn}
                    className="flex items-center gap-2 sm:gap-3 rounded-full bg-primary text-white text-xs sm:text-sm px-2 py-1 sm:px-4 sm:py-2 md:px-7 md:py-2.5 cursor-pointer">
                    Get started
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
            )}
        </div>
    )
}

export default Navbar
