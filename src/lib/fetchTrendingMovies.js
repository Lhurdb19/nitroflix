
import { useInfiniteQuery } from "react-query";

const API_KEY = "4288ff89da779dcd1ba86834cf9c48d9";
const BASE_URL = "https://api.themoviedb.org/3/trending/all/day";

const fetchTrendingMovies = async ({ pageParam = 1 }) => {
  const response = await fetch(`${BASE_URL}?api_key=${API_KEY}&page=${pageParam}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

const useTrendingMovies = () => {
  return useInfiniteQuery(
    "trendingMovies",
    fetchTrendingMovies,
    {
      getNextPageParam: (lastPage, pages) => {
        const nextPage = lastPage.page + 1;
        return nextPage <= lastPage.total_pages ? nextPage : undefined;
      },
    }
  );
};

export default useTrendingMovies;


