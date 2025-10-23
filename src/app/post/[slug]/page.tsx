import style from "./page.module.css"

import { getPostData, getPostMetaData } from "@/libs/posts";
import type { PostData, PostMeta } from "../../../types/post";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: { params: { slug: string }}) : Promise<Metadata>
{
  const meta: PostMeta|null = await getPostMetaData(params.slug);
  if (!meta) return { title: "Not found" };

  return {
    title: meta.title,
    description: meta.description,
    authors: [{ name: meta.author }],
    keywords: meta.tags
  };
}

async function post({ params }: PostPageProps) 
{
  const postData: PostData|null = await getPostData(params.slug);
  
  if (!postData) return notFound();

  return (
    <article className={style.post} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        
  )
}

export default post