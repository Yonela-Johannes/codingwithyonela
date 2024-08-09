import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserProfile from "./github/UserProfile";
import { useEffect } from "react";
import { getAllTitles } from "../features/title/titleSlice";
import { ThemeContext } from "../context/ThemeContext";
import ProfileInfoForm from "./ProfileInfoForm";

const Profile = () =>
{
    const { currentUser, loading: load } = useSelector((state) => state.user)
    const { titles, loading: titles_load } = useSelector((state) => state.titles)
    const [email, setEmail] = useState(currentUser?.email || "");
    const [username, setUsername] = useState(currentUser?.username || "");
    const [lastname, setLastname] = useState(currentUser?.lastname || "");
    const [title, setTitle] = useState(currentUser?.title || "");
    const [github, setGithub] = useState();
    const [query, setQuery] = useState(currentUser?.github_username || "");
    const [userData, setUserData] = useState(null);
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(getAllTitles())
    }, [])

    const getUserFromGithub = async (username) =>
    {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        if (data.message)
        {
            return toast({
                title: "Error",
                description: data.message === "Not Found" ? "User not found" : data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        setUserData(data)
    }

    useEffect(() =>
    {
        if (currentUser && currentUser?.github_username)
        {
            getUserFromGithub(currentUser?.github_username)
        }
    }, ['', currentUser])

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if (!query) return;
        setUserData(null);
        try
        {
            getUserFromGithub(query);
        } catch (error)
        {
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <div className='grid lg:grid-cols-2 h-full w-full'>
            <div className='flex lg:mx-3'>
                <div className={`w-full max-w-md lg:p-8 space-y-6 ${theme == "light" ? "text-black" : "text-white"}`}>
                    <form className='space-y-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='username' className='text-sm font-medium block'>
                                Username
                            </label>
                            <input
                                type='text'
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                                placeholder='john'
                                id='username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='username' className='text-sm font-medium block'>
                                Lastname
                            </label>
                            <input
                                type='text'
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                                placeholder='doe'
                                id='lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='username' className='text-sm font-medium block'>
                                Title
                            </label>
                            <select value={currentUser?.user_title_id} onChange={(e) => setTitle(e.target.value)}
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"} rounded-none`}
                            >
                                {titles?.map((element) => (
                                    <option
                                        key={element?.id}
                                        value={element?.id}
                                        className={`flex items-center cursor-pointer gap-4 rounded-none border-none border-b border-bg_core drop-shadow-none w-full`}
                                    >
                                        {element?.user_title}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor='githubUser' className='text-sm font-medium block'>
                                GitHub Username
                            </label>
                            <input
                                type='text'
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"} rounded-none`}
                                placeholder='johndoe'
                                id='githubUser'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}  ${!query ? 'opacity-[0.5]' : 'opacity-1'}`}
                                disabled={!query}
                            >
                                Search GitHub
                            </button>

                            <button
                                className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}  ${!username || !lastname ? 'opacity-[0.5]' : 'opacity-1'}`}
                                disabled={!username || !lastname}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
                <div className="max-w-2xl mx-auto px-4 mt-4">
                    {/* <ProfileInfoForm profileInfo={{}} /> */}
                </div>
            </div>
            {userData && <UserProfile userData={userData} theme={theme} />}
        </div>
    );
};
export default Profile;
