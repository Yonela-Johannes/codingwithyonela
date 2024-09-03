import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import HeroSection from '../components/home/HeroSection'
import FeatureSection from '../components/home/FeatureSection'
import Workflow from "../components/home/Workflow";
import Testimonials from "../components/home/Testimonials";
import About from "./About";
import BookingOverview from "./overview";

const Home = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == "light" ? "text-black" : "text-white"} flex flex-col w-full h-full gap-1 lg:gap-8`}>
      <HeroSection />
      <About />
      <FeatureSection />
      <Workflow />
      <Testimonials />
      <BookingOverview />
    </div>
  );
};

export default Home;
