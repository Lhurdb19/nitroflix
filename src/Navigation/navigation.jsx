import React, { useContext, useEffect, useState } from 'react'; 
import { AuthContext } from '../ContextApi/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { HiMiniXMark } from "react-icons/hi2";
import { CgMenu } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import './Navigation.css';

const API_KEY = '4288ff89da779dcd1ba86834cf9c48d9';

function Navigation() {
    const { isLoggedIn, user, Signout } = useContext(AuthContext);
    const [isMobile, setIsMobile] = useState(false);
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);
    const [userDrop, setUserDrop] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchDropped, setIsSearchDropped] = useState(false);
    const [closeSearchButton, setCloseSearchButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolling(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleUser = () => setUserDrop(!userDrop);

    const handleCloseSearch = () => {
        setCloseSearchButton(!closeSearchButton);
        setSearchResults([]); // Clear results properly
        setSearchQuery(""); // Clear input
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 2) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();

                // Fetch detailed movie data to get production countries
                const detailedResults = await Promise.all(
                    data.results.slice(0, 5).map(async (movie) => {
                        const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}`);
                        const detailsData = await detailsResponse.json();
                        return { ...movie, production_countries: detailsData.production_countries || [] };
                    })
                );

                setSearchResults(detailedResults);
            } catch (error) {
                console.error("Error fetching movie data:", error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchDropped = () => {
        setIsSearchDropped(!isSearchDropped)
    };


    const handleMovieSelect = (movieId) => {
        navigate(`/Trend/${movieId}`);
        setSearchQuery(""); // Clear search box
        setSearchResults([]); // Clear search results
    };

    // Extract user initials
    const getUserInitials = () => {
        if (user?.firstName) {
            const firstInitial = user.firstName.charAt(0).toUpperCase();
            const lastInitial = user.lastName ? user.lastName.charAt(0).toUpperCase() : "";
            return `${firstInitial}${lastInitial}`;
        }
        return null;
    };

    return (
        <>
        <div className={`navigation-container ${scrolling ? 'scrolled' : ""}`}>
            <Link to={'/'} style={{ color: scrolling ? "#fff" : '#fff' }} onClick={() => setIsMobile(false)}>
                NITROFLIX
            </Link>

            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchQuery} 
                    onChange={handleSearch} 
                />
                {searchResults.length > 0 && (
                    <ul className="search-results-overlay">     
                            <div className="search-result">
                                <div className="close-search">
                                <span className="movie-origin">
                                        {searchResults[0]?.production_countries?.[0]?.iso_3166_1 || "N/A"}
                                    </span>
                                    <button onClick={ handleCloseSearch } className='close-btn'>
                                    <HiMiniXMark className="close-icon" />
                                    </button>
                                </div>
                        {searchResults.map(movie => (
                            <li key={movie.id} onClick={() => handleMovieSelect(movie.id)}>
                                {movie.title ? `${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})` : `${movie.name} (${movie.first_air_date?.split("-")[0] || "N/A"})`}
                                <span className="movie-component"> - {movie.production_countries?.[0]?.iso_3166_1 || "N/A"}</span>
                            </li>
                        ))}
                        </div>
                    </ul>
                )}
            </div>

            <div className={`nav-link ${isMobile ? 'mobile active' : ''}`} onClick={()=> setIsMobile(!isMobile)}>
                <li><Link to='/blog' style={{ color: scrolling ? "#fff" : '#fff' }} onClick={() => setIsMobile(!isMobile)}> Blog </Link></li>
                <li><Link to='/contact' style={{ color: scrolling ? "#fff" : '#fff' }} onClick={() => setIsMobile(!isMobile)}> Contact </Link></li>
            </div>

            <div className="user" onClick={handleUser}>
                {isLoggedIn && getUserInitials() ? (
                    <p className="user-initials" style={{ color: scrolling ? '#eb1010' : '#eb1010' }}>{getUserInitials()}</p>
                ) : (
                    <p style={{ color: scrolling ? "#eb1010" : '#eb1010' }}><FaRegUser /></p>
                )}
                {userDrop && (
                    <div className="user-card">
                        {isLoggedIn ? (
                            <>
                                <Link to="/watchlist">Watchlist</Link>
                                <Link to="/favorite">Favorite</Link>
                                <Link to="/account">Account Management</Link>
                                <Link onClick={Signout}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <p onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Login</p>
                                <p onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Sign Up</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="mobile-user-toggle-menu" >
                <div className="mobile-search-bar" onClick={handleSearchDropped}>
                    <IoMdSearch className='search-icon' style={{color: '#fff', fontSize: "18px"}}/>
                 {isSearchDropped && (
                  <div className="search-drop">
                    <input 
                    type="text" 
                    placeholder="Search movies..." 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    autoFocus
                    />
                    {searchResults.length > 0 && (
                    <ul className="mobile-search-results-overlay">
                        <div className="mobile-search-result">
                                <div className="mobile-close-search">
                                
                                    <button onClick={ handleCloseSearch } className='close-btn'>
                                    <HiMiniXMark className="close-icon" />
                                    </button>
                                </div>
                        {searchResults.map(movie => (
                            <li key={movie.id} onClick={() => handleMovieSelect(movie.id)}>
                                {movie.title ? `${movie.title} (${movie.release_date?.split("-")[0] || "N/A"})` : `${movie.name} (${movie.first_air_date?.split("-")[0] || "N/A"})`}
                                <span className="movie-component"> - {movie.production_countries?.[0]?.iso_3166_1 || "N/A"}</span>
                            </li>
                        ))}
                        </div>
                    </ul>
                    )}
                  </div>
                 )}
                </div>

            <div className="mobile-user" onClick={handleUser}>
                {isLoggedIn && getUserInitials() ? (
                    <p className="mobile-user-initials" style={{ color: scrolling ? '#eb1010' : '#eb1010' }}>{getUserInitials()}</p>
                ) : (
                    <p style={{ color: scrolling ? "#fff" : '#fff' }}><FaRegUser /></p>
                )}

                {userDrop && (
                    <div className="user-card">
                        {isLoggedIn ? (
                            <>
                                <Link to="/watchlist">Watchlist</Link>
                                <Link to="/favorite">Favorite</Link>
                                <Link to="/account">Account Management</Link>
                                <Link onClick={Signout}>Logout</Link>
                            </>
                        ) : (
                            <>
                                <p onClick={() => navigate("/login")} style={{ cursor: 'pointer' }}>Login</p>
                                <p onClick={() => navigate("/signup")} style={{ cursor: 'pointer' }}>Sign Up</p>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="toggle-menu"onClick={() => setIsMobile(!isMobile)} style={{ color: scrolling ? "#fff" : '#fff' }}>
                {isMobile ? <HiMiniXMark /> : <CgMenu  />}
            </div>
        </div>

        </div>


            </>
    );
}

export default Navigation;
