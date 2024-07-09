import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from '../../components/Loader/Loader'

import ProfileInfo from "../../components/github/ProfileInfo"
import Repos from "../../components/github/Repos"
// import Search from "../../components/github/Search"
import SortRepos from "../../components/github/SortRepos"
import Spinner from "../../components/github/Spinner"

const HomePage = () =>
{
    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [sortType, setSortType] = useState("recent");

    const getUserProfileAndRepos = useCallback(async () =>
    {
        setLoading(true);
        try
        {
            const res = await fetch(`/api/v1/github/my-profile`);
            const { repos, userProfile } = await res.json();

            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first

            setRepos(repos);
            setUserProfile(userProfile);

            return { userProfile, repos };
        } catch (error)
        {
            toast.error(error.message);
        } finally
        {
            setLoading(false);
        }
    }, []);

    useEffect(() =>
    {
        getUserProfileAndRepos();
    }, [getUserProfileAndRepos]);

    // const onSearch = async (e, username) =>
    // {
    //     e.preventDefault();

    //     setLoading(true);
    //     setRepos([]);
    //     setUserProfile(null);

    //     const { userProfile, repos } = await getUserProfileAndRepos(username);

    //     setUserProfile(userProfile);
    //     setRepos(repos);
    //     setLoading(false);
    //     setSortType("recent");
    // };

    const onSort = (sortType) =>
    {
        if (sortType === "recent")
        {
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, recent first
        } else if (sortType === "stars")
        {
            repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
        } else if (sortType === "forks")
        {
            repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
        }
        setSortType(sortType);
        setRepos([...repos]);
    };

    console.log(userProfile)
    return (
        <div className='m-4'>
            {/* <Search onSearch={onSearch} /> */}
            {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                {<ProfileInfo userProfile={userProfile} />}

                {<Repos repos={repos} />}
                {loading && <Loader />}
            </div>
        </div>
    );
};
export default HomePage;
