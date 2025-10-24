import PostsByCateogry from '@/components/PostsByCateogry/PostsByCateogry';
import { getAllPosts } from '@/libs/posts';
import { PostItemFilter } from '@/types/post';
import { Metadata } from 'next'

export async function generateMetadata() : Promise<Metadata>
{

  return {
    title: "DanielV1 - Posts",
    description: 'Explore in-depth articles about system design, programming best practices, artificial intelligence, and cloud engineering. Learn how to build scalable, efficient, and intelligent systems with practical guides and insights.',
    authors: [{ name: "DanielV1" }],
    keywords: ['system design','programming','AI','artificial intelligence','cloud engineering','software architecture','backend development','scalable systems']
  };
}


function posts()
{

  const posts:PostItemFilter[] = getAllPosts();

  return <PostsByCateogry posts={posts} />
  

}

export default posts