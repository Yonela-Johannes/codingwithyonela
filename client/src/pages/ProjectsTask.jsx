import React, { useContext, useEffect } from 'react'
import Board from '../components/task/Board'
import { useDispatch, useSelector } from 'react-redux'
import { disableMessageUpdate, getAllprojects } from '../features/project/projectSlice'
import { ThemeContext } from '../context/ThemeContext'
import Empty from './Empty'

const ProjectsTask = () =>
{
    const { theme } = useContext(ThemeContext)
    const { projects, success, updated, deleted } = useSelector((state) => state.project);

    const dispatch = useDispatch();

    const getProjects = () =>
    {
        dispatch(getAllprojects())
        dispatch(disableMessageUpdate())
    }

    useEffect(() =>
    {
        getProjects()
    }, []);

    useEffect(() =>
    {
        if (updated || success || deleted)
        {
            getProjects()
        }
    }, [updated, success, deleted])

    return (
        <div className={`w-full h-full`}>
            {projects?.length > 0 ? (
                <>
                    <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-lg lg:text-3xl`}>Projects</h2>
                    <Board project={true} data={projects} />
                </>
            ) : (
                <Empty title='No Projects' description='The CodingWithYonela Team has not created a project yet.' path='/admin/new-project' pathMessage="Create Project" />
            )}
        </div>
    )
}

export default ProjectsTask
