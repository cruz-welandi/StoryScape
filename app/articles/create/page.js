'use client'
import { IoAttachSharp } from "react-icons/io5";
import React, {useState} from 'react';
import { useAuth } from "@/services/context/authContext";
import {TodayDateTime} from "@/services/utils";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db} from "@/services/firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '@/components/modals/authModal';
import { ImSad2, ImSmile2  } from "react-icons/im";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const CreatePoste = () => {

    const router = useRouter();
    const {user} = useAuth();
    const date_posté = TodayDateTime();
    const[tags, setTags] = useState("");
    const[Catégorie, setCatégorie] = useState("");
    const[image, setImage] = useState("");
    const[contenu, setContenu] = useState("");
    const[titre, setTitre] = useState("");
    const [modalContext, setModalContext] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState("success");

    if(user) {
        const auteur = user.firstname+' '+user.lastname;
    }

    const handlePoste = () => {

    }

    const handleCloseModal = () => {
        if (typeModal === "failure" ){
            router.refresh();
            setTitre("");
            setContenu("");
            setTags("");
            setModalOpen(false);
        }else if (typeModal === "success"){
            setModalOpen(false);
            router.push('/')
        }
    }

  return (
    <div className="px-5">
        {!user ?(
            <div className="h-[80vh] flex flex-col justify-center items-center">
                <Link href={'/auth/sign_in'} className='text-xl font-bold mt- bg-blue-500 xl:w-1/2 flex items-center text-white py-3 px-7 rounded'>
                    Connectez-vous
                </Link>
            </div> 
        ):(
            <div className='xl:flex xl:w-1/3 p-6 bg-black/10 shadow rounded-xl mt-8 flex justify-center items-center'>
                <div className='flex flex-col gap-y-5 w-full'>
                    <div className='p-3 text-center w-[70px] text-blue-800 text-2xl font-bold rounded-md bg-blue-800/25'>
                        241
                    </div>
                    <h1 className='text-3xl font-bold'>
                        Créer un Article
                    </h1>
                    <form className='flex flex-col gap-y-4'>
                        
                        <div className='flex flex-col gap-y-2'>
                            <label className='font-bold text-lg'>
                                titre
                            </label>
                            <input type='text' value={titre} onChange={(e) => setTitre(e.target.value)} placeholder='' className='placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='font-bold text-lg'>
                                contenu
                            </label>
                            <textarea rows={4} cols={50} value={contenu} onChange={(e) => setContenu(e.target.value)} placeholder='' className='placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                        </div>
                        <div className='flex gap-x-2'>

                            <div className='flex flex-col gap-y-2'>
                                <label className='font-bold text-lg'>
                                    Catégorie
                                </label>
                                <select className="w-[150px] h-[40px] bg-gray-500/20 rounded-md">
                                    <option className="w-[150px]">
                                        sélectioner une Catégorie
                                    </option>
                                    <option className="w-[150px]">
                                        
                                    </option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-y-2'>
                                <label className='font-bold text-lg'>
                                    Tags
                                </label>
                                <select className="w-[150px] h-[40px] bg-gray-500/20 rounded-md">
                                    <option className="w-[150px]">
                                        sélectioner un tag
                                    </option>
                                    <option className="w-[150px]">
                                        
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='font-bold text-lg'>
                                Image
                            </label>
                            <input type='file' value={image} onChange={(e) => setImage(e.target.value)}  className='text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                        </div>
                        <button onClick={handlePoste} type='submit' className='self-center text-xl font-bold items-center mt-4 bg-blue-500 text-white py-2 w-full rounded-md'>
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
                                    Publier
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
                            {typeModal === "success" ? "voir le poste" : "Réessayer"}
                        </button>
                    </div>
                </Modal>
            </div>
        )}
    </div>
    
    
  )
}

export default CreatePoste;