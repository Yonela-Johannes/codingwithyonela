import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import HoverUnderLine from "../components/HoverUnderLine";

const NavMenu = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
    },
  ];
  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-between gap-4 md:gap-0">
      <div className="hidden md:flex items-center justify-between w-full">
        <div className="flex tex-sm font-bold gap-6  text-black">
        <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>Description</HoverUnderLine>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>200 Suggestions</HoverUnderLine>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>5 Questions</HoverUnderLine>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>Convo</HoverUnderLine>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>Testimonials</HoverUnderLine>
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <HoverUnderLine>Blog</HoverUnderLine>
          </div>
        </div>
      </div>
      {/* <div className="block md:hidden w-full">
        <MobileMenu user={user} signOut={handleSignOut} />
      </div> */}
    </nav>
  );
};

export default NavMenu;
