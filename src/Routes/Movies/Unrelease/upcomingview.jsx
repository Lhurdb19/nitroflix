import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LoadSpinner from "../../../Spinner/LoadSpinner";
import "./Upcomingview.css";
import useUpcomingMovies from "../../../lib/fetchUpcomingMovies";

function Upcomingview() {
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, status } =
    useUpcomingMovies();
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // Load more movies automatically
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="upcomingview-container">
        <h1>Upcoming Movies</h1>
        <div className="upcomingview-wrapper">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="upcomingview-box">
              <Skeleton height={270} width="100%" borderRadius={10} />
              <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
              <Skeleton height={15} width="60%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") return <p>Error loading Upcoming movies</p>;

  return (
    <div className="upcomingview-container">
      <h1>Upcoming Movies</h1>
      <div className="upcomingview-wrapper">
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <Link
              to={`/Trend/${movie.id}`}
              key={movie.id}
              className="upcomingview-link"
            >
              <div className="upcomingview-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
                <div className="upcomingview-overlay">
                  <h2>{movie.title}</h2>
                  <p>Release: {movie.release_date}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={loaderRef} className="loader-container">
        {isFetchingNextPage && <LoadSpinner />}
      </div>
    </div>
  );
}

export default Upcomingview;
