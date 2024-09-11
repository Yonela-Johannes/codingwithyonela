import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";
import { Head } from "../../shared/Head";

const Newsletter = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="max-w-[500px] space-y-5 py-14">
      <Head
        title="Subsribe to our Newsletter"
        desc="Stay in the loop with project updates, articles, and community news—straight to your inbox."
        theme={theme}
      />
      {/* form here */}
      <motion.div
        variants={SlideUp(0.6)}
        initial="initial"
        whileInView="animate"
        className="!mt-10 flex"
      >
        <input type="text" placeholder="Enter your email" className="" />
        <button
          className={`${
            theme == "light"
              ? "bg-bg_lightest border-bg_lightest"
              : "bg-bg_core border-bg_core"
          } px-6 py-4 uppercase`}
        >
          Subscribe
        </button>
      </motion.div>
    </div>
  );
};

export default Newsletter;
