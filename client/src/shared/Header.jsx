import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { SlideLeft } from "../animation/animate";
import { motion } from "framer-motion";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-col md:flex-row md:gap-20 items-center overflow-x-hidden mb-2">
      <div className="flex items-start gap-3 flex-col w-full">
        <motion.h1
          variants={SlideLeft(0.2)}
          initial="initial"
          whileInView="animate"
          className={`${
            theme == "light" ? "text-black" : "text-white"
          } font-bold text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl md:mb-3`}
        >
          Becoming a{" "}
          <span
            className={`${
              theme !== "light" ? "text-clr_alt" : "text-cl_primary"
            } `}
          >
            better <br />
            programmer
          </span>
        </motion.h1>
      </div>
    </div>
  );
};

export default Header;
