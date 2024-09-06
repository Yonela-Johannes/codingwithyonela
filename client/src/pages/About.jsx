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
      transition={{ duration: 0.5, delay: 0.2 }}>
      <div className="text-start mt-4">
        <span className="bg-bg_grey text-cl_primary rounded-full h-6 text-sm font-medium px-2 py-1">
          Focus
        </span>
        <h2 className="text-xl sm:text-3xl lg:text-4xl mt-10 lg:mt-20 tracking-wide">
          Here passion {" "}
          <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} bg-clip-text`}>
            meets patience
          </span>
        </h2>
      </div>
      <div className={`lg:flex ${theme == "light" ? "text-cl_alt" : "text-bg_light"} h-full space-y-8`}>
        <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl mt-10`}>

          CodingWithYonela is a reflection of my journey as a developer, where being content means finding joy in the process and mastering the finer details of coding.
          <br />
          <br />
          My name is Yonela, and true to its meaning — "to be content"— I've built this space to track my projects, collaborate efficiently, and share knowledge with a like-minded community.
        </p>
        <hr className="m4-8" />
        <AboutMe theme={theme} />
      </div>
    </motion.div>
  );
};

export default About;
