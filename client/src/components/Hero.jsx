import { useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"


const Hero = () => {

    const navigate = useNavigate()

    return (

        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center 
        bg-[url(/src/assets/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen'>

            <div className="text-center mb-6">
                <h1
                    className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold leading-[1.2]"
                >Create Amazing Content <br /> With
                    <span className="text-teal-500"> Zappy.AI</span>
                </h1>

                <p
                    className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600"
                >
                    Transform your content creation with our suite of premium AI Tools.
                    Write articles, generate Images , and enhance your workFlow.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">

                <button className="bg-primary px-10 py-3 rounded-lg border border-gray-600 hover:scale-102 active:scale-95 transition cursor-pointer text-white"
                    onClick={() => navigate('/ai')}
                >
                    Start creating Now</button>

                <button className="bg-white px-10 py-2 rounded-lg border border-gray-400 hover:scale-102 active:scale-95 transition cursor-pointer"
                >
                    Watch Demo</button>
            </div>
            <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600 px-5">
                <img src={assets.user_group} alt="" className="h-8" />Trusted by 10+ people
            </div>
        </div>

    )
}

export default Hero