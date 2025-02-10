import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Trending from '../Movieslider/Trending/trending';
import Popularmovie from '../Movieslider/Popular/popularmovie';
import Kdramamovie from '../Movieslider/K-Drama/kdrama';
import Upcomingmovie from '../Movieslider/Unrelease/upcomingmovie';
import Toprated from '../Movieslider/Toprated/toprated';


function Home() {
  return (
    <div className='home-container'>
      <Popularmovie/>

      <Trending/>
      
      <Toprated/>

      <Kdramamovie/>
      
      <Upcomingmovie/>
    </div>
  )
}

export default Home;
