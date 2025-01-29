import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { CgMenu } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { CiPower } from "react-icons/ci";
import './Navigation.css';


function Navigation() {
    const { Signout, isLoggedIn } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);
    const [userDrop, setUserDrop] = useState(false);

    useEffect(()=> {
        const handleScroll = ()=> {
            if(window.scrollY > 600) {
                setScrolling(true);
            } else {
                setScrolling(false);
            };
        };
        window.addEventListener("scroll", handleScroll);
        return ()=> {
            window.removeEventListener("scroll", handleScroll)
        };
    }, []);

    const handleUser = ()=> {
        setUserDrop(!userDrop);
    }

    const handleLogout = ()=> {
        Signout();
        navigate('/')
    }
    
  return (
    <div className={`navigation-container ${scrolling ? 'scrolled' : ""}`}>
        <Link to={'/home'} style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)} >NITROFLIX</Link>
        <div className={`nav-link ${isMobile ? 'mobile active' : ''}`} onClick={()=> setIsMobile(false)}>
            
            <li>
            <Link to='/about' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> K-Drama </Link>
            </li>
            
            <li>
            <Link to='/portfolio' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> Recent Movies </Link>
            </li>
            
            <li>
            <Link to='/service' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> Action Movies </Link>
            </li>
            
            <li>
            <Link to='/testimonial' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> Bollywood </Link>
            </li>
            
            <li>
            <Link to='/blog' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> Blogs </Link>
            </li>
            
            <li>
            <Link to='/contact' style={{color: scrolling ? "#fff" : '#ffb606'}} smooth={true} offset={-70} duration={500} spy={true} onClick={()=> setIsMobile(false)}> Contact </Link>
            </li>
        </div>
            
      <div className="toggle-menu" onClick={()=> setIsMobile(!isMobile)}>{isMobile ? <HiMiniXMark /> : <CgMenu />}</div>
    </div>
  )
}

export default Navigation;
