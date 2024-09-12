import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import HoverUnderLine from "./HoverUnderLine";
import { RiContactsLine } from "react-icons/ri";
import logo from "../assets/logo.png";
import { LucideLogIn, LucideLogOut, LucideUser } from "lucide-react";
import ThemeToggle from "./themeToggle/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import {
  activeSignin,
  activeSignup,
  disableAuthModals,
  logout,
} from "../features/user/authSlice";
import { AiTwotoneDashboard } from "react-icons/ai";
import { SlideLeft } from "../animation/animate";
import LayoutToggle from "./layoutToggle/LayoutToggle";

export default function ({ currentUser, auth }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <nav
      className={`${
        auth ? "bg-transparent" : ""
      } flex flex-col z-50 md:flex-row py-3 w-full items-center justify-between gap-4 md:gap-0`}
    >
      <motion.div
        variants={SlideLeft(0.6)}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        whileInView="animate"
        className="hidden md:flex items-center justify-between w-full"
      >
        <div
          className={`${
            theme !== "light" ? "text-clr_alt" : "text-cl_primary"
          } font-semibold py-2 px-4 
									 flex items-center text-center transition duration-300 ease-in-out`}
        >
          <HoverUnderLine>
            <Link className="flex text-center items-center gap-2" to="/">
              <img
                src={logo}
                className="w-9 h-9 object-center object-contain"
              />
              <p className="hidden lg:block">CodingWithYonela</p>
            </Link>
          </HoverUnderLine>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div
            className={`${
              theme == "light" ? "text-black" : "text-white"
            } flex gap-6 text-base text-black`}
          >
            {currentUser && currentUser?.id ? (
              <>
                <div
                  onClick={() => (
                    dispatch(logout()), navigate("recommendation")
                  )}
                >
                  <HoverUnderLine>
                    <div
                      className={`${
                        theme == "light" ? "text-bg_grey" : "text-white"
                      }   py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
                    >
                      <LucideLogOut className="mr-2" size={18} />
                      Logout
                    </div>
                  </HoverUnderLine>
                </div>

                {currentUser?.is_admin ? (
                  <>
                    <Link to="/admin">
                      <HoverUnderLine>
                        <div
                          className={`${
                            theme == "light"
                              ? "text-clr_alt"
                              : "text-cl_primary"
                          } underline font-semibold py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
                        >
                          <AiTwotoneDashboard size={24} />
                          Admin
                        </div>
                      </HoverUnderLine>
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <HoverUnderLine>
                  <div
                    onClick={() => (
                      dispatch(disableAuthModals()), dispatch(activeSignin())
                    )}
                    className={`${
                      theme == "light" ? "text-clr_alt" : "text-cl_primary"
                    } underline font-semibold py-2 px-4 
									 flex items-center transition duration-300 ease-in-out primary-btn`}
                  >
                    <LucideLogIn className="mr-2" size={18} />
                    Login
                  </div>
                </HoverUnderLine>
                <HoverUnderLine>
                  <div
                    onClick={() => dispatch(activeSignup())}
                    className={`${
                      theme == "light" ? "text-bg_grey" : "text-white"
                    }   py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
                  >
                    <LucideUser className="mr-2" size={18} />
                    Signup
                  </div>
                </HoverUnderLine>
              </>
            )}
          </div>
          {currentUser && currentUser?.id ? (
            <Link to="/profile">
              <HoverUnderLine>
                <div className="flex w-full items-center md:w-max h-full  space-y-2">
                  <div
                    className={` ${
                      theme == "light"
                        ? "text-black bg-bg_light"
                        : "bg-bg_grey text-bg_lightest"
                    } flex p-0 items-center justify-center text-base rounded-full md:justify-between gap-2`}
                  >
                    <div className="space-y-1py-1 pl-3">
                      <p className="text-sm lg:text-base">
                        {currentUser?.firstname} {currentUser?.lastname}
                      </p>
                    </div>
                    <div>
                      <img
                        src={currentUser?.profile}
                        alt="cover"
                        className="rounded-full object-cover object-center h-[40px] w-[40px]"
                      />
                    </div>
                  </div>
                </div>
              </HoverUnderLine>
            </Link>
          ) : (
            ""
          )}
          <Link to="/contact">
            <HoverUnderLine>
              <div
                className={`${
                  theme == "light" ? "text-bg_grey" : "text-white"
                }   py-2 px-4 
									 flex items-center transition duration-300 ease-in-out`}
              >
                <RiContactsLine className="mr-2" size={16} />
                Contact
              </div>
            </HoverUnderLine>
          </Link>
          <ThemeToggle />
          <LayoutToggle />
        </div>
      </motion.div>
    </nav>
  );
}
