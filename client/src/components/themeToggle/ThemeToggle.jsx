import styles from "./themeToggle.module.css";
import { useContext } from "react";
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';
import { ThemeContext } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () =>
{
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      onClick={toggle}
      className="cursor-pointer text-2xl lg:text-4xl"
    >
      {
        theme === "dark" ? <p className="">🌞</p> : <p className="">🌚</p>
      }
    </div>
  );
};

export default ThemeToggle;
