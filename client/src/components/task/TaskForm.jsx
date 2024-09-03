import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { createTask } from '../../features/tasks/tasksSlice';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const TaskForm = ({ project, filterGrouped }) =>
{
    const { project: data } = useSelector((state) => state.project);
    const { loading: load_project, messages, success, fetched } = useSelector(state => state.project)
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector((state) => state?.user);
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()
    const [inputData, setInputData] = useState({
        account_id: currentUser?.id,
        task: '',
        description: '',
        project_id: data?.project_id,
    })

    const handleSubmit = async (e) =>
    {
        setLoading(true)
        e.preventDefault()
        if (!currentUser?.id && !inputData.description && !inputData.task && !inputData?.project_id) return toast("Missing information")
        const res = {
            "task": inputData?.task,
            "description": inputData?.description,
            "project_id": inputData?.project_id || data?.project_id,
            "account_id": currentUser?.account_id,
        }
        dispatch(createTask(res));
        setInputData({
            task: '',
            description: '',
        })
        setLoading(false)
    }

    const handleChange = (e) =>
    {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
    };

    return (
        <header className="pb-4 border-b hidden lg:block w-full">
            <div className="flex justify-between">
                {currentUser?.id ? (
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <div className="px-2 hidden lg:block">
                            {project ? '' : (
                                <div className='flex gap-2'>
                                    <input value={inputData.task} id='task' onChange={handleChange} className={`${theme == "light" ? "bg-white" : "bg-slate-800 placeholder:text-gray-300"} border border-gray-400 md:w-[350px] px-2`} placeholder='task' />
                                    <input value={inputData.description} id='description' onChange={handleChange} className={`${theme == "light" ? "bg-white" : "bg-slate-800 placeholder:text-gray-300"} border border-gray-400 md:w-[350px] px-2`} placeholder='description' />
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-max rounded-none px-1 py-1 border ${theme == "light" ? "text-white bg-clr_alt" : "bg-bg_grey text-white"} text-md leading-tight`}
                                    >
                                        {loading ? (
                                            <>
                                                <Spinner size='sm' />
                                            </>
                                        ) : (
                                            'create task'
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </form>
                ) : (
                    ""
                )}
                <div className="w-full flex cursor-pointer justify-end self-end">
                    <div className='flex gap-2'>
                        {project ? (
                            <select onChange={e => filterGrouped(e.target.value)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                                <option value="" disabled selected hidden>Select status</option>
                                <option value="todo">To do</option>
                                <option value="progress">Progress</option>
                                <option value="on_hold">On hold</option>
                                <option value="testing">Testing</option>
                                <option value="done">Done</option>
                                <option value="all">All</option>
                            </select>

                        ) : (
                            <select onChange={e => filterGrouped(e.target.value)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                                <option value="" disabled selected hidden>Select status</option>
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="testing">Testing</option>
                                <option value="done">Done</option>
                                <option value="all">All</option>
                            </select>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TaskForm
