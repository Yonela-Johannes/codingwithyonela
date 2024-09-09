import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { FaTrash } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils';
import { deleteTask, updateTask } from '../../features/tasks/tasksSlice';
import { deleteProject, setSelectProject, updateProject } from '../../features/project/projectSlice';
import Loader from '../../shared/Loader';
import { motion } from "framer-motion";

const TaskCard = ({ elem, project }) =>
{
    const { currentUser } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.project);
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleStatusChange = (e, id) =>
    {
        e.preventDefault()
        if (project && id)
        {
            const data = {
                "project_id": id,
                "user_id": currentUser?.id,
                "status": e.target.value
            }
            dispatch(updateProject(data))
        } else if (project == false && id)
        {
            const data = {
                "task_id": id,
                "user_id": currentUser?.id,
                "status": e.target.value
            }
            dispatch(updateTask(data))

        }
    }

    const handlePriorityChange = (e, id) =>
    {
        if (project && id)
        {
            const data = {
                "project_id": id,
                "user_id": currentUser?.id,
                "priority": e.target.value
            }
            dispatch(updateProject(data))

        } else if (project == false && id)
        {
            const data = {
                "task_id": id,
                "user_id": currentUser?.id,
                "priority": e.target.value
            }
            dispatch(updateTask(data))
        }
    }

    const handleDelete = (id) =>
    {
        if (project && id)
        {
            const data = {
                "project_id": id,
                "user_id": currentUser?.account_id,
            }
            dispatch(deleteProject(data))

        } else if (project == false && id)
        {
            const data = {
                "task_id": id,
                "user_id": currentUser?.account_id,
            }
            dispatch(deleteTask(data))
        }
    }

    const activeGroupHandler = () =>
    {
        if (elem && elem?.project_id)
        {
            dispatch(setSelectProject(elem))
            navigate(`/project/${elem?.project_id}/todo`)
        }
    }

    return (
        loading ? (<Loader disable={true} />) : (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }} className={`${theme == "light" ? "bg-white text-bg_primary" : "bg-bg_core border-bg_core text-slate-300"} flex flex-col gap-2 border rounded-md p-2 lg:p-4 mb-3`}>
                <div className='flex flex-col items-start justify-between'>
                    {elem?.project_name ? (
                        <div onClick={activeGroupHandler} className='text-[13px] lg:text-xl cursor-pointer text-clr_alt'>{elem?.project_name}</div>

                    ) : (
                        <p className='text-[13px] lg:text-xl cursor-pointer'>{elem?.task}</p>
                    )}
                    <p className='text-xs lg:text-sm cursor-pointer'>{formatDate(elem?.created)}</p>
                </div>
                <p className='text-xs lg:text-sm cursor-pointer'>{project ? elem?.description?.slice(0, 30) : elem?.description?.slice(0, 200)}...</p>
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-1'>
                        <div className={`${theme == "light" ? "bg-slate-200" : "bg-bg_card text-slate-400"} text-xs lg:text-sm rounded-md px-[3px]`}>{elem?.name}</div>
                        <div className="flex items-center gap-2 justify-end">
            <img className="w-7 h-7 rounded-full" src={elem?.profile} />
            <div>
              <p className="text-end text-xs font-semibold">
                {elem?.username}
              </p>
            </div>
          </div>
                    </div>
                    {currentUser && currentUser?.account_id == elem?.account_id ? (
                        project ? "" : (
                            <div className="flex gap-4 cursor-pointer">
                                <div onClick={(e) => handleDelete(project ? elem?.project_id : elem?.task_id)} className={`${theme == "light" ? "text-bg_opp" : "text-slate-400"} w-4 h-4 object-contain  hover:text-clr_alt duration-300`} alt='delete'>
                                    <FaTrash size={14} />
                                </div>
                            </div>)
                    ) : ""}
                </div>
                <div className='flex items-center gap-1'>
                    <div className={`text-white ${elem?.priority == "low" ? "bg-blue-400 border-blue-400" : elem?.priority == "medium" ? "bg-orange-400 border-orange-400" : elem.priority == "high" ? "bg-red-700 border border-red-700" : ""} text-xs lg:text-sm rounded-md px-[1px]`}>{elem?.priority}</div>
                </div>
                {(currentUser && currentUser?.is_staff || currentUser?.is_admin || currentUser?.account_id == elem?.account_id) ? (
                    <>
                        {project ? (
                            <select value={project ? elem?.project_status : elem?.task_status} onChange={e => handleStatusChange(e, project ? elem?.project_id : elem?.task_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                                <option value="" disabled selected hidden>Select status</option>
                                <option value="todo">To do</option>
                                <option value="progress">Progress</option>
                                <option value="testing">Testing</option>
                                <option value="on_hold">On hold</option>
                                <option value="done">Done</option>
                            </select>
                        ) : (
                            <select value={project ? elem?.project_status : elem?.task_status} onChange={e => handleStatusChange(e, project ? elem?.project_id : elem?.task_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                                <option value="" disabled selected hidden>Select status</option>
                                <option value="todo">To do</option>
                                <option value="progress">Progress</option>
                                <option value="testing">Testing</option>
                                <option value="done">Done</option>
                            </select>
                        )}

                        <select value={elem?.priority} onChange={e => handlePriorityChange(e, project ? elem?.project_id : elem?.task_id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                            <option value="" disabled selected hidden>Select priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </>
                ) : ""}
            </motion.div>
        )
    )
}

export default TaskCard
