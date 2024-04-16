import React from 'react'
import { CiSettings } from "react-icons/ci";
import { LuBellDot } from "react-icons/lu";
import profile from '../../assets/profile.webp'
const Nav = () => {
  return (
    <div className='w-full h-[110px] shadow-lg px-10 bg-yellow-40'>
        <div className='flex items-center h-full  justify-between'>
          <h2 className='text-2xl font-medium text-[#343C6A]'>Dashboard</h2>
          <div className='flex flex-row  items-center gap-7'>
          <CiSettings className='text-3xl text-[#718EBF]' />
          <LuBellDot className='text-3xl text-[#FD5373]' />
          <img className='w-10 h-10 rounded-full' src={profile}/>
          </div>
        </div>
    </div>
  )
}

export default Nav



