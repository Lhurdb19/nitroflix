import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./Trending.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

const Trendingmovie = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((response) => {
        setTrendingMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true, /* Allow infinite scrolling */
    speed: 500,
    slidesToShow: 5, /* Reduced for better fit */
    slidesToScroll: 2,
    // centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <div className="trending-component">
        <h1>Trending Movies</h1>
        <div className="slider-wrap">
          <Slider {...settings} className="slider">
            {trendingMovies.map((movie) => (
              <Link
                to={`/Trend/${movie.id}`}
                className="trending-link"
                key={movie.id} >
                <div className="trending-box">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.title} Poster`} />
                  <div className="trending-overlay">
                    <h2>{movie.title}</h2>
                    <p>Release: {movie.release_date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        
      <Link to={'/trendingview'}>See More</Link>
      </div>
    </Fragment>
  );
};

export default Trendingmovie;
