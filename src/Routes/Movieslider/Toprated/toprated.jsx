import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import "./Toprated.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

const Toprated = () => {
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`)
      .then((response) => {
        setTopMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching Top Rated movies:", error);
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
      <div className="top-component">
        <h1>Top Rated Movies</h1>
        <div className="top-wrapper">
          <Slider {...settings} className="top-slider">
            {topMovies.map((movie) => (
              <Link
                to={`/Trend/${movie.id}`}
                className="top-link"
                key={movie.id} >
                <div className="top-box">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`${movie.name} Poster`} />
                  <div className="top-overlay">
                    <h2>{movie.name}</h2>
                    <p>Release: {movie.first_air_date}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        
      {/* <Link to={'/topratedview'}>See More</Link> */}
      </div>
    </Fragment>
  );
};

export default Toprated;
