import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../NavBar/Navbar'

export default function MasterLayout(props) {

let{user ,logOut}=props



    return (
        <div>
            <Navbar user={user} logOut={logOut}/>
            <div className='container'>
                <Outlet />
            </div>
        </div>
    )
}
