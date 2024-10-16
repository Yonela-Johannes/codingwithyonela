import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () =>
{
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      onClick={toggle}
      className="cursor-pointer text-2xl lg:text-3xl"
    >
      {
        theme === "dark" ? <p className="">🌞</p> : <p className="">🌚</p>
      }
    </div>
  );
};

export default ThemeToggle;
