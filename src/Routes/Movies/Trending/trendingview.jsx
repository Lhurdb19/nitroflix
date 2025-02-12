
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useTrendingMovies from "../../../lib/fetchTrendingMovies";
import "./Trendingview.css";
import LoadSpinner from "../../../Spinner/LoadSpinner";

const Trendingview = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useTrendingMovies();
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); //LOad more movies automatically
        }
      },
      { threshold: 1.0 }
    );

    if(loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") return <p>Loading trending movies...</p>;
  if (status === "error") return <p>Error loading trending movies!</p>;

  return (
    <div className="trendingview-container">
      <h1>Trending Movies</h1>
      <div className="trendingview-wrapper">
        {data?.pages.map((page) =>
          page.results.map((movie) => (
            <Link to={`/Trend/${movie.id}`} key={movie.id} className="trendingview-link">
              <div className="trendingview-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                />
                <div className="trendingview-overlay">
                  <h2>{movie.title || movie.name}</h2>
                  <p>Release: {movie.release_date || "N/A"}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Infinite Auto-loading when fetching next page */}
      
        <div ref={loaderRef} className="loader-container">
          {isFetchingNextPage && <LoadSpinner/>}
        </div>
        
    </div>
  );
};

export default Trendingview;

