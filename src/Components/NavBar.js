import { useState } from 'react';
import { FaStore } from 'react-icons/fa';
import { Link, NavLink } from "react-router-dom";
import './NavBar.css';
const NavBar = () => {
    const handlelogout=()=>{
        window.localStorage.removeItem("jwtToken");
        window.location.href="/"
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <h1><FaStore />
                        <a className="navbar-brand">Corner Store</a>
                    </h1>
                    <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                {window.localStorage.getItem('jwtToken') ? 
                <>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/homepage">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/About">About</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/search">Search</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/Contact">Contact</a>
                            </li>
                            <ul class="nav navbar-nav navbar-right ms-auto">
                            <div className='buttons'>
                                <NavLink to="/cart" className="btn btn-light ms-3"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                </svg>Cart</NavLink>
                            </div>
                            <Link to="/orders" className="btn btn-light mx-4 mr-auto ">My Orders</Link>
                            <button className="btn btn-light mx-4 mr-auto" onClick={handlelogout}>Logout</button>
                            </ul>
                        </ul>
                        </>
                        :
                        <>

                        <ul class="nav navbar-nav navbar-right ms-auto">
                           
                            <div>

                                {/* <i className="fa fa-shopping-cart me-1"></i> */}
                                <Link to="/login" className="btn btn-light mx-4 mr-auto  ">Login</Link>
                                <Link to="/register" className="btn btn-light mr-auto">Register</Link>
                            </div>

                        </ul>
                       




                
                    </>
}
{/* </div> */}

                </div>
            
            </nav>
        </div>
    );
}
export default NavBar;
