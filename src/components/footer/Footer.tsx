"use client"

import React, { useState } from 'react'
import style from "./Footer.module.css"
import Link from 'next/link';

function Footer() {
  
  const[email, set_email] = useState("");


   const handleSubmit = async (e: React.FormEvent) => 
   {

        e.preventDefault();

        try 
        {
            const res = await fetch("https://app.kit.com/forms/8692575/subscriptions", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ email_address: email }).toString(),
            });

            if (res.ok) 
            {
                alert("✅ Please check your email to confirm your subscription!");
                set_email("");
            } 
            else 
            {
                alert("⚠️ There was an error subscribing. Please try again.");
            }
        } 
        catch 
        {
            alert("❌ Network error — please try again later.");
        }

   };

  
  return (
    <footer className={style.footer}>
        <section className={style.email_container}>
            <div className={style.form_container}>
                <h2 className={style.title}>Join Newsletter</h2>
                <div className={style.smalltext}><span>Get regular concepts and news on system design, cloud engineering, and AI.</span></div>
                <form className={style.input_container} onSubmit={(e)=>handleSubmit(e)}><input type="email" placeholder='Email Address' onChange={(e)=>set_email(e.target.value)} /><button>Subscribe</button></form>
            </div>

            <div className={style.icon_container}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                </svg>
            </div>
        </section>

        <section id='contact' className={style.contact_container}>
            <div className={style.title_container}><span>Contact</span></div>
            <ul>
                <li><Link href="https://github.com/DanielV1-0" target='blank'><span>Github</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg></Link></li>
                <li><Link href="mailto:achrafbrahmia1@gmail.com" target='blank'><span>Gmail</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg></Link></li>
                <li><Link href="https://www.linkedin.com/in/achraf-brahmia/" target='blank'><span>Linkedin</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.icon_svg}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" /></svg></Link></li>
            </ul>
        </section>
    </footer>
  )
}

export default Footer