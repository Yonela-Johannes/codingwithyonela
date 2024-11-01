import { useContext, useEffect, useState } from "react";
import peer from "../../data/peer.png";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import Header from "../../shared/Header";
import { SlideUp } from "../../animation/animate";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)]">
      <Header />
      <motion.h1
        variants={SlideUp(0.4)}
        initial="initial"
        whileInView="animate"
        className={`${
          theme == "light"
            ? "bg-bg_lightest text-clr_alt"
            : "bg-bg_grey text-cl_primary"
        } mb-2 text-cl_primary text-sm font-medium lg:px-2 py-1 w-max tracking-wide`}
      >
        CodingWithContent
      </motion.h1>
      <div className={`flex flex-col h-full lg:flex-row gap-4 lg:gap-8`}>
        <div>
          <motion.p
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            className={`text-sm lg:text-base ${
              theme == "light" ? "text-bg_primary" : "text-bg_lightest"
            } max-w-2xl`}
          >
            A simple collaboration app built by a developer, for developers.
            This space is designed to foster teamwork, streamline project
            management, and bring innovative ideas to life.
            <br />
            <br />
            Whether you're working on solo projects or collaborating with a
            team, this platform makes it easy to track progress, share insights,
            and communicate effectively.
            <br />
            <br />I created this app to grow my own community, solve ideas
            together, and make meaningful connections along the way. Empowering
            developers to collaborate and succeed, all in one place
          </motion.p>
          <motion.div
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            className="flex my-10"
          >
            <Link
              to="/recommendation"
              className={`${
                theme !== "light" ? "bg-clr_alt" : "bg-cl_primary"
              } shadow-[5px_5px_0px_0px_#6c6c6c] lg:py-2 lg:px-4 py-1 px-2 mx-2 lg:mx-3`}
            >
              Get started
            </Link>
            <a
              href="https://yonela-johannes.vercel.app/"
              target="_blank"
              className={`${
                theme == "light" ? "border-clr_alt" : "border-cl_primary"
              } primary-btn lg:py-2 lg:px-4 py-1 px-2 mx-2 lg:mx-3 border`}
            >
              My portfolio
            </a>
          </motion.div>
        </div>
        <motion.div
          variants={SlideUp(0.5)}
          initial="initial"
          whileInView="animate"
          className="flex items-center justify-center"
        >
          <motion.img
            variants={SlideUp(0.6)}
            initial="initial"
            whileInView="animate"
            src={peer}
            className="max-h-full max-w-[300px] object-cover shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c]"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
