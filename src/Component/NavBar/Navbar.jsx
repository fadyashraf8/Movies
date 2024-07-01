import React from 'react'
import { Link, NavLink } from 'react-router-dom'


export default function Navbar(props) {

    let { user,logOut } = props



    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="home">Noxe</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">

                        {user != null ? <ul className="navbar-nav  ">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} aria-current="page" to='home'>Home</NavLink>
                            </li>
                        
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} to="people" >People</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} to="tv">Tv</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} to="movies">Movies</NavLink>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link mx-2" onClick={logOut} >Logout</Link>
                            </li>

                        </ul> :
                            <ul className='navbar-nav ms-auto'>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} to="login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className={({ isActive }) => isActive ? "nav-link active mx-2" : "nav-link mx-2"} to="register">Register</NavLink>
                                </li>

                            </ul>  }







                    </div>
                </div>
            </nav>
        </div>
    )
}
