import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import TaskColumn from '../../components/task/TaskColumn'
import todo from '../../assets/task/direct-hit.png'
import doing from '../../assets/task/glowing-star.png'
import testing from '../../assets/task/fire.png'
import done from '../../assets/task/check-mark-button.png'
import TaskCard from '../../components/task/TaskCard'
import postponed from '../../assets/task/postponed.png'
import TaskForm from '../../components/task/TaskForm'
import { useSelector } from 'react-redux'

const Board = ({ project, data }) =>
{
    const { currentUser } = useSelector((state) => state.user);
    const { theme } = useContext(ThemeContext)
    const [grouped, setGrouped] = useState()

    const groupData = (filter) =>
    {
        let result;
        if (data && filter && filter != 'all')
        {
            let res = Object.groupBy(data, ({ project_status, task_status }) => project ? project_status == filter : task_status == filter)
            result = {
                [filter]: res?.true
            }
            setGrouped(result)
        } else if (data || filter == "all")
        {
            result = Object.groupBy(data, ({ project_status, task_status }) => project ? project_status : task_status)
            setGrouped(result)
        }
    }

    useEffect(() =>
    {
        groupData()
    }, [data])


    const filterGrouped = (filter) =>
    {
        groupData(filter)
    }

    return (
        <main className={`${theme == "light" ? "text-bg_primary" : "text-white"} w-full grid lg:grid-rows-[150px auto] gap-8`}>
            {(currentUser?.is_staff || currentUser?.is_admin) ? (
                <TaskForm project={project} filterGrouped={filterGrouped} />
            ) : ""}
            {data?.length ? (
                <div className={`${theme == "light" ? "bg-slate-100 text-white" : "bg-bg_card text-slate-400"} flex flex-col lg:flex-row gap-4 lg:gap-0 lg:flex justify-evenly py-2 lg:py-5 rounded-md  ${data?.length ? "min-h-[600px]" : 'h-min'}`}>
                    {/* task column */}
                    <section className="w-full lg:w-[35%] lg:m-5">
                        <TaskColumn title="To do" image={todo} />
                        {grouped?.todo?.map((elem) => (
                            <TaskCard key={elem?.id} elem={elem} project={project} />
                        ))}
                    </section>
                    <section className="w-full lg:w-[35%] lg:m-5">
                        <TaskColumn title="In progress" image={doing} />
                        {grouped?.progress?.map((elem) => (
                            <TaskCard key={elem?.id} project={project} elem={elem} />
                        ))}
                    </section>
                    {project ? (
                        <>
                            <section className="w-full lg:w-[35%] lg:m-5">
                                <TaskColumn title="On hold" image={postponed} />
                                {grouped?.on_hold?.map((elem) => (
                                    <TaskCard key={elem?.id} project={project} elem={elem} />
                                ))}
                            </section>
                            <section className="w-full lg:w-[35%] lg:m-5">
                                <TaskColumn title="Testing" image={testing} />
                                {grouped?.testing?.map((elem) => (
                                    <TaskCard key={elem?.id} project={project} elem={elem} />
                                ))}
                            </section>
                        </>
                    ) : (
                        <section className="w-full lg:w-[35%] lg:m-5">
                            <TaskColumn title="Testing" image={testing} />
                            {grouped?.testing?.map((elem) => (
                                <TaskCard key={elem?.id} project={project} elem={elem} />
                            ))}
                        </section>

                    )}
                    <section className="w-full lg:w-[35%] lg:m-5">
                        <TaskColumn title="Done" image={done} />
                        {grouped?.done?.map((elem) => (
                            <TaskCard key={elem?.id} project={project} elem={elem} />
                        ))}
                    </section>
                </div>
            ) : ''}
        </main>
    )
}

export default Board
