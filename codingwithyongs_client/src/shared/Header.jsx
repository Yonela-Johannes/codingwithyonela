import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";

const Header = () =>
{
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:gap-20 items-center overflow-x-hidden">
      <div className="flex items-start gap-3 flex-col pt-8 w-full">
        <h2 className="text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl md:mb-3">
          Becoming a{" "}
          <span className="text-clr_alt">
            better <br />
            programmer
          </span>
        </h2>
        <button onClick={() => navigate('/sign-in')}>Get Started</button>
      </div>
      <Hero />
    </div>
  );
};

export default Header;
