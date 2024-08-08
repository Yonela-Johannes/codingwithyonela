import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Board from '../components/task/Board'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../features/tasks/tasksSlice'
import Loader from '../shared/Loader'
import Collaboration from './Collaboration'

const Todopage = () =>
{
    const { id } = useParams();
    const { project } = useSelector((state) => state.project);
    const { tasks } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const getTasks = () =>
    {
        dispatch(getAllTasks(id))
    }

    useEffect(() =>
    {
        if (id)
        {
            getTasks()
        }
    }, [id]);

    useEffect(() =>
    {
        if (!project)
        {
            navigate('/project-status')
        }
    }, [project]);

    console.log(project)
    return (
        <>
            <div className={`${theme == "light" ? "text-bg_primary" : "text-white"} w-full h-full grid lg:grid-rows-[150px auto] gap-8`}>
                <p className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} text-xl mb-2 font-normal text-start`}>
                    {project?.project_name}
                </p>
                {tasks.length ? (<Board project={false} data={tasks} />) : ""}
            </div>
            <Collaboration id={id} />
        </>
    )
}

export default Todopage
