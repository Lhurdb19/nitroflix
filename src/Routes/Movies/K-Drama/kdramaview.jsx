import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import './Kdramaview.css';

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Kdramaview() {
    const [kdramaViews, setKdramaViews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`)
            .then((response) => {
                setTimeout(() => {
                    setKdramaViews(response.data.results);
                    setLoading(false);
                }, 2000); // Ensures skeleton is shown for at least 2s
            })
            .catch((error) => {
                console.error("Error fetching K-Drama movies!", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='kdramaview-container'>
            <h1>K-Drama Movies</h1>
            <div className="kdramaview-wrapper">
                {loading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="kdramaview-box">
                            <Skeleton height={270} width="100%" borderRadius={10} />
                            <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
                            <Skeleton height={15} width="60%" />
                        </div>
                    ))
                    : kdramaViews.map((movie) => (
                        <Link to={`/Trend/${movie.id}`} key={movie.id} className='kdramaview-link'>
                            <div className="kdramaview-box">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                                <div className="kdramaview-overlay">
                                    <h2>{movie.name}</h2>
                                    <p>Release: {movie.first_air_date}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default Kdramaview;
