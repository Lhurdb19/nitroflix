import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import LoadSpinner from '../../../Spinner/LoadSpinner';
import './Popularview.css';
import usePopularMovies from '../../../lib/fetchPopularMovies';

function Popularview() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = usePopularMovies();
  const loaderRef = useRef(null); // Reference for IntersectionObserver

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

  if (status === "loading") return <p>Loading popular movies...</p>;
  if (status === "error") return <p>Error loading popular movies!</p>;

  return (
    <div className='popularview-container'>
      <h1>Popular Movies</h1>
      <div className="popularview-wrapper">
        {data?.pages.map((page) => 
          page.results.map((movie) => (
            <Link to={`/Trend/${movie.id}`} key={movie.id} className='popularview-link'>
              <div className="popularview-box">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="popularview-overlay">
                  <h2>{movie.title}</h2>
                  <p>Release: {movie.release_date}</p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Auto-loading spinner when fetching next page */}
      <div ref={loaderRef} className="loader-container">
        {isFetchingNextPage && <LoadSpinner />}
      </div>
    </div>
  );
}

export default Popularview;
