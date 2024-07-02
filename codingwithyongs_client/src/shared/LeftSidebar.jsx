import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import logo from '../assets/logo.png'

const LeftSidebar = () =>
{
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoading = false
  const user = {}

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        {isLoading || !user.email ? (
          <div className="h-14">
            <Loader />
          </div>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">{user.name}</p>
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default LeftSidebar;
