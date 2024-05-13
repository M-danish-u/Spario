import React from 'react'

const Card = ({title,Icon,amount,color,iconColor,}) => {
  return (
    <div className='   h- bg-white rounded-xl shadow-m justify-between flex flex-col gap-5 items-cente md:p-8  sm:p-6 p-4'>
        <div className={`${color} h-16 w-16 rounded-full text-white items-center justify-center text-2xl flex`}><Icon className={`${iconColor}`}/></div>
        <div className='flex  flex-col'>
            <p className='text-[#718EBF]'>{title}</p>

            <p className='text-start font-semibold flex items-center text-[25px]'> {amount}</p>
        </div>
    </div>
  )
}

export default Card