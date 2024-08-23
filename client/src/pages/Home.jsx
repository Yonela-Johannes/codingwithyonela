import { useContext } from "react";
import Top from "../components/blog/Top";
import peer from '../data/peer.png'
import { ThemeContext } from "../context/ThemeContext";
import { Widget } from "../shared/Widget";
const Home = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == "light" ? "text-black" : "text-white"} flex-1 h-full grid lg:grid-cols-2 gap-4 lg:gap-8`}>
      <div className="flex items-center justify-center w-full h-full">
        <Top
          title="Hello, I'm"
          name="Yonela"
          description="Welcome to my website. I build this website in order for myself and friends to teach, learn, and venture on projects together of our liking."
          theme={theme}
        />
      </div>
      <div className="flex items-center justify-center w-full h-full">
        <img src={peer} className="rounded-md h-[300px] w-[280px] object-cover" />
      </div>
      <Widget />
    </div >
  );
};

export default Home;
