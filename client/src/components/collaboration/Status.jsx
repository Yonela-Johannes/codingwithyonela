import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../../features/post/postSlice'
import { updateRecommendation } from '../../features/recommenation/recommendationSlice'

const Status = ({ post }) =>
{
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()

    const handleChange = (e) =>
    {
        if (currentUser?.is_staff || currentUser?.is_admin)
        {
            const data = {
                account: currentUser?.id,
                status: e.target.value,
                re_id: post?.re_id
            }
            dispatch(updateRecommendation(data))
        }
    }

    return (
        <div className="w-full flex cursor-pointer justify-end self-end">
            <div className='flex gap-2'>
                <select value={post?.status} onChange={handleChange} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"}`}>
                    <option value="" disabled selected hidden>Select status</option>
                    <option value="pending">Pending</option>
                    <option value="accepted">Accept</option>
                </select>
            </div>
        </div>
    )
}

export default Status