import React from 'react'

const Card = ({title,Icon,amount,color,iconColor}) => {
  return (
    <div className='w-[300px]  lg:w-[350px] h-28 bg-white rounded-2xl shadow-md flex gap-5 items-center pl-10'>
        <div className={`${color} h-16 w-16 rounded-full text-white items-center justify-center text-2xl flex`}><Icon className={`${iconColor}`}/></div>
        <div className='flex  flex-col'>
            <p className='text-[#718EBF]'>{title}</p>
            <p className='text-start font-medium text-lg'>$ {amount}</p>
        </div>
    </div>
  )
}

export default Card