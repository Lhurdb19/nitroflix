import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navigation from "./Navigation/navigation";
import Home from "./Routes/Home/home";
import About from "./Routes/About/about";
import Trending from "./Routes/Movieslider/Trending/trending";
import Trendingview from "./Routes/Movies/Trending/trendingview";
import Toprated from "./Routes/Movieslider/Toprated/toprated";
import Moviedetail from "./Routes/Details/movies";
import Popularmovie from "./Routes/Movieslider/Popular/popularmovie";
import Popularview from "./Routes/Movies/Popular/popularview";
import Kdramamovie from "./Routes/Movieslider/K-Drama/kdrama";
import Kdramaview from "./Routes/Movies/K-Drama/kdramaview";
import Upcomingmovie from "./Routes/Movieslider/Unrelease/upcomingmovie";
import Upcomingview from "./Routes/Movies/Unrelease/upcomingview";
import Footer from "./Routes/Footer/footer";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/trendingview" element={<Trendingview/>}/>
          <Route path="/toprated" element={<Toprated/>}/>
          <Route path="/popularmovie" element={<Popularmovie/>}/>
          <Route path="/popularview" element={<Popularview/>}/>
          <Route path="/kdrama" element={<Kdramamovie/>}/>
          <Route path="/kdramaview" element={<Kdramaview/>}/>
          <Route path="/upcomingmovie" element={<Upcomingmovie/>}/>
          <Route path="/upcomingview" element={<Upcomingview/>}/>
          <Route path="/Trend/:id" element={<Moviedetail />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
