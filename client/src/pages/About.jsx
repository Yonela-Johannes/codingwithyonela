import { useContext } from "react";
import AboutMe from "../components/AboutMe";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { SlideUp } from "../animation/animate";

const About = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div
      >
      <div className="text-start">
      <div className="space-y-4 max-w-[550px] mb-8">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-xl lg:text-4xl font-bold"
        >
          About
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="text-gray-500 text-sm max-w-[350px]"
        >
          Bring your dream home to life with one-on-one design help & hand
          picked products
        </motion.p>
      </div>
      </div>
      <div className={`lg:flex ${theme == "light" ? "text-cl_alt" : "text-bg_light"} h-full gap-8 items-start justify-start`}>
        <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl`}>

          CodingWithYonela is a reflection of my journey as a developer, where being content means finding joy in the process and mastering the finer details of coding.
          <br />
          <br />
          My name is Yonela, and true to its meaning — "to be content"— I've built this space to track my projects, collaborate efficiently, and share knowledge with a like-minded community.
        </p>
        <AboutMe theme={theme} />
      </div>
    </div>
  );
};

export default About;
