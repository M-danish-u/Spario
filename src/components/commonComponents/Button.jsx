import React from 'react'

const Button = ({title}) => {
  return (
    <button className='sm:px-8 px-4 py-2 h-max bg-[#2723F4] text-white flex items-center rounded-md'>{title}</button>
  )
}

export default Button