import { useCallback, useEffect, useState } from "react"

import Loader from '../../components/Loader/Loader'
import ProfileInfo from "../../components/github/ProfileInfo"
import Repos from "../../components/github/Repos"
import { useDispatch, useSelector } from "react-redux"
import { getMyFollowers, getMyProfile, getMyRepos } from "../../features/github/githubSlice"

const HomePage = () =>
{
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

    console.log(followers)
    return (
        <div className='m-4'>
            {loading ? (
                <Loader />
            ) : (
                <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                    {github_user ? (<ProfileInfo userProfile={github_user} followers={followers} />) : ""}
                    {my_repos?.length > 0 ? (<Repos repos={my_repos} />) : ""}
                </div>
            )}
        </div>
    );
};
export default HomePage;
