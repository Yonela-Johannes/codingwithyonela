import { useCallback, useContext, useEffect, useState } from "react"

import Loader from '../../components/Loader/Loader'
import ProfileInfo from "../../components/github/ProfileInfo"
import Repos from "../../components/github/Repos"
import { useDispatch, useSelector } from "react-redux"
import { getMyFollowers, getMyProfile, getMyRepos } from "../../features/github/githubSlice"
import { ThemeContext } from "../../context/ThemeContext"

const HomePage = () =>
{
    const { theme } = useContext(ThemeContext)
    const { loading, github_user, my_repos, followers } = useSelector((state) => state.github);
    const dispatch = useDispatch()

    useEffect(() =>
    {
        dispatch(getMyProfile())
    }, []);

    useEffect(() =>
    {
        dispatch(getMyRepos())
    }, [github_user]);

    useEffect(() =>
    {
        dispatch(getMyFollowers())
    }, [github_user]);

    return (
        <div className='m-4'>
            {loading ? (
                <Loader />
            ) : (
                <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                    {github_user ? (<ProfileInfo userProfile={github_user} followers={followers} />) : ""}
                    <div>
                        {my_repos?.length > 0 ? (<Repos repos={my_repos} />) : ""}
                        <div align="start">
                            <a href="https://wakatime.com/@yongs">
                                <img src={`https://github-readme-activity-graph.vercel.app/graph?username=yonela-johannes&theme=react-${theme == 'light' ? 'light' : 'dark'}&hide_border=true&hide_title=false&area=true&custom_title=Total%20contribution%20graph%20in%20all%20repo`} width="680px" alt="activity graph" />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default HomePage;
