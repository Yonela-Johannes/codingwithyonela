import { Link } from "react-router-dom";
import HoverUnderLine from "../../components/HoverUnderLine";

const DashboardNavMenu = () => {
  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex tex-sm font-bold gap-6  text-black">
          <Link to="/submitted-blogs">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Blogs</HoverUnderLine>
            </div>
          </Link>
          <Link to="/create-blog">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Create blog</HoverUnderLine>
            </div>
          </Link>
          <Link to="/suggestion-settings">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Suggestions</HoverUnderLine>
            </div>
          </Link>
          <Link to="/question-settings">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Questions</HoverUnderLine>
            </div>
          </Link>
          <Link to="/testimonial-settings">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Testimonials</HoverUnderLine>
            </div>
          </Link>
          <Link to="/blogs">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Recommendations</HoverUnderLine>
            </div>
          </Link>
          <Link to="/blogs">
            <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>Users</HoverUnderLine>
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

export default DashboardNavMenu;
