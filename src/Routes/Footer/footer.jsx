import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        {/* Top Section */}
        <div className="footer-top">
          <Link className="footer-logo">NITROFLIX</Link>
          <div className="footer-social">
            <a href="#" className="hover:text-red-500"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-red-500"><FaTwitter size={24} /></a>
            <a href="#" className="hover:text-red-500"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-red-500"><FaYoutube size={24} /></a>
          </div>
        </div>
      <div className="container">

        {/* Navigation Links Section */}
        <div className="footer-nav">
          
            <ul className=" ">
            <h3>Company</h3>
              <li><a href="#" className="hover:text-red-500">About Us</a></li>
              <li><a href="#" className="hover:text-red-500">Careers</a></li>
              <li><a href="#" className="hover:text-red-500">Press</a></li>
            </ul>
          
            <ul className="">
            <h3 >Support</h3>
              <li><a href="#" className="hover:text-red-500">Help Center</a></li>
              <li><a href="#" className="hover:text-red-500">Contact Us</a></li>
              <li><a href="#" className="hover:text-red-500">FAQs</a></li>
            </ul>
          
          <div>
            <ul className="">
            <h3 >Legal</h3>
              <li><a href="#" className="hover:text-red-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <ul className="">
            <h3>More</h3>
              <li><a href="#" className="hover:text-red-500">Blog</a></li>
              <li><a href="#" className="hover:text-red-500">Partnerships</a></li>
              <li><a href="#" className="hover:text-red-500">Advertising</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Nitroflix. All rights reserved. <Link  style= {{color: '#777'}}> HejiDev </Link></p>
           
          <p>Made with ❤️ for movie lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

