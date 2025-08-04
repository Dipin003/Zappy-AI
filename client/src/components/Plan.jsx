
import { PricingTable } from '@clerk/clerk-react'
import { motion } from 'framer-motion';


const Plan = () => {

    return (

        <div className='max-w-2xl mx-auto z-20 my-30'>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 1 }}
                className="text-center">

                <h2 className='text-slate-700 text-[30px]
                font-semibold sm:text-[40px]'>Choose Your Plan</h2>

                <p className='text-gray-500 max-w-lg mx-auto px-6 text-xs sm:text-lg'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
            </motion.div>

            <div className="mt-14 max-sm:mx-8">
                <PricingTable />
            </div>

        </div>
    )
}

export default Plan