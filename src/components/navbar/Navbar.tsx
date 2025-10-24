"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import style from "./Navbar.module.css"

function Navbar() 
{

  const[HideSidebar, set_HideSidebar] = useState<boolean>(true);
  const [IsAnimatingHiden, set_IsAnimatingHiden] = useState<boolean>(false);
  
  const HandleHideSideBar = () =>{
    set_IsAnimatingHiden(true);

    // After the animation duration (e.g. 300ms), hide the navbar
    setTimeout(() => {
      set_HideSidebar(true);
      set_IsAnimatingHiden(false);
    }, 170);
    
  }


  return (
    <nav className={style.nav_contanier}>
        <h2 className={style.title}>Achraf V1</h2>

        <div className={`${HideSidebar==true ? style.hiden_links : style.show_links} ${style.links_list_container}`}>
            <div className={style.links_list_closer} onClick={()=>HandleHideSideBar()}></div>
            <ul className={`${IsAnimatingHiden==true ? style.animate_hide_links : style.animate_show_links} ${style.links_list}`}>
                <li><Link href="/"><span>About</span></Link></li>
                <li><Link href={"/posts"}><span>Posts</span></Link></li>
                <li><Link href={"#contact"}><span>Contact</span></Link></li>
            </ul>
        </div>

        <div className={style.bars_conrainer}>
            <svg onClick={()=>set_HideSidebar(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={style.bars_svg}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
        </div>
    </nav>
  )
}

export default Navbar