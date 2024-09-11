import React, { useContext } from "react";
import { delay, motion } from "framer-motion";
import { SlideUp } from "../../animation/animate";
import { ThemeContext } from "../../context/ThemeContext";

const Newsletter = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <div className="max-w-[500px] space-y-5 py-14">
      <motion.h1
        variants={SlideUp(0.2)}
        initial="initial"
        whileInView="animate"
        className="text-xl lg:text-4xl font-bold"
      >
        Subsribe to our Newsletter
      </motion.h1>
      <motion.p
        variants={SlideUp(0.4)}
        initial="initial"
        whileInView="animate"
        className="max-w-[400px] text-sm"
      >
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed libero
        doloremque ab eum!
      </motion.p>
      {/* form here */}
      <motion.div
        variants={SlideUp(0.6)}
        initial="initial"
        whileInView="animate"
        className="!mt-10 flex"
      >
        <input
          type="text"
          placeholder="Enter your email"
          className=""
        />
        <button className={`${theme == 'light' ? 'bg-bg_lightest border-bg_lightest' : 'bg-bg_core border-bg_core'} px-6 py-4 uppercase`}>
          Subscribe
        </button>
      </motion.div>
    </div>
  );
};

export default Newsletter;
