import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Board from '../components/task/Board'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { disableTaskUpdates, getAllTasks } from '../features/tasks/tasksSlice'
import Collaboration from './Collaboration'
import toast from 'react-hot-toast'

const Todopage = () =>
{
    const { id } = useParams();
    const { project } = useSelector((state) => state.project);
    const { tasks, created, updated, success, deleted } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext)

    const getTasks = () =>
    {
        dispatch(getAllTasks(id))
        dispatch(disableTaskUpdates())
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
        if (created && id)
        {
            getTasks()
            toast('New task created')
        }
    }, [created]);

    useEffect(() =>
    {
        if (success || updated || deleted)
        {
            getTasks()
        }
    }, [success, deleted, updated]);

    return (
        <>
            <div className={`${theme == "light" ? "text-bg_primary" : "text-white"} w-full h-full grid lg:grid-rows-[150px auto] gap-8`}>
                <p className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} text-xl mb-2 font-normal text-start`}>
                    {project?.project_name}
                </p>
                <Board project={false} data={tasks} />
            </div>
            <Collaboration id={id} />
        </>
    )
}

export default Todopage
