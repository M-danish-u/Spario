import React from 'react';
import { CiSettings } from 'react-icons/ci';
import { LuBellDot } from 'react-icons/lu';
import profile from '../../assets/profile.webp';
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const route = (pathname) => {
    if (pathname === '/admin/dashboard') {
      return 'Dashboard';
    } else if (pathname === '/admin/store') {
      return 'Store';
    } else if (pathname === '/admin/executive') {
      return 'Executive';
    } else if (pathname === '/admin/transactions') {
      return 'Transactions';
    } else if (pathname === '/admin/route') {
      return 'Route';
    } else if (pathname === '/executive/dashboard') {
      return 'Dashboard';
    } else if (pathname === '/executive/store') {
      return 'Store';
    } else if (pathname === '/executive/transactions') {
      return 'Transactions';
    } else {
      return ''; // Default value if none of the conditions match
    }
  };

  return (
    <div className='w-full h-[110px] shadow-lg px-10 bg-yellow-40'>
      <div className='flex items-center h-full justify-between'>
        <h2 className='text-2xl font-medium text-[#343C6A]'>{route(pathname)}</h2>
        <div className='flex flex-row items-center gap-7'>
          <CiSettings className='text-3xl text-[#718EBF]' />
          <LuBellDot className='text-3xl text-[#FD5373]' />
          <img className='w-10 h-10 rounded-full' src={profile} alt='Profile' />
        </div>
      </div>
    </div>
  );
};

export default Nav;
