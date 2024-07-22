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
    const { theme } = useContext(ThemeContext)
    const [grouped, setGrouped] = useState()

    const groupData = (filter) =>
    {
        let result;
        if (data && filter && filter != 'all')
        {
            let res = Object.groupBy(data, ({ project_status }) => project_status == filter)
            result = {
                [filter]: res?.true
            }
            setGrouped(result)
        } else if (data || filter == "all")
        {
            result = Object.groupBy(data, ({ project_status }) => project_status)
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
        <main className={`${theme == "light" ? "text-bg_opp" : "text-white"} w-full h-full grid lg:grid-rows-[150px auto] gap-8`}>
            <TaskForm project={project} filterGrouped={filterGrouped} />

            <div className={`${theme == "light" ? "bg-slate-100 text-white" : "bg-bg_card text-slate-400"} flex flex-col lg:flex-row gap-4 lg:gap-0 lg:flex justify-evenly py-2 lg:py-5 rounded-md`}>
                {/* task column */}
                <section className="w-full lg:w-[35%] lg:m-5">
                    <TaskColumn title="To do" image={todo} />
                    {grouped?.todo?.map((elem) => (
                        <TaskCard elem={elem} project={project} />
                    ))}
                </section>
                <section className="w-full lg:w-[35%] lg:m-5">
                    <TaskColumn title="In progress" image={doing} />
                    {grouped?.progress?.map((elem) => (
                        <TaskCard elem={elem} />
                    ))}
                </section>
                {project ? (
                    <section className="w-full lg:w-[35%] lg:m-5">
                        <TaskColumn title="On hold" image={postponed} />
                        {grouped?.on_hold?.map((elem) => (
                            <TaskCard elem={elem} />
                        ))}
                    </section>
                ) : (
                    <section className="w-full lg:w-[35%] lg:m-5">
                        <TaskColumn title="Testing" image={testing} />
                        {grouped?.testing?.map((elem) => (
                            <TaskCard elem={elem} />
                        ))}
                    </section>

                )}
                <section className="w-full lg:w-[35%] lg:m-5">
                    <TaskColumn title="Done" image={done} />
                    {grouped?.done?.map((elem) => (
                        <TaskCard elem={elem} />
                    ))}
                </section>
            </div>
        </main>
    )
}

export default Board
