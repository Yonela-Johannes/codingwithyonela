import { PiListDashesDuotone, PiProjectorScreenDuotone, PiUsersDuotone, PiUserSwitchDuotone, PiCalendarMinusDuotone } from "react-icons/pi";
import { AiTwotoneHome, AiTwotoneMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const menuItems = [
    {
        title: "MENU",
        items: [
            {
                icon: <AiTwotoneHome size={20} />,
                label: "Home",
                href: "/admin",
                visible: ["admin", "student", "parent"],
            },
            {
                icon: <PiUsersDuotone size={20} />,
                label: "Users",
                href: "/admin/users",
                visible: ["admin"],
            },
            {
                icon: <PiUserSwitchDuotone size={20} />,
                label: "Recommendations",
                href: "/admin/recommendations",
                visible: ["admin"],
            },
            {
                icon: <PiProjectorScreenDuotone size={20} />,
                label: "Projects",
                href: "/admin/project",
                visible: ["admin"],
            },
            {
                icon: <PiListDashesDuotone size={20} />,
                label: "Blogs",
                href: "/admin/blogs",
                visible: ["admin"],
            },
            {
                icon: <AiTwotoneMail size={20} />,
                label: "Feedback",
                href: "/admin/feedback",
                visible: ["admin"],
            },
            {
                icon: <PiCalendarMinusDuotone size={20} /> ,
                label: "Events",
                href: "/admin/events",
                visible: ["admin"],
            },
        ],
    },
];

const role = 'admin'
const Menu = () =>
{
    return (
        <div className="mt-4 text-sm">
            {menuItems.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="hidden lg:block text-gray-400 font-light my-4">
                        {i.title}
                    </span>
                    {i.items.map((item) =>
                    {
                        if (item.visible.includes(role))
                        {
                            return (
                                <Link
                                    to={item.href}
                                    key={item.label}
                                    className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaSkyLight"
                                >
                                    {item.icon}
                                    <span className="hidden lg:block">{item.label}</span>
                                </Link>
                            );
                        }
                    })}
                </div>
            ))}
        </div>
    );
};

export default Menu;
