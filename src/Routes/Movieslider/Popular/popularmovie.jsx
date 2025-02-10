import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Popularmovie.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function Popularmovie() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((response) => {
        setPopularMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching popular movies:", error);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    autoplay: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  return (
    <div className="popular-container">
      <div className="popular-wrapper">
        {loading ? (
          <div className="skeleton-box"></div>
        ) : (
          <Slider {...settings} className="fade-slider">
            {popularMovies.map((movie) => (
              <Link
                to={`/Trend/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
                key={movie.id}
              >
                <div className="popular-box">
                  <div className="popular-overlay">
                    <h2>Title: {movie.title}</h2>
                    <p>Release: {movie.release_date}</p>
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
      <Link to={'popularview'}>See More</Link>
    </div>
  );
}

export default Popularmovie;