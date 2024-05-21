'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {db} from "@/services/firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import {TodayDateTime} from '@/services/utils';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        const articlesArray = [];
        
        querySnapshot.forEach((doc) => {
          articlesArray.push({ id: doc.id, ...doc.data() });
        });

        setArticles(articlesArray);
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, []);

  console.log(articles);
  const topArticles = articles.slice(0, 3)
  const currentArticles = articles.slice(3);
  console.log(currentArticles);
  return (
    <div className="px-5">
      <h1 className="text-center text-2xl font-bold mt-5">
        Tops News
      </h1>
      
      <div className="mt-5 flex flex-col gap-y-3">
        {topArticles.map((article) => (
          <div key={article.id}>
            <Link href={`/articles/${article.id}`} className="">
              <Image
                src={article.image}
                width={300}
                height={120}
                alt='CDL'
              />
              <div className="text-xl flex flex-col gap-y-1">
                <h1>{article.titre}</h1>
                <h2>{article.tags}</h2>
                <h2 className="font-bold">Par {article.auteur}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {currentArticles.length != 0 && (
        <div>
          <h1 className="text-2xl font-bold mt-5">
            Nouvelles Publications
          </h1>
          <hr className='w-[80px] bg-black h-1 mb-5'/>
        </div>
      )}
      
      <div className="overflow-x-auto snap-x snap-mandatory whitespace-nowrap min-w-full flex gap-x-4" >
        {currentArticles.map((article)=> ( 
          <div key={article.id} className="snap-center flex-shrink-0">
            <Link href={`/articles/${article.id}`} className="">
              <Image
                src={article.image}
                width={200}
                height={150}
                alt='CDL'
                className="h-[150px]"
              />
              {/*<div className="text-xl flex flex-col gap-y-1">
                <h1>{article.titre}</h1>
                <h2>{article.tags}</h2>
                <h2 className="font-bold">Par {article.auteur}</h2>
              </div> */}
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
