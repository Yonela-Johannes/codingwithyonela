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
        theme === "dark" ? { backgroundColor: "white" } : { backgroundColor: "#0f172a" }
      }
    >
      <img src={moon} alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" }
            : { right: 1, background: "white" }
        }
      ></div>
      <img src={sun} alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
