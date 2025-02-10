import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import './Upcomingmovie.css' // Ensure this file exists and is correctly named

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Upcomingmovie() {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
        .then((response) => {
            console.log("API Response:", response.data); // Log response data
            if (response.data.results) {
                setUpcomingMovies(response.data.results);
                setLoading(false);
            } else {
                console.error("No results found in API response");
            }
        })
        .catch((error) => {
            console.error("Error fetching K-Drama Movies:", error);
            setLoading(false);
        });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2, infinite: true, dots: true } },
            { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
            { breakpoint: 480, settings: { arrows: false, slidesToShow: 2, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="upcoming-container">
            <Link to={'/upcomingview'} className="heading">
            <h1>Upcoming Movies</h1>
            <p>View all</p>
            </Link>
            
            <Link to={'/upcomingview'} className="mobile-heading">
            <h1>Upcoming Movies</h1>
            <MdOutlineKeyboardArrowRight className="arrow-icon" />
            </Link>

            <div className="upcoming-wrapper">
                {loading ?
                Array.from({ length: 5 }).map((_, index) => (
                    <div className="skeleton-box" key={index}></div>
                )) 
                :
                upcomingMovies.length > 0 ? (
                    <Slider {...settings} className="upcoming-slider">
                        {upcomingMovies.map((movie) => (
                            movie.poster_path && (
                                <Link to={`/Trend/${movie.id}`} className="upcoming-link" key={movie.id}>
                                    <div className="upcoming-box">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                            alt={movie.name ? `${movie.name} Poster` : "No title available"}
                                        />
                                        <div className="upcoming-overlay">
                                            <h2>{movie.title || movie.name }</h2>
                                            <p>Release: {movie.first_air_date || movie.release_date}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </Slider>
                ) : (
                    <p>Loading Upcoming movies...</p>
                )}
            </div>
        </div>
    );
}

export default Upcomingmovie;
