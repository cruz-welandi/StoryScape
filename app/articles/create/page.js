'use client'
import { IoAttachSharp } from "react-icons/io5";
import React, {useState, useEffect} from 'react';
import { useAuth } from "@/services/context/authContext";
import {TodayDateTime} from "@/services/utils";
import {uploadBytesResumable, ref, getDownloadURL, deleteObject} from "firebase/storage";
import { storage, db} from "@/services/firebase/config";
import { collection, addDoc, doc,  getDoc  } from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import { Modal } from '@/components/modals/authModal';
import { ImSad2, ImSmile2  } from "react-icons/im";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import {LocalStorage} from '@/services/utils'

const CreatePoste = () => {

    const router = useRouter();
    const {user} = useAuth();
    const date_posté = TodayDateTime();
    const[tags, setTags] = useState("");
    const[catégorie, setCatégorie] = useState("");
    const[allCatégorie, setAllCatégorie] = useState([]);
    const[allTags, setAllTags] = useState([]);
    const[image, setImage] = useState(null);
    const[contenu, setContenu] = useState("");
    const[titre, setTitre] = useState("");
    /*const[oldImageName, setOldImageName]= useState("");
    const[stockImage, setStockImage] = useState(image !==null && image)*/
    const[loadingImage, setLoadingImage] = useState(false);
    const[imageUrl, setImageUrl] = useState("");
    const [modalContext, setModalContext] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState("success");
    
    if(user) {
        const auteur = user.firstname+' '+user.lastname;

        useEffect(() => {
            const AllCategory = async () => {
                const docRef = doc(db, "catégories", "cveBOz9qk8XaQazvXyf0");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setAllCatégorie(docSnap.data().catégories);
                } else {
                    console.log("No such document!");
                }
            }
            AllCategory();
        },[])
        console.log('categorie :', catégorie)

        useEffect(() => {
            if(catégorie) {
                const AllTag = async () => {
                    const docRef = doc(db, "tags", "G451MXAunPO5OwkJ3WQt");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log('data: ', data[catégorie])
                        setAllTags(data[catégorie]);
                    } else {
                        console.log("No such document!");
                    }
                }   
                AllTag();
            }
        },[catégorie]);
        
        /*useEffect(() =>{
            if (oldImageName !== "" && oldImageName === stockImage.name) {
                const deleteImage = () =>{
                    const oldImageRef = ref(storage, `articles/${oldImageName}`);
                    deleteObject(oldImageRef).then(() => {
                        console.log('Ancien fichier supprimé avec succès');
                        setStockImage(image);
                    }).catch((error) => {
                        console.log('Erreur lors de la suppression de l\'ancien fichier', error);
                    });
                }
                deleteImage()
            }
        },[oldImageName])*/

        useEffect(() =>{
            if(image !== null) {
                const uploadImage =() =>{
                    setLoadingImage(true);
                    const storageRef = ref(storage, `articles/${image.name}`);
                    uploadBytesResumable(storageRef, image)
                    .then(() =>{
                        console.log('upload success');
                        getDownloadURL(ref(storage, `articles/${image.name}`))
                        .then((url) => {
                            setImageUrl(url);
                            setLoadingImage(false);
                        })
                    });
                    //setOldImageName(image.name)
                    
                }
                uploadImage()
            }
        },[image])
        
        console.log(image)

        const handlePoste = async(e) => {
            setLoading(true);
                e.preventDefault();
                try {
                    await addDoc(collection(db, "articles"), {
                    image: imageUrl,
                    titre,
                    contenu,
                    catégorie,
                    tags,
                    date_posté,
                    auteur
                    });
                    setModalContext("Votre Article a été créé avec success");
                    setLoading(false)
                    setTypeModal("success");
                    setModalOpen(true);
                }catch(erro){
                    console.log('eeror :', erro);
                    setModalContext("Quelques chose a mal tournée!")
                    setLoading(false)
                    setTypeModal("failure");
                    setModalOpen(true);
                }
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
                                    <textarea rows={4} cols={100} value={contenu} onChange={(e) => setContenu(e.target.value)} placeholder='' className='placeholder:text-xl placeholder:text-black text-xl outline-none bg-gray-500/20 h-[200px] rounded-md p-3' required/>
                                </div>
                                <div className='flex gap-x-2'>
        
                                    <div className='flex flex-col gap-y-2'>
                                        <label className='font-bold text-lg'>
                                            Catégorie
                                        </label>
                                        <select onChange={(e) => setCatégorie(e.target.value)} className="w-[130px] h-[40px] bg-gray-500/20 rounded-md">
                                            <option className="w-[150px]">
                                                sélectioner une Catégorie
                                            </option>
                                            {allCatégorie.length !=0 && allCatégorie.map((categorie, index) => (
                                                <option key={index} value={categorie}>
                                                    {categorie}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
        
                                    <div className='flex flex-col gap-y-2'>
                                        <label className='font-bold text-lg'>
                                            Tags
                                        </label>
                                        <select onChange={(e) => setTags(e.target.value)} className="w-[130px] h-[40px] bg-gray-500/20 rounded-md">
                                            <option className="w-[150px]">
                                                sélectioner un tag
                                            </option>
                                            {allTags.length !=0 && allTags.map((tag, index) => (
                                                <option key={index} value={tag}>
                                                    {tag}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-2'>
                                    <label className='font-bold text-lg'>
                                        Image
                                    </label>
                                    <input type='file' onChange={(e) => setImage(e.target.files[0])}  className='text-xl outline-none bg-gray-500/20 h-[60px] rounded-md p-3' required/>
                                </div>
                                <button onClick={handlePoste} type='submit' className={`self-center text-xl font-bold items-center mt-4 bg-blue-500 text-white py-2 w-full rounded-md ${loadingImage ? 'bg-gray-500' : 'bg-[#279EFF]'}`} disabled={loadingImage}>
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

}

export default CreatePoste;