import { BrowserRouter as Router } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";
import { Element } from "react-scroll";
import Navigation from "./Navigation/navigation";
// import Login from "./Auth/login";
// import Signup from "./Auth/signup";
import Home from "./Routes/Home/home";
import About from "./Routes/About/about";
import Portfolio from "./Routes/Portfolio/portfolio";
import Blog from "./Routes/Blog/blog";
import Contact from "./Routes/Contact/contact";
import Faq from "./Routes/Faq/faq";
import Pricing from "./Routes/Pricing/pricing";
import Service from "./Routes/Service/service";
import Team from "./Routes/Team/team";
import Testimonial from "./Routes/Testimonials/testimonial";
import Footer from "./Routes/Footer/footer"


function App() {

  return (
      <Router>
      <Navigation/>
      <Element name="home"><Home/></Element>
      <Element name="about"><About/></Element>
      <Element name="contact"><Contact/></Element>
      <Element name="pricing"><Pricing/></Element>
      <Element name="blog"><Blog/></Element>
      <Element name="faq"><Faq/></Element>
      <Element name="portfolio"><Portfolio/></Element>
      <Element name="service"><Service/></Element>
      <Element name="team"><Team/></Element>
      <Element name="testimonial"><Testimonial/></Element>
      {/* <Element name="login"><Login/></Element> */}
      {/* <Element name="signup"><Signup/></Element> */}
      <Footer/>
      </Router>
  );
}

export default App;
