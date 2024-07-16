import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import useSelection from 'antd/es/table/hooks/useSelection'

const TaskForm = ({ project = false, filterGrouped }) =>
{
    const { user } = useSelection((state) => state?.user)
    const { theme } = useContext(ThemeContext)
    return (
        <header className="pb-4 border-b hidden lg:block w-full">
            <div className="flex justify-between">
                {user ? (
                    <form className='flex flex-col gap-4'>
                        <div className="px-2 hidden lg:block">
                            {project ? (
                                <input disabled type='text' className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"} focus:border-none active:border-none selection:border-none cursor-pointer`} placeholder='New project' />

                            ) : (
                                <input type='text' className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"} focus:border-none active:border-none selection:border-none cursor-pointer`} placeholder='New task...' />
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
                                <option value="todo">To Do</option>
                                <option value="doing">Doing</option>
                                <option value="postponed">Postponed</option>
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
