import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoimg from "../../images/logo.jpg";
import {HiOutlineMenuAlt3} from "react-icons/hi";

const Navbar = () => {
  const [toggleMenu,setToggleMenu]=useState(false);
  const handleNavbar=()=>setToggleMenu(!toggleMenu);
    return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggle flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoimg} alt="weblogo"/>
            <span className="text-uppercase fw-7 fs-24
            ls-1">
              Books
            </span>
          </Link>
          <button type="button" className="navbar-toggle-btn" onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={30} style={{color:`${toggleMenu?"#fff":"#010101"}`
            }}/>
          </button>
        </div>
        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse"
          :"navbar-collapse"}>
          <ul className="navbar-nav">
            <li className="navitem">
              <Link to="book" className="nav-link text-uppercase text-white fs-22 fw-6 ls-1">
              Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about" className="nav-link text-uppercase text-white fs-22 fw-6 ls-1">About</Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  };
  
  export default Navbar;