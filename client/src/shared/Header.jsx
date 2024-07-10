import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Header = () =>
{
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:gap-20 items-center overflow-x-hidden mb-4">
      <div className="flex items-start gap-3 flex-col pt-8 w-full">
        <h2 className={`${theme == "light" ? "text-black" : "text-white"} text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl md:mb-3`}>
          Becoming a{" "}
          <span className="text-clr_alt">
            better <br />
            programmer
          </span>
        </h2>
        <button className={`${theme == "light" ? "text-black" : "text-white border-none"}`} onClick={() => navigate('/sign-in')}>Join in</button>
      </div>
      <Hero />
    </div>
  );
};

export default Header;
