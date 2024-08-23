import { FaHome, FaLayerGroup } from "react-icons/fa";
import { GrStatusUnknownSmall } from "react-icons/gr";
import { BsCalendar3EventFill, BsQuestionDiamondFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";

export const navLinks = [
    {
        title: "Home",
        icon: FaHome,
        link: "/",
    },
    {
        title: "Progress",
        icon: GrStatusUnknownSmall,
        link: "/project-status",
    },
    {
        title: "Blog",
        icon: ImBlogger,
        link: "/blog",
    },
    {
        title: "Recommendations",
        icon: HiUsers,
        link: "/recommendation",
    },
    {
        title: "Chill",
        icon: BsQuestionDiamondFill,
        link: "/chill",
    },
    {
        title: "Events",
        icon: BsQuestionDiamondFill,
        link: "/events",
    },
]