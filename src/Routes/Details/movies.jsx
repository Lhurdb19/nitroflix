import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Movies.css";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";

function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}hr ${remainingMinutes}mins`;
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="detail-container skeleton">
          <div className="skeleton-img"></div>
          <span>
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </span>
        </div>
      ) : (
        <div className="detail-container">
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
          <span>
            <h1>{movie.title}</h1>
            <h3>Duration: {formatDuration(movie.runtime)}</h3>
            <p>Release Date: {movie.release_date}</p>
            <h3>
              Genres: {movie.genres.map((genre) => genre.name).join(", ")}
            </h3>
            <p className="overview">Overview: {movie.overview}</p>
            <p>Popularity: {movie.popularity}</p>
            <a href="https://www.youtube.com/watch?v=BLjvq2mlxBw">Play Now</a>
          </span>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
