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
          description="Welcome to my website. Built using React, Tailwind, Flask,
          Python and Postgresql"
        />
        <p className="text-base lg:text-xl 2xl:text-2xl">
          Welcome aboard our journey of exploration and growth, where we dive deep
          <br /> into the world of entrepreneurship, exchange ideas, and support
          each other
          <br /> in reaching our full potential—all while having a blast along the
          way!
        </p>
      </div>
      <div className="flex items-end  justify-center w-full">
        <img src={peer} className="rounded-md h-[300px] w-[280px] object-cover" />
      </div>
    </div>
  );
};

export default Home;
