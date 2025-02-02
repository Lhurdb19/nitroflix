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

const API_KEY = '4288ff89da779dcd1ba86834cf9c48d9';

function Navigation() {
    const { Signout, isLoggedIn } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);
    const [userDrop, setUserDrop] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=> {
        const handleScroll = ()=> {
            setScrolling(window.scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll);
        return ()=> window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleUser = ()=> setUserDrop(!userDrop);
    const handleLogout = ()=> {
        Signout();
        navigate('/');
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.length > 2) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setSearchResults(data.results ? data.results.slice(0, 5) : []);
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className={`navigation-container ${scrolling ? 'scrolled' : ""}`}>
            <Link to={'/'} style={{color: scrolling ? "#fff" : '#ffb606'}} onClick={()=> setIsMobile(false)}>NITROFLIX</Link>
            
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchQuery} 
                    onChange={handleSearch} 
                />
                {searchResults.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map(movie => (
                            <li key={movie.id} onClick={() => navigate(`/Trend/${movie.id}`)}>
                                {movie.title} ({movie.release_date?.split("-")[0] || "N/A"})
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className={`nav-link ${isMobile ? 'mobile active' : ''}`} onClick={()=> setIsMobile(false)}>
                <li><Link to='/blog' style={{color: scrolling ? "#fff" : '#ffb606'}} onClick={()=> setIsMobile(false)}> Blog </Link></li>
                <li><Link to='/contact' style={{color: scrolling ? "#fff" : '#ffb606'}} onClick={()=> setIsMobile(false)}> Contact </Link></li>
            </div>
            
            <div className="toggle-menu" onClick={()=> setIsMobile(!isMobile)}>{isMobile ? <HiMiniXMark /> : <CgMenu />}</div>
        </div>
    );
}

export default Navigation;
