import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { PostMeta, PostData, PostItem, PostItemFilter } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "src/posts");
console.log("📁 postsDirectory:", postsDirectory);


export function getSortedPostsData(): PostMeta[] 
{
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    
    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as PostMeta),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostSlugs() 
{
  return fs.readdirSync(postsDirectory).map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, "") },
  }));
}

export async function getPostData(slug: string): Promise<PostData|null>
{
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) 
  {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as PostMeta),
  };
}


export async function getPostMetaData(slug: string): Promise<PostMeta|null>
{
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) 
  {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    title:matterResult.data.title,
    description:matterResult.data.description,
    tags:matterResult.data.tags,
    author:"Daniel",
    date:matterResult.data.createdat
  };
}


export function getSortedPostsItems(limit: number): PostItem[] 
{
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug: matterResult.data.slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      image: matterResult.data.image,
      readTime: matterResult.data.readTime,
      createdat: matterResult.data.createdat
    };
  });

  const sortedPosts = allPostsData.sort((a, b) => (a.createdat < b.createdat ? 1 : -1));

  return limit ? sortedPosts.slice(0, limit) : sortedPosts;
}


export function getAllPosts(): PostItemFilter[] {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts: PostItemFilter[] = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      slug: matterResult.data.slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      image: matterResult.data.image,
      readTime: matterResult.data.readTime,
      createdat: matterResult.data.createdat,
      category: matterResult.data.category
    };
  });

  // ✅ FIXED: Convert Date objects to timestamps (numbers)
  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}


export function getPostsByCategory(category: string, page:number): {posts: PostItem[],isThereNext: boolean}
{
  
  const allPosts = getAllPosts();
  
  if(category == "All" || category == undefined)
  {
    const sliced = allPosts.slice(page*5, (page*5)+5);
    const isThereNext = (page*5)+1 < allPosts.length;

    return {
      posts: sliced,
      isThereNext
    };
  }

  // 1️⃣ Filter by category (case-insensitive)
  const filtered = allPosts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );

  // 2️⃣ Paginate or slice by range
  const sliced = filtered.slice(page*5, (page*5)+5);

  // 3️⃣ Determine if there's a next page
  const isThereNext = (page*5)+1 < filtered.length;

  // 4️⃣ Return everything neatly
  return {
    posts: sliced,
    isThereNext
  };
}