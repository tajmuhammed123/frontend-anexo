import React from 'react'
import { AdminNavbar } from '../Common/NavBar'
import { Outlet } from 'react-router-dom'

function LayOut() {
    console.log('reacged');
  return (
    <>
    <div className='main'>
        <div className='content'>
            <AdminNavbar className="sticky"  /> 
            <Outlet/>
        </div>
     </div> 
    </>
  )
}

export default LayOut