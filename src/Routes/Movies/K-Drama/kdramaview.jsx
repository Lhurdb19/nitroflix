import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import "./Kdramaview.css";
import LoadSpinner from "../../../Spinner/LoadSpinner";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";
const BASE_URL = "https://api.themoviedb.org/3/discover/tv";

const fetchKdramaMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get(`${BASE_URL}`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      with_genres: 18, // Assuming Drama genre
      page: pageParam,
    },
  });
  return response.data;
};

function Kdramaview() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("kdramaMovies", fetchKdramaMovies, {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page < lastPage.total_pages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "loading") {
    return (
      <div className="kdramaview-container">
        <h1>K-Drama Movies</h1>
        <div className="kdramaview-wrapper">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="kdramaview-box">
              <Skeleton height={270} width="100%" borderRadius={10} />
              <Skeleton height={20} width="80%" style={{ marginTop: 10 }} />
              <Skeleton height={15} width="60%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (status === "error") return <p>Error loading K-Drama movies!</p>;

  return (
    <div className="kdramaview-container">
      <h1>K-Drama Movies</h1>
      <div className="kdramaview-wrapper">
        {data.pages.map((page) =>
          page.results.map((movie) => (
            <Link
              to={`/Trend/${movie.id}`}
              key={movie.id}
              className="kdramaview-link"
            >
              <div className="kdramaview-box">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.name} Poster`}
                />
                <div className="kdramaview-overlay">
                  <h2>{movie.name || movie.original_name}</h2>
                  <p>Release: {movie.first_air_date}</p>
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

export default Kdramaview;
