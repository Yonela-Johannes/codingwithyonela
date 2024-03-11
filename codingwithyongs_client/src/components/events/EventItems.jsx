import { MdDateRange } from "react-icons/md";
import { FaArrowRight, FaMapMarkedAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import HoverUnderLine from "../HoverUnderLine";

function EventItems({ title, image, date, location, id, user }) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li key={id} className="drop-shadow-md lg:h-[200px] border border-bg_light rounded-md overflow-hidden bg-white flex flex-col lg:flex-row gap-1">
      <img src={image} alt={title} className="w-full lg:w-[180px] object-cover h-full" />
      <div className="flex flex-col w-full px-1">
        <div className="flex flex-col gap-1 justify-center">
          <h2 className="text-base">{title}</h2>
          <div className="flex items-center gap-1 text-bg_core text-sm">
            <MdDateRange />
            <time>{humanReadableDate}</time>
          </div>
          <div className="flex text-sm gap-1 text-bg_core">
            <FaMapMarkedAlt />
            <address>{location}</address>
          </div>
        </div>
        <div className="flex items-end mt-3 gap-1 justify-end h-full">
          <img src={image} alt={title} className="w-8 h-8 object-cover rounded-full" />
          <div>
            <p className="text-sm">{user?.username}</p>
            <p className="text-xs">{user?.title}</p>
          </div>
        </div>
        <div className="flex items-end justify-end py-2">
          <HoverUnderLine>
            <Link
              className="flex gap-2 text-sm text-bg_core items-center justify-center"
              to="/"
            >
              <span>Explore Events</span>
              <span className="text-sm">
                <FaArrowRight />
              </span>
            </Link>
          </HoverUnderLine>
        </div>
      </div>
    </li>
  );
}
export default EventItems;
