import React from 'react'
import { Outlet } from 'react-router-dom'
import { StickyNavbar } from '../Common/NavBar'
import { Footer } from '../Common/Footer'

function LayOut() {
  return (
    <>
    <div className='main'>
        <div className='content'>
            <StickyNavbar className="sticky" /> 
            <Outlet/>
            <Footer/>
        </div>
     </div> 
    </>
  )
}

export default LayOut