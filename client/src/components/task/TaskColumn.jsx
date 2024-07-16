import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'


const TaskColumnH = ({ title, image }) =>
{
    const { theme } = useContext(ThemeContext)
    return (
        <h2 className={`${theme == "light" ? "text-bg_core" : "text-white"}  flex items-center gap-1 text-center text-sm lg:text-2xl mb-2 lg:mb-4`}><img src={image} alt={title} className='w-4 j-4 lg:w-6 lg:h-6 object-contain' /> {title}</h2>
    )
}

export default TaskColumnH