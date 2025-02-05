import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import './Topratedview.css';

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Topratedview() {
    const [topViews, setTopViews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`)
            .then((response) => {
                setTimeout(() => {
                    setTopViews(response.data.results);
                    setLoading(false);
                }, 2000); // Ensures skeleton is shown for at least 2s
            })
            .catch((error) => {
                console.error("Error fetching top rated movies!", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='topview-container'>
            <h1>Top Rated Movies</h1>
            <div className="topview-wrapper">
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="topview-box">
                            <Skeleton height={270} width="100%" borderRadius={10} />
                            <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
                            <Skeleton height={15} width="60%" />
                        </div>
                    ))
                    : topViews.map((movie) => (
                        <Link to={`/Trend/${movie.id}`} key={movie.id} className='topview-link'>
                            <div className="topview-box">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                                <div className="topview-overlay">
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

export default Topratedview;
