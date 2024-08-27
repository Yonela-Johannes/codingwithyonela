import { FaHome, FaLayerGroup } from "react-icons/fa";
import { GrStatusUnknownSmall } from "react-icons/gr";
import { BsCalendar3EventFill, BsQuestionDiamondFill } from "react-icons/bs";
import { HiUsers } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import { ImBlogger } from "react-icons/im";
import { PiCalendarMinusDuotone, PiChatDuotone, PiListDashesDuotone, PiProjectorScreenDuotone, PiUserCheckDuotone, PiUsersDuotone } from "react-icons/pi";
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

export const testimonials = [
    {
        user: "John Doe",
        company: "Stellar Solutions",
        image: "",
        text: "I am extremely satisfied with the services provided. The team was responsive, professional, and delivered results beyond my expectations.",
    },
    {
        user: "Jane Smith",
        company: "Blue Horizon Technologies",
        image: '',
        text: "I couldn't be happier with the outcome of our project. The team's creativity and problem-solving skills were instrumental in bringing our vision to life",
    },
    {
        user: "David Johnson",
        company: "Quantum Innovations",
        image: '',
        text: "Working with this company was a pleasure. Their attention to detail and commitment to excellence are commendable. I would highly recommend them to anyone looking for top-notch service.",
    },
    {
        user: "Ronee Brown",
        company: "Fusion Dynamics",
        image: '',
        text: "Working with the team at XYZ Company was a game-changer for our project. Their attention to detail and innovative solutions helped us achieve our goals faster than we thought possible. We are grateful for their expertise and professionalism!",
    },
    {
        user: "Michael Wilson",
        company: "Visionary Creations",
        image: '',
        text: "I am amazed by the level of professionalism and dedication shown by the team. They were able to exceed our expectations and deliver outstanding results.",
    },
    {
        user: "Emily Davis",
        company: "Synergy Systems",
        image: '',
        text: "The team went above and beyond to ensure our project was a success. Their expertise and dedication are unmatched. I look forward to working with them again in the future.",
    },
];

export const features = [
    {
        icon: AiTwotoneEdit,
        text: "Board and Task Management",
        description:
            "Create, read, update, and delete project and project tasks, with form validations and the ability to mark project and tasks as complete and move tasks between columns",
    },
    {
        icon: AiTwotoneQuestionCircle,
        text: "Suggestions and Questions Management",
        description:
            "Create, read, update, and delete suggestions and questions, allowing for organized feedback and inquiry handling",
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
        icon: PiChatDuotone,
        text: "Comments Management",
        description:
            "Engage with content through the ability to create, read, update, and delete comments on suggestions, questions, blogs, and posts.",
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