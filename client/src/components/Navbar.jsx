import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext, useState } from 'react';
import HoverUnderLine from "./HoverUnderLine";
import logo from '../assets/logo.png'
import { Search } from "lucide-react";
import ThemeToggle from './themeToggle/ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import { activeSignin, activeSignup, disableAuthModals, logout } from '../features/user/authSlice';
import { AiOutlineSearch } from 'react-icons/ai';


export default function ({ currentUser })
{
  const { theme } = useContext(ThemeContext)
  const dispatch = useDispatch();

  return (
    <nav className={`flex flex-col z-50 md:flex-row py-3 w-full items-center justify-between gap-4 md:gap-0`}>
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="">
          <Link to="/">
            <HoverUnderLine>
              <img src={logo} className="w-8 h-8 object-center object-contain" />
            </HoverUnderLine>
          </Link>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <div className={`${theme == "light" ? "text-black" : "text-white"} flex gap-6 text-base text-black`}>
            {currentUser && currentUser?.id ? (
              <>
                <div onClick={() => dispatch(logout())}>
                  <HoverUnderLine>
                    <div className="flex gap-2 items-center cursor-pointer p-2">
                      Logout
                    </div>
                  </HoverUnderLine>
                </div>

                {currentUser?.is_admin ? (
                  <>
                    <Link to="/admin">
                      <HoverUnderLine>
                        <div className="flex gap-2 items-center cursor-pointer p-2">
                          Admin
                        </div>
                      </HoverUnderLine>
                    </Link>
                  </>
                ) : ""}
              </>
            ) : (
              <>
                <HoverUnderLine>
                  <div onClick={() => (dispatch(disableAuthModals()), dispatch(activeSignin()))} className="flex gap-2 items-center cursor-pointer p-2">
                    Login
                  </div>
                </HoverUnderLine>
                <HoverUnderLine>
                  <div onClick={() => dispatch(activeSignup())} className="flex gap-2 items-center cursor-pointer p-2">
                    Signup
                  </div>
                </HoverUnderLine>
              </>
            )}
          </div>
          <ThemeToggle />
          {currentUser && currentUser?.id ? (
            <Link to="/profile">
              <HoverUnderLine>
                <div className="flex w-full items-center md:w-max h-full  space-y-2">
                  <div className="flex items-center bg-clr_alt text-white rounded-full md:justify-between gap-2">
                    <div className="space-y-1py-1 pl-3">
                      <p className="text-sm lg:text-base">
                        {currentUser?.firstname} {currentUser?.lastname}
                      </p>
                    </div>
                    <div>
                      <img
                        src={currentUser?.profile}
                        alt="cover"
                        className="rounded-full object-cover object-center h-[35px] w-[35px]"
                      />
                    </div>
                  </div>
                </div>
              </HoverUnderLine>
            </Link>
          ) : ""}
        </div>
      </div>
    </nav>
  );
};
