import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const NotFoundPage = () =>
{
	const { theme } = useContext(ThemeContext)
	return (
		<div
			className={`${theme == "light" ? "text-bg_opp" : "text-white"} lg:relative h-full bg-cover bg-center flex flex-col justify-center items-center text-white mb-4`}
		>
			<header className={`${theme == "light" ? "text-bg_opp" : "text-white"} lg:absolute top-0 left-0 p-4 w-full`}>
				<Link to={"/"}>
					<img src={logo} alt='CodingWithYonela' className='h-8 w-8 lg:w-12 lg:h-12 object-contain object-center' />
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				<h1 className={`${theme == "light" ? "text-bg_opp" : "text-white"} text-2xl lg:text-7xl font-semibold mb-4`}>Lost your way?</h1>
				<p className={`${theme == "light" ? "text-bg_opp" : "text-white"}  mb-6 lg:text-xl`}>
					Sorry, we can't find that page. You'll find lots to explore on the progress page.
				</p>
				<Link to={"/project-status"} className={`${theme == "light" ? "bg-bg_opp" : "bg-bg_core"} text-sm lg:text-lg text-white py-1 px-2 lg:py-2 lg:px-4 rounded`}>
					Progress
				</Link>
			</main>
		</div >
	);
};
export default NotFoundPage;
