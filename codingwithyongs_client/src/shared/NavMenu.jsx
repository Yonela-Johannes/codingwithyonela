import HoverUnderLine from "../components/HoverUnderLine";
import { Link } from "react-router-dom";
import { FaHome, FaLayerGroup } from "react-icons/fa";
import { GrStatusUnknownSmall } from "react-icons/gr";
import { BsCalendar3EventFill, BsQuestionDiamondFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";

const NavMenu = () => {
  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-between gap-4 md:gap-0">
      <div className="md:flex items-center justify-between w-full overflow-x-scroll lg:overflow-x-hidden">
        <div className="flex text-sm font-bold gap-6  text-black">
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <FaHome />
                </div>
                Home
              </div>
            </HoverUnderLine>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/suggestions"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <FaLayerGroup />
                </div>
                Suggestions
              </div>
            </HoverUnderLine>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/questions"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <BsQuestionDiamondFill />
                </div>
                Questions
              </div>
            </HoverUnderLine>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/blogs"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <ImBlogger />
                </div>
                Blog
              </div>
            </HoverUnderLine>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/recommendations"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <HiUsers />
                </div>
                Recommendations
              </div>
            </HoverUnderLine>
          </Link>
          <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/project-status"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <GrStatusUnknownSmall />
                </div>
                Progress
              </div>
            </HoverUnderLine>
          </Link>
          {/* <Link
            className="focus:outline-none focus:border-b focus:border-clr_alt focus:text-bg_opp"
            to="/events"
          >
            <HoverUnderLine>
              <div className="flex gap-1 items-center cursor-pointer">
                <div className="lg:hidden">
                  <BsCalendar3EventFill />
                </div>
                Events
              </div>
            </HoverUnderLine>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
