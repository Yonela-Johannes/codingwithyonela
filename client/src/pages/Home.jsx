import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import HeroSection from "../components/home/HeroSection";
import FeatureSection from "../components/home/FeatureSection";
import Workflow from "../components/home/Workflow";
import Testimonials from "../components/home/Testimonials";
import About from "./About";
import BookingOverview from "./overview";
import Newsletter from "../components/Newsletter/Newsletter";
import Team from "../components/team/Team";
import { Helmet } from "react-helmet";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <Helmet>
        <meta name="author" content="CodingWithYonela" />
        <meta name="referrer" content="origin" />
        <meta
          name="description"
          content="A dynamic platform for project management, collaboration, and community building. Track projects, share ideas, and connect with like-minded individuals—all in one space designed to empower your creativity and growth."
        />
        <meta
          name="keywords"
          content="project management, collaboration, community building, task tracking, idea sharing, project collaboration, communication hub, dynamic workspaces, creative solutions, team collaboration, online collaboration, project tracking, digital community"
        />
        <meta
          name="title"
          content="CodingWithYonela software developer website"
        />
        <meta property="og:image" content="./logo.png" />
        <meta property="og:title" content="CodingWithYonela" />
        <meta
          property="og:description"
          content="A dynamic platform for project management, collaboration, and community building. Track projects, share ideas, and connect with like-minded individuals—all in one space designed to empower your creativity and growth."
        />
        <meta property="og:url" content="https://codingwithyonela.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:image:alt" content="CodingWithYonela" />
        <meta property="og:site_name" content="CodingWithYonela" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CodingWithYonela" />
        <meta
          name="twitter:description"
          content="A dynamic platform for project management, collaboration, and community building. Track projects, share ideas, and connect with like-minded individuals—all in one space designed to empower your creativity and growth."
        />
        <meta name="twitter:image" content="./logo.png" />
        <meta name="author" content="CodingWithYonela" />
        <meta name="creator" content="CodingWithYonela" />
        <meta name="designer" content="CodingWithYonela" />
        <meta name="publisher" content="CodingWithYonela" />
        <meta name="owner" content="CodingWithYonela" />

        <meta
          name="description"
          content="Coding tutorials, blog posts, and more from CodingWithYonela"
        />

        <meta property="og:site_name" content="CodingWithYonela" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div
        className={`${
          theme == "light" ? "text-black" : "text-white"
        } flex flex-col w-full h-full gap-1 lg:gap-8`}
      >
        <HeroSection />
        <About />
        <FeatureSection />
        <Workflow />
        <Team />
        <Testimonials />
        <BookingOverview />
        <Newsletter />
      </div>
    </>
  );
};

export default Home;
