import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import { useSelector } from "react-redux";

const Empty = ({ title, description, path, pathMessage }) =>
{
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext)
    return (
        <div
            className={`${theme == "light" ? "text-bg_primary" : "text-white"} h-full bg-cover bg-center flex flex-col justify-center items-center text-white mb-4`}
        >
            <main className='text-center error-page--content z-10'>
                <h1 className={`${theme == "light" ? "text-bg_primary" : "text-white"} text-xl lg:text-4xl  mb-4`}>{title}</h1>
                <p className={`${theme == "light" ? "text-bg_primary" : "text-white"} text-base mb-6 lg:text-xl`}>
                    {description}
                </p>
                {(currentUser?.is_admin || currentUser?.is_staff) && pathMessage ? (
                    <Link to={path} className={`${theme == "light" ? "bg-bg_primary" : "bg-bg_core"} text-sm lg:text-lg text-white py-1 px-2 lg:py-2 lg:px-4 rounded`}>
                        {pathMessage}
                    </Link>
                ) : ''}
            </main>
        </div >
    );
};
export default Empty;
