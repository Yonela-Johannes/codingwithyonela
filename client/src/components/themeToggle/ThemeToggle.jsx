import styles from "./themeToggle.module.css";
import { useContext } from "react";
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.png';
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () =>
{
  const { toggle, theme } = useContext(ThemeContext);
  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === "dark" ? { backgroundColor: "black" } : { backgroundColor: "gray" }
      }
    >
      <img src={moon} alt="" width={20} height={20} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "gray" }
            : { right: 1, background: "white" }
        }
      ></div>
      <img src={sun} alt="" width={22} height={22} />
    </div>
  );
};

export default ThemeToggle;
