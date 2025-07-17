import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

    const navigate = useNavigate()

    const { user } = useUser()
    const { openSignIn } = useClerk()

    return (

        <div className='fixed z-10 backdrop-blur-2xl flex
        items-center justify-between py-3 px-4 sm:px-20 xl:px-32 w-full'>

            <h2 className='text-4xl font-bold text-purple-500 cursor-pointer'
                onClick={() => navigate('/')}
            >Zappy.ai</h2>

            {
                user ? <UserButton /> :
                    (<button
                        onClick={openSignIn}
                        className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>

                        Get started <ArrowRight className='w-4 h-4' />
                    </button>)
            }
        </div>   
    )
}

export default Navbar