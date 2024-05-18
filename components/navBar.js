'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.png';
import { useAuth } from '@/services/context/authContext';

const NavBar = () => {
    const {user} = useAuth();

  return (
    <nav className='xl:flex xl:justify-between xl:px-10 xl:items-center xl:py-1'>
        <div>
            <Image
                src={logo}
                width={120}
                height={120}
                alt='logo StoryScape'
            />
        </div>
        <div>
            <div>
                <ol className='flex gap-x-4 items-center'>
                    <Link href={'/'} className='text-black text-xl'>
                        <il>Catégories</il>
                    </Link>
                    <Link href={'/'} className='text-black text-xl'>
                        <il>Archives</il>
                    </Link>
                    {!user ? (
                        <div className='flex gap-x-4 items-center'>
                            <Link href={'/auth/sign_in'} className='text-black text-xl rounded-md border border-black p-2'>
                                <il>Connexion</il>
                            </Link>
                            <Link href={'/auth/sign_up'} className='text-black text-xl rounded-md border border-black p-2'>
                                <il>Inscription</il>
                            </Link>
                        </div>
                    ) : (
                        <div className='flex gap-x-2'>
                            {user.email}
                            <Link href={'/'} className='text-black text-xl'>
                                <il>Poster</il>
                            </Link>
                        </div>
                    )}
                    
                </ol>
            </div>
        </div>
    </nav>
  )
}

export default NavBar