import { useContext } from 'react';
import peer from '../../data/peer.png'
import { ThemeContext } from '../../context/ThemeContext';

const HeroSection = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="flex flex-col mt-6 lg:mt-20">
      <h1 className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} text-2xl sm:text-6xl lg:text-7xl tracking-wide`}>
        CodingWithYonela
      </h1>
      <div className={`flex flex-col h-full lg:flex-row gap-4 lg:gap-8 mt-2 lg:mt-10`}>
        <div>
          <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl`}>
            Empower your creativity and bring your VR app ideas to life with our
            intuitive development tools. Get started today and turn your imagination
            into immersive reality!
          </p>
          <div className="flex my-10">
            <a
              href="#"
              className={`${theme !== "light" ? "bg-clr_alt" : "bg-cl_primary"} lg:py-3 lg:px-4 py-1 px-2 mx-2 lg:mx-3 rounded-md`}
            >
              Start here
            </a>
            <a href="https://yonela-johannes.vercel.app/" target="_blank" className={`${theme == "light" ? "border-clr_alt" : "border-cl_primary"} lg:py-3 lg:px-4 py-1 px-2 mx-2 lg:mx-3 rounded-md border`}>
              Portfolio
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
