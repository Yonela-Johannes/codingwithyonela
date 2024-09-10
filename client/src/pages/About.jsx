import { useContext } from "react";
import AboutMe from "../components/AboutMe";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

const About = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className=""
      >
      <div className="text-start">
        <h2 className="text-xl sm:text-3xl lg:text-4xl tracking-wide">
          Here passion {" "}
          <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} bg-clip-text`}>
            meets patience
          </span>
        </h2>
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
    </motion.div>
  );
};

export default About;
