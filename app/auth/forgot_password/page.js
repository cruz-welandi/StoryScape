'use client'
import React, { useState} from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore"; 
import { db, auth } from '@/services/firebase/config';
import { useRouter } from 'next/navigation';
import { ImSad2, ImSmile2  } from "react-icons/im";
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '@/components/modals/authModal';
import Link from 'next/link';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [typeModal, setTypeModal] = useState("success");
    const [modalContext, setModalContext] = useState("");
    const [modalOpen, setModalOpen] = useState("");

    const handleForgotPassword = (e) => {
        setLoading(true);
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setModalContext("Veuillez vérifier boite mail, e-mail de réinitialisation de mot de passe vous a été envoyé!");
            setModalOpen(true);
            setTypeModal("success");
            setLoading(true);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error :'+errorCode+'\n'+'message :'+errorMessage);
            setModalContext("Quelques chose a mal tournée!")
            setModalOpen(true);
            setTypeModal("failure");
            setLoading(true);
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
    <div className='flex p-6 bg-black/10 shadow rounded-xl xl:mt-28 mt-10 w-[300px] xl:w-full'>
        <div className='flex flex-col gap-y-5 w-full'>
            <div className='p-3 text-center w-[70px] text-blue-800 text-2xl font-bold rounded-md bg-blue-800/25'>
                241
            </div>
            <h1 className='xl:text-3xl font-bold text-2xl'>
                Mot de passe oublié
            </h1>
            <p className='text-lg'>
                Saisissez votre email pour récupérer votre mot de passe,<br className='hidden xl:block'/> vous allez recevoir une email confirmer la la demande de réinitialisation
            </p>
            <form className='flex flex-col gap-y-4'>
                
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Email
                    </label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='cruz@gmail.com' className='placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                </div>
                <button onClick={handleForgotPassword} type='submit' className='self-center text-xl font-bold items-center mt-4 bg-blue-500 text-white py-2 w-full  rounded-lg'>
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
                            Confirmer
                        </span> 
                    )}
                </button>
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

export default ForgotPassword;