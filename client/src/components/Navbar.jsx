import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import HoverUnderLine from "./HoverUnderLine";
import { DownOutlined } from "@ant-design/icons";
import { Space, Dropdown } from "antd";
import { FaGithubAlt, FaMoon, FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import logo from '../assets/logo.png'
import { Search } from "lucide-react";
import ThemeToggle from './themeToggle/ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';
import { activeSignin, activeSignup, disableAuthModals, logout } from '../features/user/authSlice';
import { AiOutlineSearch } from 'react-icons/ai';


export default function ({ currentUser })
{
  const { theme } = useContext(ThemeContext)
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
        <form onSubmit={handleSubmit}>
          <div className="md:mt-4 flex gap-1 md:gap-2 items-center w-full md:w-auto  text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <AiOutlineSearch size={20} />
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." className={`${theme == "light" ? "bg-white" : "bg-slate-800 placeholder:text-gray-300"} border border-gray-400 md:w-[200px] p-2`} />
            <button className="hidden items-center justify-center h-[26px] w-[26px] md:rounded-full md:h-[46px] md:w-[46px] p-1 text-clr_alt md:bg-clr_alt md:text-white">
              <Search className="md:h-4 md:w-4 " />
            </button>
          </div>
        </form>
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
        <div className='flex items-center justify-center gap-4'>
          <ThemeToggle />
          {currentUser && currentUser?.id ? (
            <Link to="/profile">
              <HoverUnderLine>
                <div className="flex w-full items-center md:w-max h-full  space-y-2">
                  <div className="flex items-center bg-clr_alt text-white rounded-full md:justify-between gap-2">
                    <div className="space-y-1py-1 pl-3">
                      <p className="text-sm lg:text-base">
                        {currentUser?.username} {currentUser?.lastname}
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
