import React from "react";
import Hero from "../components/Hero";
import FeaturedSection from "../components/FeaturedSection";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testimonials />
      <NewsLetter />
    </div>
  );
};

export default Home;
