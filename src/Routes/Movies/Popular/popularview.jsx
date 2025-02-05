import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Popularview.css';

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9"

function Popularview() {
    const [popularViews, setPopularViews] = useState([]);

    useEffect(() => {
        axios 
        .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then((response) => {
            setPopularViews(response.data.results);
        })
        .catch((error) => {
            console.error("Error fetching popular movies!", error);
        })
    }, []);


  return (
    <>
    <div className='popularview-container'>
      <h1>Popular Movies</h1>
      <div className="popularview-wrapper">
        {popularViews.map((movie) => (
            <Link to={`/Trend/${movie.id}`} key={movie.id} className='popularview-link'>
                <div className="popularview-box">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                    <div className="popularview-overlay">
                        <h2>{movie.title}</h2>
                        <p>Release: {movie.release_date}</p>
                    </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
    </>
  )
}

export default Popularview;
