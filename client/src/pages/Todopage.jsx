import React from 'react'
import TaskForm from '../components/TaksForm'

const Todopage = () =>
{
    return (
        <div className="w-full h-full grid grid-rows-[150px auto]">
            {/* To do header */}
            <div className="">Header section</div>
            <TaskForm />
            {/* Todo body */}
            <main className="flex justify-evenly py-5 bg-blue-500">
                {/* task column */}
                <section className="w-[35%] m-5 bg-slate-500">
                    section 1
                </section>
                <section className="w-[35%] m-5 bg-slate-500">
                    section 2
                </section>
                <section className="w-[35%] m-5 bg-slate-500">
                    section 3
                </section>
            </main>
        </div>
    )
}

export default Todopage
