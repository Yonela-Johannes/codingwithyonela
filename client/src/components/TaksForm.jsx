import React from 'react'

const TaskForm = () =>
{
    return (
        <header className="">
            <form>
                <input type='text' className='' placeholder='Enter your task' />
                <div className="flex">
                    <button className="">HTML</button>
                    <button className="">CSS</button>
                    <button className="">JavaScript</button>
                    <button className="">React</button>
                    <button className="">Python</button>
                    <button className="">PostgreSQL</button>
                </div>
                <div className='flex'>
                    <select>
                        <option value="To Do"></option>
                        <option value="Doing"></option>
                        <option value="Testing"></option>
                        <option value="Done"></option>
                    </select>
                    <select>
                        <option value="low"></option>
                        <option value="Medium"></option>
                        <option value="High"></option>
                    </select>
                </div>
                <button type='submit'>Submint</button>
            </form>
        </header>
    )
}

export default TaskForm
