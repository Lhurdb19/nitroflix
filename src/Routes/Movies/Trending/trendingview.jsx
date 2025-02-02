import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Trendingview.css';


const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Trendingview() {
    const [trendingView, setTrendingView] = useState([]);

    useEffect(() => {
        axios 
        .get(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
        .then((response) => {
          setTrendingView(response.data.results);
        })
        .catch((error) => {
          console.error("Error fetching trending movies!", error);
        });
}, []);

  return (
    <div>
      <div className="trendingview-container">
        <h1>Trending Movies</h1>
        <div className="trendingview-wrapper">
            {trendingView.map((movie) => (
                <Link to={`/Trend/${movie.id}`} key={movie.id} className='trendingview-link'>
                    <div className="trendingview-box">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title} Poster`} />
                        <div className="trendingview-overlay">
                        <h2>{movie.title}</h2>
                        <p>Release: {movie.release_date}</p>
                  </div>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Trendingview;
