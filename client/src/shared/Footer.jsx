import { Link } from "react-router-dom";
import HoverUnderLine from "../components/HoverUnderLine";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../animation/animate";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const date = new Date().getFullYear();

  return (
    <motion.div
      variants={SlideLeft(0.6)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      whileInView="animate"
      className={`${
        theme == "light" ? "text-black" : "text-bg_lighter"
      } pb-2 lg:pb-6`}
    >
      <div
        className={`${
          theme == "light" ? "text-black" : "text-bg_lighter"
        } flex items-start gap-3 mt-2 flex-col lg:flex-row justify-between py-2 overflow-x-hidden`}
      >
        <div className="flex flex-col gap-10  w-full">
          <div className="space-y-4 text-base font-semibold">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="" className="w-6" />
              <p className="font-semibold">CodingWithYonela</p>
            </div>
            <p>Cape Town, South Africa</p>
            <p>@ {date} CWY All rights reserved</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-sm font-medium">INFORMATION</p>
              <p className="text-sm">Cape Town</p>
              <p className="text-sm">South Africa</p>
              <div className="flex gap-1 mt-2">
                <p className="text-sm font-semibold">Phone:</p>
                <p className="text-sm">069 356 4159</p>
              </div>
              <div className="flex gap-1">
                <p className="text-sm font-semibold">Email:</p>
                <p className="text-sm">johannesyonela@gmail.com</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">ABOUT</p>
              <HoverUnderLine>
                <Link to="/about" className="text-sm">
                  About me
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/blog" className="text-sm">
                  Blogs
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/project-status" className="text-sm">
                  Projects
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/recommendation" className="text-sm">
                  Recommendation
                </Link>
              </HoverUnderLine>
            </div>
            <div className="flex-col flex ">
              <div className="text-sm font-medium">FOR PROJECTS</div>
              <div className="flex flex-col gap-1 font-light  text-sm">
                <div>Project Management</div>
                <div>Goal Management</div>
                <div>Increase Productivity</div>
                <div>Work Management</div>
                <div>Project Planning</div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold">MY SERVICE</p>
              <HoverUnderLine>
                <a
                  target="_blank"
                  href="https://github.com/yonela-johannes"
                  className="text-sm"
                >
                  GitHub
                </a>
              </HoverUnderLine>
              <HoverUnderLine>
                <a
                  target="_blank"
                  href="https://portfolio-beta-red-17.vercel.app/"
                  className="text-sm"
                >
                  Portfolio
                </a>
              </HoverUnderLine>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-semibold border-t-2 pt-5 mt-5 mb-2">
        &copy; {date} TCJ. All rights reserved
      </p>
      <motion.p
        variants={SlideUp(0.6)}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        whileInView="animate"
        className="text-center text-sm font-[500px]"
      >
        With Love ❤️ by Yonela
      </motion.p>
    </motion.div>
  );
};

export default Footer;
