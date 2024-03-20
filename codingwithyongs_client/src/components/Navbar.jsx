import { useState } from "react";
import HoverUnderLine from "./HoverUnderLine";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { BiDonateHeart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaGithubAlt, FaMoon, FaSun } from "react-icons/fa";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const MobileMenu = ({user, items, user_items }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between w-full">
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
              <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>
                <HoverUnderLine>
                  <div className="flex gap-2 items-center cursor-pointer p-2">
                    Blog
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
    </div>
  );
};

const Navbar = ({user}) => {
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
    <nav className="flex flex-col z-50 md:flex-row py-3 w-full bg-white top-0 left-0 right-0 items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="">
          <Link to="/">
            <HoverUnderLine>
              <p className="font-tech_mono font-bold text-2xl">
                CodingWith<span className="bg-clr_alt text-white rounded-md p-1">Yonela</span>
              </p>
            </HoverUnderLine>
          </Link>
        </div>
        <div className="flex gap-6 text-base text-black uppercase">
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
          <Link to="/blogs">
            <HoverUnderLine>
              <div className="flex gap-2 items-center cursor-pointer p-2">
                Blog
              </div>
            </HoverUnderLine>
          </Link>
          {user && user?.id ? (
            <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <HoverUnderLine>
                  <div className="flex items-center cursor-pointer p-2 text-sm text-bg_core">
                    <img src={user?.profile} className="h-7 w-7 rounded-full object-cover" />
                    <DownOutlined />
                  </div>
                </HoverUnderLine>
              </Space>
            </a>
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
      </div>
      <div className="block md:hidden w-full">
        <MobileMenu items={items} user={user} user_items={user_items} />
      </div>
    </nav>
  );
};

export default Navbar;
