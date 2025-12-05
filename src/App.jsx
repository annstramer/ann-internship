import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Explore from "./pages/Explore";
import Author from "./pages/Author";
import ItemDetails from "./pages/ItemDetails";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/styles/slickCarouselStyles.css"; // updates to styles.css for NewItems component
import AOS from 'aos';
import 'aos/dist/aos.css';
import './css/styles/aosAnimateAdditions.css'

function App() {
  useEffect(() => {
    AOS.init({
      // Optional: Configure global settings for AOS
      duration: 600,
      easing: 'ease-in-out',
      once: true, // Only animate once
      // disable: 'mobile' // Disable on mobile devices
    });
  }, []);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/author/:authorId" element={<Author />} />
        <Route path="/item-details/:nftId" element={<ItemDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
