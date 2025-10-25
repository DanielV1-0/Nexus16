import { PostCard } from "@/components/postcard/Postcard";
import style from "./page.module.css";
import { getSortedPostsItems } from "@/libs/posts";


export default function Home() {

  const latestPosts = getSortedPostsItems(3);

  return (
    <main className={style.page}>
      
      <section className={style.about_container}>
        <h1>Software Engineer & System Designer</h1>
        <span>Crafting scalable, efficient systems that transform how businesses work — from legacy to advanced solutions.</span>
      </section>


      <section className={style.latest_posts_container}>
        <h2>Latest Posts</h2>
        <div className={style.posts_container}>
        {
          latestPosts.map((latestPost)=><PostCard key={latestPost.slug} date={latestPost.date} 
                                                  readtime={latestPost.readTime}
                                                  image={latestPost.image} 
                                                  slug={latestPost.slug} 
                                                  title={latestPost.title} />)
        }
          
        </div>
      </section>

    </main>
  );
}
