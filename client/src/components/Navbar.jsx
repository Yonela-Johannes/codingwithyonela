import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import HoverUnderLine from "./HoverUnderLine";
import { DownOutlined } from "@ant-design/icons";
import { Space, Dropdown } from "antd";
import { BiDonateHeart } from "react-icons/bi";
import { FaGithubAlt, FaMoon, FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import logo from '../assets/logo.png'
import { Search } from "lucide-react";
import ThemeToggle from './themeToggle/ThemeToggle';
import { ThemeContext } from '../context/ThemeContext';

const MobileMenu = ({ user, items, user_items }) =>
{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = {}
  const toggleMenu = () =>
  {
    setIsMenuOpen(!isMenuOpen);
  };

  // const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() =>
  {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl)
    {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className="flex items-center justify-between w-full">
      {isMenuOpen ? (
        <div className="absolute md:fixed flex justify-between top-0 border border-bg_light rounded-sm left-0 w-full h-fit bg-white  z-50 py-10 px-6 shadow-xl">
          <div onClick={() => setIsMenuOpen(false)} className="absolute top-2 right-2">
            <MdClose size={20} />
          </div>
          <div className=" flex gap-8">
            <ul className="flex flex-col gap-4 text-base text-black dark:text-gray-300">
              <Dropdown
                menu={{
                  items,
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <HoverUnderLine>
                      <div className="flex gap-2 items-center cursor-pointer p-2">
                        More
                        <DownOutlined />
                      </div>
                    </HoverUnderLine>
                  </Space>
                </a>
              </Dropdown>
              <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                <HoverUnderLine>
                  <div className="flex gap-2 items-center cursor-pointer p-2">
                    Donate
                  </div>
                </HoverUnderLine>
              </Link>
              {user && user?.id ? (
                <Dropdown
                  menu={{
                    user_items,
                  }}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <HoverUnderLine>
                        <div className="flex gap-2 items-center cursor-pointer p-2">
                          <img src={user?.image} className="h-7 w-7 rounded-full object-cover" />
                          <DownOutlined />
                        </div>
                      </HoverUnderLine>
                    </Space>
                  </a>
                </Dropdown>
              ) : (
                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)}>
                  <HoverUnderLine>
                    <div className="flex gap-2 items-center cursor-pointer p-2">
                      Login
                    </div>
                  </HoverUnderLine>
                </Link>
              )}
              <div className="flex gap-4 items-center">
                <Link href="https://github.com/yonela-johannes">
                  <HoverUnderLine>
                    <div className="flex gap-2 items-center cursor-pointer p-2">
                      <FaGithubAlt size={22} />
                    </div>
                  </HoverUnderLine>
                </Link>
                <Link href="https://github.com/yonela-johannes">
                  <HoverUnderLine>
                    <div className="flex gap-2 items-center cursor-pointer p-2">
                      {/* <FaSun size={22} /> */}
                      <BsFillMoonStarsFill />
                    </div>
                  </HoverUnderLine>
                </Link>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <>
          <div className="">
            <Link to="/">
              <HoverUnderLine>
                <p className="font-tech_mono font-bold text-base">
                  <span className="bg-clr_alt text-white rounded-md p-1">YL</span>
                </p>
              </HoverUnderLine>
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </>
      )}
    </nav>
  );
};

export default function ({ user })
{
  const { theme } = useContext(ThemeContext)
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const currentUser = {}

  const handleSignout = async () =>
  {
    try
    {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok)
      {
        console.log(data.message);
      } else
      {
        // dispatch(signoutSuccess());
      }
    } catch (error)
    {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to="/about" rel="noopener noreferrer">
          About
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="_blank" rel="noopener noreferrer">
          Portfolio's
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link to="/friends" rel="noopener noreferrer">
          Friends
        </Link>
      ),
    },
    {
      key: "4",
    },
  ];

  const user_items = [
    {
      key: "9",
      label: (
        <Link to="/account" rel="noopener noreferrer">
          Account
        </Link>
      ),
    },
    {
      key: "10",
      label: (
        <Link to="/friends" rel="noopener noreferrer">
          Logout
        </Link>
      ),
    },
  ];

  return (
    <nav className="px-10 flex flex-col z-50 md:flex-row py-3 w-full items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="">
          <Link to="/">
            <HoverUnderLine>
              <img src={logo} className="w-8 h-8 object-center object-contain" />
            </HoverUnderLine>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="md:mt-4 flex gap-1 md:gap-4 items-center">
            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search" className={`${theme == "light" ? "bg-white" : "bg-slate-800 placeholder:text-gray-300"} border border-gray-400 md:w-[350px] px-2`} />
            <button className="hidden items-center justify-center h-[26px] w-[26px] md:rounded-full md:h-[46px] md:w-[46px] p-1 text-clr_alt md:bg-clr_alt md:text-white">
              <Search className="md:h-4 md:w-4 " />
            </button>
          </div>
        </form>
        <div className={`${theme == "light" ? "text-black" : "text-white"} flex gap-6 text-base text-black uppercase`}>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <HoverUnderLine>
                  <div className="flex gap-2 items-center cursor-pointer p-2">
                    More
                    <DownOutlined />
                  </div>
                </HoverUnderLine>
              </Space>
            </a>
          </Dropdown>
          {user && user?.id ? (
            <Dropdown
              menu={{
                items,
              }}
            >
              <button onClick={(e) => e.preventDefault()}>
                <Space>
                  <HoverUnderLine>
                    <div className="flex items-center cursor-pointer p-2 text-sm text-bg_core">
                      <img src={user?.profile} className="h-7 w-7 rounded-full object-cover" />
                      <DownOutlined />
                    </div>
                  </HoverUnderLine>
                </Space>
              </button>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <HoverUnderLine>
                <div className="flex gap-2 items-center cursor-pointer p-2">
                  Login
                </div>
              </HoverUnderLine>
            </Link>
          )}
        </div>
        <ThemeToggle />
      </div>
      <div className="block md:hidden w-full">
        <MobileMenu items={items} user={user} user_items={user_items} />
      </div>
    </nav>
  );
};
