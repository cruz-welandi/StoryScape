'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.png';
import { useAuth } from '@/services/context/authContext';
import { TfiMenu} from "react-icons/tfi";  
import { FiX } from "react-icons/fi";

const NavBar = () => {
    const[isClic, setIsClic] = useState(false);
    const {user} = useAuth();

    const handleMenu =()=>{
        setIsClic(!isClic);
    }

  return (
    <div>
        <nav className='xl:flex xl:justify-between xl:px-10 xl:items-center xl:py-1
                        lg:flex lg:justify-between lg:px-10 lg:items-center lg:py-1
                        md:flex md:justify-between md:px-8 md:items-center md:py-1
                        sm:flex sm:justify-between sm:px-5 sm:items-center sm:py-1
                        flex justify-between px-5 items-center py-1 bg-white'>
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
            <div>
                <div className='hidden xl:block lg:block'>
                    <ol className='xl:flex xl:gap-x-4 xl:items-center'>
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

                {/*partie mobile*/}
                <div className='xl:hidden lg:hidden flex items-center gap-x-4'>
                    <Link href={'/auth/sign_in'} className='text-black text-xl rounded-md border border-black p-1'>
                        <il>Connexion</il>
                    </Link>

                    <button className='xl:hidden lg:hidden md:hidden p-1 border border-black rounded-md' onClick={handleMenu}>
                        {isClic ?(
                            <FiX className='text-3xl'/>
                        ):(
                            <TfiMenu className='text-3xl'/>
                        )}
                        
                    </button>
                </div>
            </div>
        </nav>
        { isClic && (
            <div className='flex justify-between fixed inset-0 bg-white duration-500 mt-16'>
                <div className='flex flex-col'>
                    <Link href={'/'} className='text-black text-xl'>
                        <il>Catégories</il>
                    </Link>
                    <Link href={'/'} className='text-black text-xl'>
                        <il>Archives</il>
                    </Link>
                </div>
            </div>
        )}
    </div>
  )
}

export default NavBar