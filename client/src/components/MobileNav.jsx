import { ThemeContext } from "@emotion/react";
import { navLinks } from "../data/data";
import
{
  AiOutlineClose,
  AiOutlineMenu,
  AiTwotoneContacts,
} from "react-icons/ai";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HoverUnderLine from "./HoverUnderLine";
import ThemeToggle from "./themeToggle/ThemeToggle";
import
{
  activeSignin,
  activeSignup,
  disableAuthModals,
  logout,
} from "../features/user/authSlice";
import { LucideLogIn, LucideLogOut, LucideUser } from "lucide-react";
import { useDispatch } from "react-redux";

export default function MobileNav({ currentUser })
{
  const [active, setActive] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div
      className={`  lg:hidden ${theme == "light"
        ? "text-clr_alt bg-bg_lightest"
        : "text-cl_primary bg-bg_core"
        } flex items-center justify-center z-50 md:px-0 rounded-b-lg p-1`}
    >
      <HoverUnderLine>
        <Link className="flex text-center items-center gap-2" to="/">
          <div className="">
            <img
              src={logo}
              className="w-10 h-10 object-center object-contain"
            />
          </div>
        </Link>
      </HoverUnderLine>
      <div
        className={`flex w-full px-2${theme == "light" ? "text-clr_alt" : "text-cl_primary"
          } md:px-0`}
      >
        <div className={`flex justify-end gap-4 w-full px-2`}>
          {currentUser?.profile ? (
            <div className="flex items-center">
              <Link to="/profile">
                <img
                  src={currentUser?.profile}
                  alt="cover"
                  className="rounded-full object-cover h-[28px] w-[28px]"
                />
              </Link>
            </div>
          ) : (
            ""
          )}
          <ThemeToggle />
          <button
            className="nav-open-btn bg-l p-1 md:p-2 rounded-md border-none"
            aria-label="open menu"
            onClick={() => setActive(!active)}
          >
            <AiOutlineMenu className="w-5 md:w-6 h-5 md:h-6 " />
          </button>
        </div>

        <div
          className={`navbar lg:hidden flex flex-col justify-start ${active ? "active" : ""
            } ${theme == "light" ? "bg-bg_lightest" : "bg-bg_core"}`}
        >
          <div className="navbar-top">
            <button
              className="nav-close-btn bg-light p-1 md:p-2 rounded-md border-none"
              aria-label="close menu"
              onClick={() => setActive(false)}
            >
              <AiOutlineClose className="w-5 md:w-6 h-5 md:h-6 " />
            </button>
          </div>

          <ul className="p-4 w-full flex flex-col gap-4 md:gap-6">
            {navLinks?.map((nav, x) =>
            {
              const Icon = nav?.icon;
              return (
                <Link
                  key={`${nav?.title}***${x}`}
                  className={`navbar-item  focus:outline-none ${active == nav?.link && theme == "light"
                    ? "text-bg_opp border-b border-b-bg_opp"
                    : active == nav?.link && theme == "dark"
                      ? ""
                      : ""
                    }`}
                  to={nav?.link}
                  onClick={() => (
                    dispatch(disableAuthModals()), setActive(false)
                  )}
                >
                  <HoverUnderLine>
                    <div className="navbar-link flex gap-1 items-center cursor-pointer">
                      <div className="">
                        <Icon size={20} />
                      </div>
                      <span className="lg:block">{nav?.title}</span>
                    </div>
                  </HoverUnderLine>
                </Link>
              );
            })}
          </ul>
          <div className="flex flex-col items-start justify-center gap-4">
            <div
              className={`${theme == "light" ? "text-black" : ""
                } flex flex-col gap-6 text-base text-black`}
            >
              {currentUser && currentUser?.id ? (
                <>
                  <div
                    onClick={() => (
                      dispatch(logout),
                      navigate("recommendation"),
                      setActive(false)
                    )}
                  >
                    <HoverUnderLine>
                      <div
                        className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"
                          } underline py-2 px-4 
                                                         flex items-center transition duration-300 ease-in-out`}
                      >
                        <div className="md:hidden">
                          <LucideLogOut className="mr-2" size={18} />
                        </div>
                        Logout
                      </div>
                    </HoverUnderLine>
                  </div>
                </>
              ) : (
                <>
                  <HoverUnderLine>
                    <div
                      onClick={() => (
                        dispatch(disableAuthModals()),
                        dispatch(activeSignin(), setActive(false))
                      )}
                      className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"
                        } underline py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
                    >
                      <div className="md:hidden">
                        <LucideLogIn className="mr-2" size={18} />
                      </div>
                      Login
                    </div>
                  </HoverUnderLine>
                  <HoverUnderLine>
                    <div
                      onClick={() => (
                        dispatch(activeSignup()), setActive(false)
                      )}
                      className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"
                        } px-4 
									 flex items-center transition duration-300 ease-in-out`}
                    >
                      <div className="md:hidden">
                        <LucideUser className="mr-2" size={18} />
                      </div>
                      Signup
                    </div>
                  </HoverUnderLine>
                </>
              )}
            </div>
            <Link
              onClick={() => (dispatch(disableAuthModals()), setActive(false))}
              to="/contact"
            >
              <HoverUnderLine>
                <div
                  className={`py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
                >
                  <div className="md:hidden">
                    <AiTwotoneContacts className="mr-2" size={16} />
                  </div>
                  Contact
                </div>
              </HoverUnderLine>
            </Link>
            {currentUser && currentUser?.id ? (
              <Link
                to="/profile"
                className="flex flex-col w-full items-start md:w-max px-4  h-full space-y-2"
              >
                <div
                  className={` ${theme == "light"
                    ? "text-black bg-bg_light"
                    : "bg-bg_grey text-bg_lightest"
                    } flex p-0 items-center justify-center text-base rounded-full md:justify-between gap-2`}
                >
                  <div>
                    <img
                      src={currentUser?.profile}
                      alt="cover"
                      className="rounded-full object-cover object-center h-[40px] w-[40px]"
                    />
                  </div>
                  <div className="space-y-1py-1 pr-3">
                    <p className="text-sm lg:text-base">
                      {currentUser?.firstname} {currentUser?.lastname}
                    </p>
                  </div>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
