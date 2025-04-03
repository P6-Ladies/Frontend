'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const isLoggedIn = false;


  return (
    
    <nav className='sticky top-0 w-full shadow-md bg-black-300 py-6 text-black'>
      
      <div className='mx-auto w-full max-w-screen-2x1 px-6 xs:px-8 sm:px-16 flex justify-between items-center'>

        
        <Link 
            href={"/home"}
            className='body-text text-palette-400 !font-bold'>
            Home Page
        </Link>
        

        <ul className='gap-x-6 max-md:hidden flex'>
        {isLoggedIn ? (
            <>
            <li 
                className='bg-yellow-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all'
                onClick={()=>router.push('/login')
                    //Also add so that your web token is delete
                }>
                Logout 
            </li>
            </>
        ) : (
            <>
            <li
                className='bg-yellow-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all'
                onClick={()=>router.push('/login')}>
                Login
            </li>
            <li
                className='bg-yellow-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all'
                onClick={()=>router.push('/register')}>
                Register
            </li>
            </>
        )}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar