import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import './Upcomingview.css';

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Upcomingview() {
    const [upcomingViews, setUpcomingViews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
            .then((response) => {
                setTimeout(() => {
                    setUpcomingViews(response.data.results);
                    setLoading(false);
                }, 2000); // Ensures skeleton is shown for at least 2s
            })
            .catch((error) => {
                console.error("Error fetching upcoming movies!", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='upcomingview-container'>
            <h1>Upcoming Movies</h1>
            <div className="upcomingview-wrapper">
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="upcomingview-box">
                            <Skeleton height={270} width="100%" borderRadius={10} />
                            <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
                            <Skeleton height={15} width="60%" />
                        </div>
                    ))
                    : upcomingViews.map((movie) => (
                        <Link to={`/Trend/${movie.id}`} key={movie.id} className='upcomingview-link'>
                            <div className="upcomingview-box">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                                <div className="upcomingview-overlay">
                                    <h2>{movie.title}</h2>
                                    <p>Release: {movie.release_date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default Upcomingview;
