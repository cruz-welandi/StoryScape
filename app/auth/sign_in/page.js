'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from "firebase/firestore"; 
import { db, auth } from '@/services/firebase/config';
import {signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '@/components/modals/authModal';
import { useAuth } from '@/services/context/authContext';
import { ImSad2, ImSmile2  } from "react-icons/im";
import Link from 'next/link';


const SignIn = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [modalContext, setModalContext] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState("success");
    const {setUser} = useAuth();

    const handleSingIn = (e) =>{
        setLoading(true);
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 
          const user_auth = userCredential.user;
    
          const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                if(doc.data().id === user_auth.uid){
                    setUser(doc.data());
                    setModalContext("Votre connexion est success!");
                    setModalOpen(true);
                    setTypeModal("success");
                    setLoading(false);
                }
            });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error: "+errorCode+"\n"+"message: "+errorMessage)
          setModalContext("Quelques chose a mal tournée!")
          setModalOpen(true);
          setTypeModal("failure");
          setLoading(false);
        });
      }
    
      const handleCloseModal = () => {
        if (typeModal === "failure" ){
            router.refresh();
            setEmail("");
            setPassword("");
            setModalOpen(false);
        }else if (typeModal === "success"){
            setModalOpen(false);
            router.push('/')
        }
      }

    
  return (
    <div className='xl:flex xl:w-1/3 p-6 bg-black/10 shadow rounded-xl mt-8 w-[320px]'>
        <div className='flex flex-col gap-y-5 w-full'>
            <div className='p-3 text-center w-[70px] text-blue-800 text-2xl font-bold rounded-md bg-blue-800/25'>
                241
            </div>
            <h1 className='text-3xl font-bold'>
                Connexion
            </h1>
            <form className='flex flex-col gap-y-4'>
                
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Email
                    </label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='cruz@gmail.com' className='placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Mot de passe
                    </label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='****************' className='placeholder:text-2xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                    <Link href='/auth/forgot_password' className='text-end italic text-xl'>
                        Mot de passe oublié
                    </Link>
                </div>
                <button onClick={handleSingIn} type='submit' className='self-center text-xl font-bold items-center mt-4 bg-blue-500 text-white py-2 w-full rounded-md'>
                    {loading ? (
                        <div className='flex justify-center items-center'>
                        <ThreeDots
                            visible={true}
                            height="30"
                            width="30"
                            color="#ffff"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        </div>
                    ) : (
                        <span>
                            Connexion
                        </span> 
                    )}
                </button>
                <p className='xl:hidden lg:hidden text-lg'>
                    vous n'avez pas de compte?<Link className='text-blue-500' href={'/auth/sign_up'}>Inscrivez-vous</Link>
                </p>
            </form>
            
        </div>

        <Modal type={typeModal} isOpen={modalOpen} onClose={()=> setModalOpen(false) }>
            {typeModal === "success" ? (
                <div>
                    <div className='flex justify-center items-center font-bold gap-x-2'>
                        <p className='font-bold text-xl'>
                            {modalContext}
                        </p>
                        <ImSmile2 className='text-yellow-500 text-xl' />
                    </div>
                </div>
            ) : (
                <div>
                    <div className='flex justify-center items-center font-bold gap-x-2'>
                        <p className='font-bold text-xl'>
                            {modalContext}
                        </p>
                        <ImSad2 className='text-yellow-500 text-xl' />
                    </div>
                </div>
            )}
            
            <div className='flex justify-center items-center'>
                <button onClick={handleCloseModal} className='text-xl font-bold items-center mt-4 bg-blue-500 xl:w-1/2 w-full text-white py-3 px-7 rounded'>
                    {typeModal === "success" ? "Connectez-vous" : "Réessayer"}
                </button>
            </div>
        </Modal>
    </div>
  )
}

export default SignIn;