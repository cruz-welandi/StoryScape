'use client'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import { ref, getDownloadURL } from "firebase/storage";
import { storage, db} from "@/services/firebase/config";
import { collection, getDocs } from 'firebase/firestore';

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

  const topArticles = articles.slice(0, 3);
  return (
    <div className="px-5">
      <h1 className="text-center text-2xl font-bold mt-5">
        Tops News
      </h1>
      
      <div className="mt-5 flex flex-col gap-y-3">
        
        {topArticles.length >0 && (
          <Link href={`/articles/${topArticles[0].id}`} className="flex flex-col gap-y-4">
            <Image
              src={topArticles[0].image}
              width={300}
              height={120}
              alt='Andza'
            />
            <p className="text-xl flex flex-col gap-y-1">
               <h1>{topArticles[0].titre}</h1>
               <h2>#{topArticles[0].tags}</h2>
               <h2 className="font-bold">Par {topArticles[0].auteur}</h2>
            </p>
          </Link>
        )}
        <div className="flex flex-col gap-y-3">
          {topArticles.length >1 && (
            <Link href={`/articles/${topArticles[1].id}`} className="">
              <Image
                src={topArticles[1].image}
                width={400}
                height={120}
                alt='Bamboo'
              />
              <p className="text-xl flex flex-col gap-y-1">
                <h1>{topArticles[1].titre}</h1>
                <h2>#{topArticles[1].tags}</h2>
                <h2 className="font-bold">Par {topArticles[1].auteur}</h2>
              </p>
            </Link>
          )}

          {topArticles.length >2 && (
          <Link href={`/articles/${topArticles[2].id}`} className="">
            <Image
              src={topArticles[2].image}
              width={300}
              height={120}
              alt='CDL'
            />
            <p className="text-xl flex flex-col gap-y-1">
              <h1>{topArticles[2].titre}</h1>
              <h2>#{topArticles[2].tags}</h2>
              <h2 className="font-bold">Par {topArticles[2].auteur}</h2>
            </p>
          </Link>
        )}
        </div>
      </div>
    </div>
  );
}
