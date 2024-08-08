import React, { useContext, useEffect } from 'react'
import Board from '../components/task/Board'
import { useDispatch, useSelector } from 'react-redux'
import { getAllprojects } from '../features/project/projectSlice'
import { ThemeContext } from '../context/ThemeContext'

const ProjectsTask = () =>
{
    const { theme } = useContext(ThemeContext)
    const { projects, success } = useSelector((state) => state.project);
    const { updated, deleted } = useSelector((state) => state.task);
    const dispatch = useDispatch();

    const getProjects = () =>
    {
        dispatch(getAllprojects())
    }

    useEffect(() =>
    {
        getProjects()
    }, []);

    useEffect(() =>
    {
        if (updated || success)
        {
            dispatch(getAllprojects())
        }
    }, [updated, success])

    useEffect(() =>
    {

        dispatch(getAllprojects())
    }, [deleted])


    return (
        <div className={`w-full h-full`}>
            <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-lg lg:text-3xl`}>Projects</h2>
            <Board project={true} data={projects} />
        </div>
    )
}

export default ProjectsTask
