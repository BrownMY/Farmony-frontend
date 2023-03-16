import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './styles/navbar.styles.css'
const Navbar = ({ isAuth, handleLogout, user }) => {
    //add divs to separate the ul from the links displayed
    useEffect(() => {
        console.log(user)
    }, []);
    return (

        <div>
            {/* <div className="collapse navbar-collapse" id="navbarsExample07"> */}
            {isAuth ?
                <div className="nav-authenticated-container">
                    <div className="header-authenticated">
                        <h1 className='nav-authenticated-title'>FARMONY</h1>
                    </div>
                    <div className='nav-authenticated-user-data'>
                        <img className="user-photo" src={ user.photo ? `user.photo` : `https://res.cloudinary.com/ddmbb2ian/image/upload/v1615672962/qvo_UWEYzvsVDmwUPEWLsCIh_xjgub8.jpg`} alt="user"></img>
                        <div>
                            <div className='user-name'>
                                { user.name }
                                { user.farmer ? <img className="badge-pic" src="https://i.imgur.com/G9tBFn9.png" alt="farmer-badge" /> : "" }
                            </div>
                        </div>
                    </div>
                    <ul className="nav-authenticated-links">
                        <li>
                            <NavLink className="nav-link-auth" to="/holistichub">Holistic Hub</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link-auth" to="/buy">Buy</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link-auth" to="/volunteer">Volunteer</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link-auth" to="/profile">Profile</NavLink>
                        </li>
                        <li>
                            <span onClick={handleLogout} className="nav-link-auth logout-link">Logout</span>
                        </li>
                    </ul>
                </div> :

                <div className="nav-unauthenticated-container">
                    <ul className="nav-unauthenticated-links">
                        <li className="header">
                            <NavLink className="nav-logo" exact to="/"> FARMONY </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link-unauth" to='/gardens'>Gardens list</NavLink>
                        </li>

                        <li>
                            <NavLink className="nav-link-unauth" to="/signup">Sign up</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link-unauth" to="/login">Login</NavLink>
                        </li>
                    </ul>
                </div>
            }
        </div>
    );
}

export default Navbar;