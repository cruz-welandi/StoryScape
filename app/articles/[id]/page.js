'use client'
import React, {useEffect, useState} from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db} from "@/services/firebase/config";
import { ThreeDots } from 'react-loader-spinner';
import Image from 'next/image';

function Article ({params}) {

    const [article, setArticle] = useState({});
    const id = params?.id || "";

      const fetchArticle = async () =>{
        try {
          const docRef = doc(db, "articles", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setArticle(docSnap.data())
            console.log("Document data:", docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch(error) {
          console.log('error :', error);
        }
      }

      if (id) {
        fetchArticle();
      }
    const isEmpty = (obj) => {
      return obj && typeof obj === 'object' && Object.keys(obj).length === 0;
    };

  return (
    <div className='px-4'>
      {isEmpty(article) ? (
        <div className='flex flex-col justify-center items-center'>
          <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#3b82f6"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
        </div>
      ): (
        <div className='flex flex-col gap-y-4'>
          <div className='mt-8 flex flex-col gap-y-2'>
            <h1 className='text-3xl font-bold'>
              {article.titre}
            </h1>
            <hr className='w-[40px] bg-black h-1'/>
            <h1 className='text-xl italic'>
              {article.auteur}
            </h1>
            <h1 className='text-lg'>
              {article.date_posté}
            </h1>
          </div>
          <Image
            src={article.image}
            width={300}
            height={120}
            alt='Andza'
          />
          <p>
            {article.contenu}
          </p>
        </div>
      )}
    </div>
  )
}

export default Article;