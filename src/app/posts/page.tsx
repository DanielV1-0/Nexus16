import Link from 'next/link'
import React from 'react'
import style from "./page.module.css"
import CategoryMenu from '@/components/selectOptions/SelectOptions'
import { PostCard } from '@/components/postcard/Postcard'
import { getPostsByCategory } from '@/libs/posts'
import { PostItem } from '@/types/post'
import { redirect } from "next/navigation";
import { Metadata } from 'next'


export async function generateMetadata({ params }: { params: { slug: string }}) : Promise<Metadata>
{

  return {
    title: "DanielV1 - Posts",
    description: 'Explore in-depth articles about system design, programming best practices, artificial intelligence, and cloud engineering. Learn how to build scalable, efficient, and intelligent systems with practical guides and insights.',
    authors: [{ name: "DanielV1" }],
    keywords: ['system design','programming','AI','artificial intelligence','cloud engineering','software architecture','backend development','scalable systems']
  };
}


async function posts({searchParams}: {searchParams: Promise<{ category: "All" | "System Design" | "Artificial Intelligence (AI)" | "Programming" | "Cloud Computing"; page: number }>;})
{

  const categories = {
    "All" : 0,
    "System Design" : 1,
    "Artificial Intelligence (AI)" : 2,
    "Programming" : 3,
    "Cloud Computing" : 4
  }
  
  const params = await searchParams;
  

  const currentpage:number = Number(params.page ?? 0)
  const content = getPostsByCategory(params.category, currentpage);

  if(currentpage>0 && content.posts.length==0)
  {
    redirect(`/posts?category=${params.category}&page=${0}`);
  }
  
  

  return (
    <main className={style.posts}>

        <CategoryMenu selected={categories[params.category]??0} />

        <section className={style.posts_container}>
          {
            content.posts.length>0
            ?
            content.posts.map((postItem:PostItem)=><PostCard key={postItem.slug} date={postItem.date} 
                                                           readtime={postItem.readTime} 
                                                           image={postItem.image} 
                                                           slug={postItem.slug} 
                                                           title={postItem.title} />)
            :
            <span>No posts yet</span>
          }
        </section>

        <section className={style.navigation_btns_container}>
          {
            currentpage>0
            ?
            <Link className={style.navigation_container} href={`/posts?category=${params.category}&page=${Number(params.page)-1}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </Link>
            :
            null
          }
          
          {
            content.isThereNext == true
            ?
            <Link className={style.navigation_container} href={`/posts?category=${params.category}&page=${currentpage+1}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </Link>
            :
            null
          }
          
        </section>
    </main>
  )
}

export default posts