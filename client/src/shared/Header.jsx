import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const Header = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="flex flex-col md:flex-row md:gap-20 items-center overflow-x-hidden mb-2">
      <div className="flex items-start gap-3 flex-col pt-4 w-full">
        <p className={`${theme == "light" ? "text-black" : "text-white"} text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl md:mb-3`}>
          Becoming a{" "}
          <span className={`${theme !== "light" ? "text-clr_alt" : "text-cl_primary"} `}>
            better <br />
            programmer
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
