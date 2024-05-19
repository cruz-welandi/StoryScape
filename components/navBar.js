'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/public/assets/images/logo.png';
import { useAuth } from '@/services/context/authContext';
import { TfiMenu} from "react-icons/tfi";  
import { FiX } from "react-icons/fi";
import { FaArchive, FaSignOutAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaSquarePlus } from "react-icons/fa6";

const NavBar = () => {
    const[isClic, setIsClic] = useState(false);
    const {user,SignOut } = useAuth();

    const handleMenu =()=>{
        setIsClic(!isClic);
    }

  return (
    <div>
        <nav className='xl:flex xl:justify-between xl:px-10 xl:items-center xl:py-1
                        lg:flex lg:justify-between lg:px-10 lg:items-center lg:py-1
                        md:flex md:justify-between md:px-8 md:items-center md:py-1
                        sm:flex sm:justify-between sm:px-5 sm:items-center sm:py-1
                        flex justify-between px-5 items-center py-1 bg-white border-b-2 border-black relative'>
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
                            Catégories
                        </Link>
                        <Link href={'/'} className='text-black text-xl'>
                            Archives
                        </Link>
                        {!user ? (
                            <div className='flex gap-x-4 items-center'>
                                <Link href={'/auth/sign_in'} className='text-black text-xl rounded-md border border-black p-2'>
                                    Connexion
                                </Link>
                                <Link href={'/auth/sign_up'} className='text-black text-xl rounded-md border border-black p-2'>
                                    Inscription
                                </Link>
                            </div>
                        ) : (
                            <div className='flex gap-x-2'>
                                {user.email}
                                <Link href={'/'} className='text-black text-xl'>
                                    Poster
                                </Link>
                            </div>
                        )}
                        
                    </ol>
                </div>

                {/*partie mobile*/}
                {!user ?(
                    <div className='xl:hidden lg:hidden flex items-center gap-x-4'>
                        <Link href={'/auth/sign_in'} className='text-black text-xl rounded-md border border-black p-1'>
                            Connexion
                        </Link>

                        <button className='xl:hidden lg:hidden md:hidden p-1 border border-black rounded-md' onClick={handleMenu}>
                            {isClic ?(
                                <FiX className='text-3xl'/>
                            ):(
                                <TfiMenu className='text-3xl'/>
                            )}
                            
                        </button>
                    </div>
                ):(
                    <div className='xl:hidden lg:hidden flex items-center gap-x-4'>
                        <Link href={'/articles/create'} className='text-black text-xl items-center flex gap-x-2 rounded-md border border-black p-1'>
                            <FaSquarePlus className='text-2xl'/>
                            Poster
                        </Link>

                        <button className='xl:hidden lg:hidden md:hidden p-1 border border-black rounded-md' onClick={handleMenu}>
                            {isClic ?(
                                <FiX className='text-3xl'/>
                            ):(
                                <TfiMenu className='text-3xl'/>
                            )}
                            
                        </button>
                    </div>
                )}
            </div>
        </nav>
        { isClic && (
            <div className='flex justify-between absolute px-4 inset-0 bg-white duration-500 mt-[80px] h-[250px]'>
                <div className='flex flex-col'>
                    {!user ? (
                        <div className='flex flex-col gap-y-2 py-2'>
                           <Link href={'/'} className='text-black text-xl flex gap-x-4 hover:border-b hover:border-black'>
                                <BiSolidCategory className='text-2xl'/>
                                Catégories
                            </Link>
                            <Link href={'/'} className='text-black text-xl flex gap-x-4 hover:border-b hover:border-black'>
                                <FaArchive className='text-2xl'/>
                                Archives
                            </Link> 
                        </div>
                    ): (
                        <div className='flex flex-col gap-y-2 py-2'>
                           <Link href={'/'} className='text-black text-xl flex  gap-x-4 hover:border-b hover:border-black'>
                                <BiSolidCategory className='text-2xl '/>
                                Catégories
                            </Link>
                            <Link href={'/'} className='text-black text-xl flex gap-x-4 hover:border-b hover:border-black'>
                                <FaArchive className='text-2xl'/>
                                Archives
                            </Link>
                            <Link href={'/articles/create'} className='text-black text-xl flex gap-x-4 hover:border-b hover:border-black'>
                                <FaSquarePlus className='text-2xl'/>
                                Poster
                            </Link>
                            <button onClick={SignOut} className='flex gap-x-4 hover:border-b hover:border-black'>
                                <FaSignOutAlt className='text-2xl'/>
                                Déconnexion
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}
    </div>
  )
}

export default NavBar