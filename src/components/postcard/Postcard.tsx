import Link from "next/link";
import style from "./Postcard.module.css";

export function PostCard({slug, image, date, readtime, title}:{slug:string, image:string, date:string, readtime:string, title:string}) 
{
  
  return (
    
    <div className={style.post_card}>
    <Link href={`/post/${slug}`} className={style.post_card_link}>
        <div className={style.img_container}><img src={image} alt="img" /></div>
        <div className={style.text_container}>
            <div className={style.date_container}><span>{date} • {readtime}</span></div>
            <div className={style.title_container}><span>{title}</span></div>
        </div>
    </Link>
    </div>
  );
}