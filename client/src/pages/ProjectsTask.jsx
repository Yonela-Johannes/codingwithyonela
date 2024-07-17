import React, { useContext, useEffect } from 'react'
import Board from '../components/task/Board'
import { useDispatch, useSelector } from 'react-redux'
import { getAllprojects } from '../features/project/projectSlice'
import Loader from '../components/Loader/Loader'
import { ThemeContext } from '../context/ThemeContext'

const ProjectsTask = () =>
{
    const { theme } = useContext(ThemeContext)
    const { loading, projects } = useSelector((state) => state.project);
    const dispatch = useDispatch();

    const getProjects = () =>
    {
        dispatch(getAllprojects())
    }

    useEffect(() =>
    {
        getProjects()
    }, []);

    return (
        loading ? (
            <Loader />
        ) : (
            <div className={`w-full h-full`}>
                <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-lg lg:text-3xl`}>Projects</h2>
                <Board project={true} data={projects} />
            </div>
        )
    )
}

export default ProjectsTask
