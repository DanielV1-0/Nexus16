import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="notfound_container">
        <div className="redirect_container">
          <Link href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="link_icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <span>Go Bakc to Posts Page</span>
          </Link>
        </div>
        
        <div className="main_title">
          
          <div className="text_container">
            <div className="number_container"><span>404</span></div>
            <div className="lettre_container"><span>Page Not Found</span></div>
          </div>
        </div>
      </div>
  )
}

//<div className="img_container"><img src={NotFountImage} /></div>