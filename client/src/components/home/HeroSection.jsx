import { useContext, useEffect, useState } from 'react';
import peer from '../../data/peer.png'
import { ThemeContext } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const HeroSection = () =>
{
  const [showLine, setShowLine] = useState(false);
  useEffect(() =>
  {
    setShowLine(true);
  }, []);
  const { theme } = useContext(ThemeContext)
  return (
    <div className="flex flex-col mt-6 min-h-[calc(100vh-200px)]">
      <p className={`${theme == "light" ? "bg-bg_lightest text-clr_alt" : "bg-bg_grey text-cl_primary"} mb-2 text-cl_primary rounded-full text-sm font-medium lg:px-2 py-1 w-max tracking-wide`}>
        CodingWithYonela
      </p>
      <h1 className="text-xl lg:text-5xl font-bold mb-2 lg:mb-6 leading-tight">
        Collaboration{' '}
        <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"}`}>
          made simple
        </span>
        <br />
        for us
      </h1>
      <div className={`flex flex-col h-full lg:flex-row gap-4 lg:gap-8`}>
        <div>
          <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl`}>
            Simple Collaboration app for developers..
            I built this space to collaborate, grow my own community, solve ideas together, and make meaningful connections.
          </p>
          <div className="flex my-10">
            <Link
              to="/recommendation"
              className={`${theme !== "light" ? "bg-clr_alt" : "bg-cl_primary"} rounded-full lg:py-2 lg:px-4 py-1 px-2 mx-2 lg:mx-3`}
            >
              Get started
            </Link>
            <a href="https://yonela-johannes.vercel.app/" target="_blank" className={`${theme == "light" ? "border-clr_alt" : "border-cl_primary"} rounded-full lg:py-2 lg:px-4 py-1 px-2 mx-2 lg:mx-3 border`}>
              My portfolio
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src={peer} className="rounded-md max-h-[300px] max-w-[300px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
