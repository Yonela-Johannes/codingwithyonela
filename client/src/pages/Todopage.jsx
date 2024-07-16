import React, { useContext, useEffect } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import Board from '../components/task/Board'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../features/tasks/tasksSlice'
import Loader from '../components/Loader/Loader'

const Todopage = () =>
{
    const { id } = useParams();
    const { loading, tasks, success } = useSelector((state) => state.task);
    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext)

    const getTasks = () =>
    {
        dispatch(getAllTasks(id))
    }

    useEffect(() =>
    {
        if (id)
        {
            console.log(id)
            getTasks()
        }
    }, [id]);
    console.log(tasks)
    return (
        loading ? (
            <Loader />
        ) : tasks.length ? (
            <div className={`${theme == "light" ? "text-bg_opp" : "text-white"} w-full h-full grid lg:grid-rows-[150px auto] gap-8`}>
                <h2>{tasks[0]?.project_name}</h2>
                <Board project={false} data={tasks} />
            </div>
        ) : ''
    )
}

export default Todopage
