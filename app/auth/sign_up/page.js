'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from '@/services/firebase/config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '@/components/modals/authModal';
import { ImSad2, ImSmile2  } from "react-icons/im";


const SignUp = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [modalContext, setModalContext] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState("success");

    const handleSignUp = (e) =>{
        setLoading(true);
        if(password === confPassword) {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log('data : ', user);
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                    id : user.uid,
                    lastname,
                    firstname,
                    email,
                    phone
                    });
                    setModalContext("Votre Inscription est success!");
                    setLoading(false)
                    setTypeModal("success");
                    setModalOpen(true);
                    
                    console.log("Document written with ID: ", docRef.id);
                } catch (error) {
                    console.error("Error adding document: ", error);
                    setModalContext("Quelques chose a mal tournée!")
                    setLoading(false)
                    setTypeModal("failure");
                    setModalOpen(true);
                    
                }
            })
            .catch((error) => {
                setModalContext("Quelques chose a mal tournée!")
                setLoading(false)
                setTypeModal("failure");
                setModalOpen(true);
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('erro : '+ errorCode+'\n message : '+ errorMessage)
                // ..
            });
        } else {
            setModalContext("Les deux mots de passe fournit ne sont pas identiques!")
            setLoading(false);
            setTypeModal("failure");
            setModalOpen(true);
        }  
    };

    const handleCloseModal = () => {
        if ( typeModal === "failure" ){
            router.refresh();
            setEmail("");
            setConfPassword("");
            setFirstname("");
            setLastname("");
            setPassword("");
            setPhone("");
            setModalOpen(false);
        }else if (typeModal === "success"){
            setModalOpen(false);
            router.push('/auth/sign_in');
        }
    }

  return (
    <div className='flex p-4 bg-black/10 shadow rounded-xl mt-8 xl:w-full w-[350px]'>
        <div className='flex flex-col xl:gap-y-5 gap-y-3 w-full'>
            <div className='p-3 text-center w-[70px] text-blue-800 text-2xl font-bold rounded-md bg-blue-800/25'>
                241
            </div>
            <h1 className='text-3xl font-bold'>
                Créer un Compte
            </h1>
            <form className='flex flex-col xl:gap-y-3  gap-y-2 w-full'>
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Nom complet
                    </label>
                    <div className='flex gap-x-4 w-full'>
                        <input type='text' value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder='Nom(s)' className='xl:w-[220px] w-[150px] placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                        <input type='text' value={firstname} onChange={(e)=> setFirstname(e.target.value)} placeholder='Prénom(s)' className='xl:w-[220px] w-[150px] placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Email
                    </label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='cruz@gmail.com' className='xl:w-full w-[300px] placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Mot de passe
                    </label>
                    <div className='flex gap-x-4 w-full'>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Mot de passe' className=' xl:w-[220px] w-[150px] placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                        <input type='password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} placeholder='Confirmer le mot de passe' className='xl:w-[220px] w-[150px] placeholder:text-xl  placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                    </div>
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label className='font-bold text-lg'>
                        Numéro de téléphone
                    </label>
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='+24166758191' className='xl:w-full w-[300px] placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[40px] rounded-md p-3' required/>
                </div>
                <button onClick={handleSignUp} type='submit' className='self-center text-xl font-bold items-center mt-4 bg-blue-500 xl:w-full w-[300px] text-white py-2 rounded-lg'>
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
                            Inscription
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

export default SignUp
