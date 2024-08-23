import { useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import Loader from "../shared/Loader";
import { ThemeContext } from "../context/ThemeContext";
import { ModalContext } from "../context/ModalContext";
import UserProfile from "./github/UserProfile";
import toast from "react-hot-toast";
import { PiShareFatDuotone, PiLinkedinLogoDuotone, PiGithubLogoDuotone } from "react-icons/pi";

const Recommendation = () =>
{
    const { currentUser } = useSelector((state) => state.user)
    const { selectedSuggestion } = useContext(ModalContext)
    const { theme } = useContext(ThemeContext)
    const { loading } = useSelector((state) => state.recommendation);
    const [userData, setUserData] = useState(currentUser?.username || "");
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

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
    const getFollowersFromGitHub = async (username) =>
    {
        const res = await fetch(`https://api.github.com/users/${username}/followers`);
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
        setFollowers(data)
    }
    const getFollowingFromGitHub = async (username) =>
    {
        const res = await fetch(`https://api.github.com/users/${username}/following`);
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
        setFollowing(data)
    }

    useEffect(() =>
    {
        if (selectedSuggestion && selectedSuggestion?.github)
        {
            getUserFromGithub(selectedSuggestion?.github)
        }
    }, [])

    useEffect(() =>
    {
        if (userData)
        {
            getFollowersFromGitHub(selectedSuggestion?.github)
        }
    }, [userData])

    useEffect(() =>
    {
        if (userData)
        {
            getFollowingFromGitHub(selectedSuggestion?.github)
        }
    }, [])

    return (
        loading ? (
            <Loader />
        ) : (
            <div className="lg:max-h-[500px] my-2 w-full overflow-y-auto">
                <div className={`${theme == "light" ? "text-cl_alt bg-bg_lightest" : "text-white bg-bg_core"} relative w-full`}>
                    <div className="rounded-md">
                        <div className="flex gap-1 px-2 font-bold justify-end">
                            <p className={`${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} md:block text-xs rounded-md px-2 py-1`}>{selectedSuggestion?.country_name.slice(0, 15)} - {selectedSuggestion?.country_code}</p>
                            <img
                                src={selectedSuggestion?.image}
                                alt={selectedSuggestion?.username}
                                className="h-[24px] md:h-[24px]
                    object-contain"
                            />
                        </div>
                        <div className="flex w-full gap-4 mt-3 mx-auto">
                            <div
                                className="shadow-md w-full
                rounded-lg hover:shadow-lg cursor-pointer"
                            >
                                <img
                                    src={selectedSuggestion?.portfolio}
                                    alt={selectedSuggestion?.username}
                                    className="w-[200px] lg:w-[360px] lg:h-[360px]
                    object-cover mt-3 mx-auto rounded-full"
                                />
                                <div
                                    className="flex flex-col 
                    items-baseline p-3 gap-1 border-t-[1px] border-bg_primary mt-2 b"
                                >
                                    <h2 className={`${theme == "light" ? "text-bg_primary" : "text-bg_lighter"} font-bold text-base lg:text-lg`}>{selectedSuggestion?.username} {selectedSuggestion?.lastname}</h2>
                                    <div className="flex justify-between">
                                        <p className="text-base w-max">{selectedSuggestion?.user_title}</p>
                                    </div>
                                    <div className="flex items-center text-primary gap-4 my-2 text-bg_opp text-lg">
                                        {selectedSuggestion?.website ? (
                                            <a href={selectedSuggestion.website} className="" target="_blank">
                                                <PiShareFatDuotone size={22} />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                        {selectedSuggestion?.github ? (
                                            <a href={`https://github.com/${selectedSuggestion.github}`} className="" target="_blank">
                                                <PiGithubLogoDuotone size={22} />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                        {selectedSuggestion?.linkedin ? (
                                            <a href={`https://www.linkedin.com/in/${selectedSuggestion.github}`} className="" target="_blank">
                                                <PiLinkedinLogoDuotone size={22} />
                                            </a>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                                <div className="px-1 lg:px-4 mb-4 max-w-[600px]">
                                    {selectedSuggestion?.skills ? (<p className={`${theme == "light" ? "text-bg_primary" : "text-bg_light"} text-sm lg:text-base pb-2 border-b border-b-bg_primary`}>{selectedSuggestion?.skills?.replaceAll('{', '')?.replaceAll('}', '')?.replaceAll('"', '')?.replaceAll(',', " | ")}</p>) : ''}
                                    {selectedSuggestion?.skills ? (<p className={`${theme == "light" ? "text-bg_primary" : "text-bg_light"} text-sm lg:text-base pb-2 border-b border-b-bg_primary`}>{selectedSuggestion?.description}</p>) : ''}
                                    <UserProfile following={following} followers={followers} userData={userData} theme={theme} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default Recommendation;
