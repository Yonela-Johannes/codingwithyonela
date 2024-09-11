import { FaHome, FaLayerGroup } from "react-icons/fa";
import { GrStatusUnknownSmall } from "react-icons/gr";
import { BsCalendar3EventFill, BsQuestionDiamondFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { PiCalendarMinusDuotone, PiChatDuotone, PiListDashesDuotone, PiProjectorScreenDuotone, PiRadio, PiUserCheckDuotone, PiUsersDuotone } from "react-icons/pi";
import { AiTwotoneEdit, AiTwotoneQuestionCircle, AiTwotoneMessage, AiTwotoneHome, AiTwotoneInteraction, } from "react-icons/ai";

export const navLinks = [
    {
        title: "Home",
        icon: AiTwotoneHome,
        link: "/",
    },
    {
        title: "Progress",
        icon: PiProjectorScreenDuotone,
        link: "/project-status",
    },
    {
        title: "Blog",
        icon: PiListDashesDuotone,
        link: "/blog",
    },
    {
        title: "Recommendations",
        icon: PiUsersDuotone,
        link: "/recommendation",
    },
    {
        title: "Chill",
        icon: AiTwotoneInteraction,
        link: "/chill",
    },
    {
        title: "Events",
        icon: PiCalendarMinusDuotone,
        link: "/events",
    },
]

export const features = [
    {
        icon: AiTwotoneEdit,
        text: "Board and Task Management",
        description:
            "Create, read, update, and delete project and project tasks, with form validations and the ability to mark project and tasks as complete and move tasks between columns",
    },
    {
        icon: AiTwotoneMessage,
        text: "Blog and Post Management",
        description:
            "Manage content effortlessly with the ability to create, read, update, and delete blogs and posts.",
    },
    {
        icon: PiUserCheckDuotone,
        text: "Recommendations Management",
        description:
            "Preview your VR application in real-time as you make changes, allowing for quick iterations and adjustments.",
    },
    {
        icon: PiChatDuotone,
        text: "Project Chat",
        description:
            "Facilitate project-specific communication by creating, reading, updating, and deleting chats for each project.",
    },
    {
        text: "Q&A",
        icon: PiChatDuotone,
        description:
          "Allow your audience to ask questions during your presentations and let them upvote the most requested ones.",
      },
      {
        text: "Real-time Polls",
        icon: PiRadio,
        description:
          "Get instant feedback from your audience with real-time polls.",
      },
];

export const checklistItems = [
    {
        title: "Seamless Project Tracking",
        description:
            "Monitor the progress of projects and stay updated with real-time changes.",
    },
    {
        title: "Effortless Collaboration",
        description:
            "Work together with your team and manage tasks without the hassle",
    },
    {
        title: "Streamlined Communication",
        description:
            "Engage in project-specific chats and keep every conversation organized.",
    },
    {
        title: "Instant Content Sharing",
        description:
            "Publish blogs, posts, and updates effortlessly, and share your work with the world.",
    },
    {
        title: "Smart Task Management",
        description:
            "Create, update, and move tasks between boards with ease, keeping your workflow smooth.",
    },
    {
        title: "Dynamic Learning Hub",
        description:
            "Enhance skills by managing suggestions, questions, and recommendations in one place.",
    },
];

export const platformLinks = [
    { href: "#", text: "Features" },
    { href: "#", text: "Supported Devices" },
    { href: "#", text: "System Requirements" },
    { href: "#", text: "Downloads" },
    { href: "#", text: "Release Notes" },
];