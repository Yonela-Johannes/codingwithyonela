import HoverUnderLine from "../components/HoverUnderLine";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex tex-sm font-bold gap-6  text-black">
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Description</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/suggestions">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Suggestions</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/questions">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Questions</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/blogs">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Blog</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/testimonials">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Testimonials</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/recommendations">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Recommendations</HoverUnderLine>
            </div>
          </Link>
          <Link className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp" to="/project-status">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Project status</HoverUnderLine>
            </div>
          </Link>
        </div>
      </div>
      {/* <div className="block md:hidden w-full">
        <MobileMenu user={user} signOut={handleSignOut} />
      </div> */}
    </nav>
  );
};

export default NavMenu;
