import style from "./page.module.css"


import { getAllPosts, getPostData, getPostMetaData } from "@/libs/posts";
import type { PostData, PostMeta } from "../../../types/post";
import { notFound } from "next/navigation";
import { Metadata } from "next";


interface IParams 
{
    slug: string;
};


export async function generateStaticParams()
{
  const posts = getAllPosts();
  return posts.map(({slug})=>(({slug})))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) : Promise<Metadata>
{

  const {slug} = await params;
  const meta: PostMeta|null = await getPostMetaData(slug);
  if (!meta) return { title: "Not found" };

  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: meta.author }],
    keywords: meta.tags
  };
}

async function Post({ params }: { params: Promise<{ slug: string }> })
{
  const {slug} = await params;
  const postData: PostData|null = await getPostData(slug);
  
  if (!postData) return notFound();

  return (
    <article className={style.post} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        
  )
}

export default Post