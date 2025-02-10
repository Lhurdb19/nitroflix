import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./Kdrama.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Kdramamovie() {
    const [kdramaMovies, setKdramaMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}`)
        .then((response) => {
            if (response.data.results) {
                setKdramaMovies(response.data.results);
                setLoading(false);
            }
        })
        .catch(() => setLoading(false));
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
        <div className="kdrama-container">
            <Link to={'/kdramaview'} className="heading">
                <h1>K-Drama Movies</h1>
                <p>View all</p>
            </Link>
            <Link to={'/kdramaview'} className="mobile-heading">
                <h1>K-Drama Movies</h1>
                <MdOutlineKeyboardArrowRight className="arrow-icon" />
            </Link>
            <div className="kdrama-wrapper">
                {loading ? (
                    <div className="skeleton-slider">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="skeleton-box"></div>
                        ))}
                    </div>
                ) : (
                    <Slider {...settings} className="kdrama-slider">
                        {kdramaMovies.map((movie) => (
                            movie.poster_path && (
                                <Link to={`/Trend/${movie.id}`} className="kdrama-link" key={movie.id}>
                                    <div className="kdrama-box">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                            alt={movie.name || "Unknown Title"}
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
                )}
            </div>
        </div>
    );
}

export default Kdramamovie;
