import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { formatDate } from '../../lib/utils';

const TaskCard = ({ elem, project }) =>
{
    const { currentUser, token } = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext)

    const handleUpdate = (e) =>
    {
        console.log(e.target.value)
    }

    return (
        <section className={`${theme == "light" ? "bg-white text-bg_opp" : "bg-bg_core border-bg_core text-slate-300"} flex flex-col gap-2 border rounded-md p-2 lg:p-4 mb-3`}>
            <div className='flex items-center justify-between'>
                {elem?.project_name ? (
                    <Link to={`/project/${elem?.project_id}/todo`} className='text-[13px] lg:text-xl cursor-pointer'>{elem?.project_name}</Link>

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
                    <select onChange={e => filterGrouped(e.target.value)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                        <option value="" disabled selected hidden>Select status</option>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="postponed">Postponed</option>
                        <option value="done">Done</option>
                    </select>

                ) : (
                    <select onChange={e => filterGrouped(e.target.value)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                        <option value="" disabled selected hidden>Select status</option>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="testing">Testing</option>
                        <option value="done">Done</option>
                    </select>
                )
            ) : ""}
        </section>
    )
}

export default TaskCard
