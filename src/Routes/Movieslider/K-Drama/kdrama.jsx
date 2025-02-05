import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Kdrama.css"; // Ensure this file exists and is correctly named

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Kdramamovie() {
    const [kdramaMovies, setKdramaMovies] = useState([]);

    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`)
        .then((response) => {
            console.log("API Response:", response.data); // Log response data
            if (response.data.results) {
                setKdramaMovies(response.data.results);
            } else {
                console.error("No results found in API response");
            }
        })
        .catch((error) => {
            console.error("Error fetching K-Drama Movies:", error);
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
            { breakpoint: 480, settings: { arrows: false, slidesToShow: 3, slidesToScroll: 1 } },
        ],
    };

    return (
        <div className="kdrama-container">
            <h1>K-Drama Movies</h1>
            <div className="kdrama-wrapper">
                {kdramaMovies.length > 0 ? (
                    <Slider {...settings} className="kdrama-slider">
                        {kdramaMovies.map((movie) => (
                            movie.poster_path && (
                                <Link to={`/Trend/${movie.id}`} className="kdrama-link" key={movie.id}>
                                    <div className="kdrama-box">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                            alt={movie.name ? `${movie.name} Poster` : "No title available"}
                                        />
                                        <div className="kdrama-overlay">
                                            <h2>{movie.name || "Unknown Title"}</h2>
                                            <p>Release: {movie.first_air_date || "N/A"}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </Slider>
                ) : (
                    <p>Loading K-Drama movies...</p>
                )}
            </div>
            <Link to={'/kdramaview'}>See More</Link>
        </div>
    );
}

export default Kdramamovie;
