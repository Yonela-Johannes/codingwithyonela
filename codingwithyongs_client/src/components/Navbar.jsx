import React, { useState } from "react";
import HoverUnderLine from "./HoverUnderLine";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const MobileMenu = ({ user, signOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {isMenuOpen ? (
        <div className="md:fixed flex justify-between top-0 left-0 w-full h-fit bg-white dark:bg-[#020b19] z-50 py-10 px-6 shadow-xl">
          <div className=" flex gap-8">
            <ul className="flex flex-col gap-4 text-base text-black dark:text-gray-300">
              <HoverUnderLine>
                <li onClick={toggleMenu}>
                  <p>Home</p>
                </li>
              </HoverUnderLine>
              <HoverUnderLine>
                <li onClick={toggleMenu}>
                  <p>Contact</p>
                </li>
              </HoverUnderLine>
              <HoverUnderLine>
                <li onClick={toggleMenu}>
                  <p>About</p>
                </li>
              </HoverUnderLine>
              <HoverUnderLine>
                <li onClick={toggleMenu}>
                  <p>Blogs</p>
                </li>
              </HoverUnderLine>
            </ul>
          </div>

        </div>
      ) : (
        <>
          <div className="">
            <p>CWYS</p>
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

const Navbar = () => {

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
    },
  ];
  return (
    <nav className="flex flex-col z-50 md:flex-row py-3 w-full bg-white top-0 left-0 right-0 items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-around w-full">
        <div className="">
          <HoverUnderLine>
            <p className="font-tech_mono text-xl font-light">CodingWithYongs</p>
          </HoverUnderLine>
        </div>
        <div className="flex gap-4 text-base text-black">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <HoverUnderLine>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <DownOutlined />
                    More
                  </div>
                </HoverUnderLine>
              </Space>
            </a>
          </Dropdown>
          <div className="flex gap-2 items-center cursor-pointer">
              <HoverUnderLine>
                Blog
              </HoverUnderLine>
          </div>
        </div>
      </div>
      {/* <div className="block md:hidden w-full">
        <MobileMenu user={user} signOut={handleSignOut} />
      </div> */}
    </nav>
  );
};

export default Navbar;
