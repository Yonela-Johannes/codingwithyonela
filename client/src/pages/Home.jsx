import { useContext } from "react";
import Top from "../components/blog/Top";
import peer from '../data/peer.png'
import { ThemeContext } from "../context/ThemeContext";
const Home = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className={`${theme == "light" ? "text-black" : "text-white"} h-full grid lg:grid-cols-2 gap-4 lg:gap-8`}>
      <div className="">
        <Top
          title="Hello, I'm"
          name="Yonela"
          description="Welcome to my website. I build this website in order for myself and friends to teach, learn, and venture on projects together of our liking."
          theme={theme}
        />
      </div>
      <div className="flex items-end  justify-center w-full">
        <img src={peer} className="rounded-md h-[300px] w-[280px] object-cover" />
      </div>
    </div>
  );
};

export default Home;
