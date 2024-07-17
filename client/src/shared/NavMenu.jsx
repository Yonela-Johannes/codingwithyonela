import HoverUnderLine from "../components/HoverUnderLine";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { navLinks } from "../data/data";

const NavMenu = () =>
{
  const { theme } = useContext(ThemeContext)
  const { pathname } = useLocation();
  const [active, setActive] = useState(pathname)
  return (

    <nav className={`${theme == "light" ? "" : "bg-bg_core rounded-md"} flex flex-col md:flex-row w-full items-center justify-between lg:px-2 gap-4 md:gap-0`}>
      <div className="md:flex items-center justify-between w-full overflow-x-scroll lg:overflow-x-hidden">

        <div className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} flex text-sm lg:text-lg gap-6`}>
          {navLinks?.map((nav, x) => (
            <Link key={`${nav?.title}***${x}`}
              className={`focus:outline-none ${active == nav?.link && theme == "light" ? "text-bg_opp border-b border-b-bg_opp" : active == nav?.link && theme == "dark" ? "text-white" : ""}`}
              to={nav?.link}
              onClick={() => setActive(nav?.link)}
            >
              <HoverUnderLine>
                <div className="flex gap-1 items-center cursor-pointer">
                  <div className="lg:hidden">
                    {nav?.icon}
                  </div>
                  {nav?.title}
                </div>
              </HoverUnderLine>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
