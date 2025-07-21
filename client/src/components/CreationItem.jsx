import { useState } from "react"
import Mardown from 'react-markdown'
const CreationItem = ({ item }) => {

    const [expanded, setExpanded] = useState(false)

    return (

        <div
            onClick={() => setExpanded(!expanded)}
            className='p-4 max-w-5xl text-sm bg-white border border-gray-100 rounded-lg cursor-pointer'>
            <div className="flex justify-between items-center gap-4">
                <div className="">
                    <h2>{item.prompt}</h2>
                    <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <button
                    className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>
                    {item.type}</button>
            </div>
            {
                expanded && (
                    <div>
                        {item.type === 'image' ? (
                            <div>
                                <img src={item.img} alt="image"
                                    className="mt-3 w-full max-w-md"
                                />
                            </div>
                        ) : (
                            <div className="mt-2 h-full overflow-y-scroll">

                                <div className="">
                                    <Mardown>
                                        {item.content}
                                    </Mardown>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

export default CreationItem