'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.png';
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className='flex flex-col gap-y-2 py-3 bg-white mt-6'>   
        <div className='flex justify-between px-2'>
            <div>
                <Link href='/'>
                    <Image
                        src={logo}
                        width={120}
                        height={120}
                        alt='logo StoryScape'
                    />
                </Link>
            </div>
            <div className='flex flex-col gap-y-2'>
                <Link href={'/'} className='hover:border-b hover:border-black text-lg'>Articles</Link>
                <Link href={'/'} className='hover:border-b hover:border-black text-lg'>Catégories</Link>
                <Link href={'/'} className='hover:border-b hover:border-black text-lg'>Contact</Link>
            </div>
            <div className='flex flex-col gap-y-2'>
                <h1 className='text-lg'> 
                    Suivez-nous
                </h1>
                <div className='flex gap-x-2'>
                    <Link href={'/'}>
                        <AiFillInstagram className='text-2xl' /> 
                    </Link>
                    <Link href={'/'}>
                        <AiFillLinkedin className='text-2xl' /> 
                    </Link>
                    <Link href={'/'}>
                        <FaFacebook className='text-2xl' /> 
                    </Link> 
                </div>
                
            </div>
        </div>
        <div className='flex flex-col gap-y-4 px-4'>
            <hr className='bg-black'/>
            <p className='text-center text-lg'>
                © Copyright 2024 StoryScape. All rights reserved.
            </p>
        </div>
    </div>
  )
}

export default Footer