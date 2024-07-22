import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { updateTask } from '../../features/tasks/tasksSlice';
import { getAllprojects } from '../../features/project/projectSlice';

const TaskCard = ({ elem, project }) =>
{
    const { currentUser, token } = useSelector((state) => state.user);

    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()

    const handleStatusChange = (e, id) =>
    {
        const data = {
            "project_id": id,
            "user_id": currentUser?.account_id,
            "status": e.target.value
        }
        dispatch(updateTask(data))
    }

    const handlePriorityChange = (e, id) =>
    {
        const data = {
            "project_id": id,
            "user_id": currentUser?.account_id,
            "priority": e.target.value
        }
        dispatch(updateTask(data))
    }

    return (
        <section className={`${theme == "light" ? "bg-white text-bg_opp" : "bg-bg_core border-bg_core text-slate-300"} flex flex-col gap-2 border rounded-md p-2 lg:p-4 mb-3`}>
            <div className='flex items-center justify-between'>
                {elem?.project_name ? (
                    <Link to={`/project/${elem?.project_id}/todo`} className='text-[13px] lg:text-xl cursor-pointer text-clr_alt'>{elem?.project_name}</Link>

                ) : (
                    <p className='text-[13px] lg:text-xl cursor-pointer'>{elem?.task}</p>
                )}
                <p className='text-[11px] lg:text-[15px] cursor-pointer'>{formatDate(elem?.created)}</p>
            </div>
            <p to={`/project/${elem?.project_id}/todo`} className='text-[13px] lg:text-[16px] cursor-pointer'>{elem?.description}</p>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-1'>
                    <div className={`${theme == "light" ? "bg-slate-200" : "bg-bg_card text-slate-400"} text-xs lg:text-sm rounded-md px-[3px]`}>{elem?.name}</div>
                </div>
                {currentUser && currentUser?.account_id == elem?.account_id ? (
                    <div className="flex gap-4">
                        <div className={`${theme == "light" ? "text-bg_opp" : "text-slate-400"} w-4 h-4 object-contain`} alt='delete'>
                            <FaTrash size={14} />
                        </div>
                        <div className={`${theme == "light" ? "text-bg_opp" : "text-slate-400"} w-4 h-4 object-contain`} alt='delete'>
                            <FaEdit size={14} />
                        </div>
                    </div>

                ) : ""

                }
            </div>
            <div className='flex items-center gap-1'>
                <div className={`text-white ${elem?.priority == "low" ? "bg-blue-400 border-blue-400" : elem?.priority == "medium" ? "bg-orange-400 border-orange-400" : elem.priority == "high" ? "bg-red-700 border border-red-700" : ""} text-xs lg:text-sm rounded-md px-[1px]`}>{elem?.priority}</div>
            </div>
            {elem?.link && elem?.github ? (
                <>
                    <a href={elem?.link} target='_blank' className='italic p-0 m-0 text-clr_alt text-[11px] lg:text-[15px] cursor-pointer'>{elem?.link?.slice(0, 30)}...</a>
                    <a href={elem?.github} target='_blank' className='italic p-0 m-0 text-clr_alt text-[11px] lg:text-[15px] cursor-pointer'>{elem?.github?.slice(0, 30)}...</a>
                </>
            ) : ""}
            {currentUser && currentUser?.account_id == elem?.account_id ? (
                project ? (
                    <select value={elem?.progress} onChange={e => handleStatusChange(e, elem?.project_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                        <option value="" disabled selected hidden>Select status</option>
                        <option value="todo">To do</option>
                        <option value="progress">Progress</option>
                        <option value="testing">Testing</option>
                        <option value="done">Done</option>
                    </select>

                ) : (
                    <select value={elem?.project_status} onChange={e => handleStatusChange(e, elem?.project_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                        <option value="" disabled selected hidden>Select status</option>
                        <option value="todo">To do</option>
                        <option value="progress">Progress</option>
                        <option value="on_hold">On hold</option>
                        <option value="done">Done</option>
                    </select>
                )
            ) : ""}
            <select value={elem?.priority} onChange={e => handlePriorityChange(e, elem?.project_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                <option value="" disabled selected hidden>Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </section>
    )
}

export default TaskCard
