import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "./Trending.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

const Trendingmovie = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
      .then((response) => {
        setTrendingMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
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
    <Fragment>
      <div className="trending-component">
        <Link to={'/trendingview'} className="heading">
          <h1>Trending Movies</h1>
          <p>view all</p>
        </Link>
        <Link to={'/trendingview'} className="mobile-heading">
          <h1>Trending Movies</h1>
          <MdOutlineKeyboardArrowRight className="arrow-icon" />
        </Link>
        <div className="slider-wrap">
          <Slider {...settings} className="slider">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div className="skeleton-box" key={index}></div>
                ))
              : trendingMovies.map((movie) => (
                  <Link to={`/Trend/${movie.id}`} className="trending-link" key={movie.id}>
                    <div className="trending-box">
                      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} Poster`} />
                      <div className="trending-overlay">
                        <h2>{movie.title}</h2>
                        <p>Release: {movie.release_date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
          </Slider>
        </div>
      </div>
    </Fragment>
  );
};

export default Trendingmovie;
