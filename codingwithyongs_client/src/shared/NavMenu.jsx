import HoverUnderLine from "../components/HoverUnderLine";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex tex-sm font-bold gap-6  text-black">
          <Link to="/">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Description</HoverUnderLine>
            </div>
          </Link>
          <Link to="/suggestions">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>200 Suggestions</HoverUnderLine>
            </div>
          </Link>
          <Link to="/questions">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>5 Questions</HoverUnderLine>
            </div>
          </Link>
          <Link to="/chats">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Convo</HoverUnderLine>
            </div>
          </Link>
          <Link to="/testimonials">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Testimonials</HoverUnderLine>
            </div>
          </Link>
          <Link to="/blogs">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Blog</HoverUnderLine>
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
