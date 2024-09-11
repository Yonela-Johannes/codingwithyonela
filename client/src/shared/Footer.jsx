import { Link } from "react-router-dom";
import HoverUnderLine from "../components/HoverUnderLine";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";

const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const date = new Date().getFullYear()
  
  return (
    <div className="pb-2 lg:pb-6">
      <div
        className={`${
          theme == "light" ? "text-black" : "text-gray-500"
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
              <p className="text-sm lg:text-base font-semibold">Information</p>
              <p className="text-sm lg:text-base">Cape Town</p>
              <p className="text-sm lg:text-base">South Africa</p>
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
              <p className="text-sm lg:text-base font-semibold">About</p>
              <HoverUnderLine>
                <Link to="/about" className="text-sm lg:text-base">
                  About me
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/blog" className="text-sm lg:text-base">
                  Blogs
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/project-status" className="text-sm lg:text-base">
                  Projects
                </Link>
              </HoverUnderLine>
              <HoverUnderLine>
                <Link to="/recommendation" className="text-sm lg:text-base">
                  Recommendation
                </Link>
              </HoverUnderLine>
            </div>
            <div>
              <p className="text-sm lg:text-base font-semibold">My Services</p>
              <HoverUnderLine>
                <a
                  target="_blank"
                  href="https://github.com/yonela-johannes"
                  className="text-sm lg:text-base"
                >
                  GitHub
                </a>
              </HoverUnderLine>
              <HoverUnderLine>
                <a
                  target="_blank"
                  href="https://portfolio-beta-red-17.vercel.app/"
                  className="text-sm lg:text-base"
                >
                  Portfolio
                </a>
              </HoverUnderLine>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm font-semibold border-t-2 pt-5 mt-5">
        &copy; {date} TCJ. All rights reserved
      </p>
    </div>
  );
};

export default Footer;
