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
        title: "Project Descussion",
        icon: GrStatusUnknownSmall,
        link: "/project-descussion",
    },
    {
        title: "Version Control",
        icon: GrStatusUnknownSmall,
        link: "/version-control",
    },
    {
        title: "Suggestion",
        icon: FaLayerGroup,
        link: "/suggestions",
    },
    {
        title: "Question",
        icon: BsQuestionDiamondFill,
        link: "/questions",
    },
    {
        title: "Blog",
        icon: ImBlogger,
        link: "/blog",
    },
    {
        title: "Recommendation",
        icon: HiUsers,
        link: "/recommendation",
    },
    {
        title: "Feed",
        icon: GrStatusUnknownSmall,
        link: "/posts",
    },
]