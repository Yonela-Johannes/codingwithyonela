import React from 'react'
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateFeedback } from '../../../features/feedback/feedbackSlice';

const Card = ({ element, theme }) =>
{
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const handleStatusChange = (e, id) =>
    {
        e.preventDefault()
        if (id)
        {
            const data = {
                "feedback_id": id,
                "user_id": currentUser?.id,
                "status": e.target.value
            }
            dispatch(updateFeedback(data))
        }
    }

    return (
        <div key={element?.id} className="h-full w-[300px] px-4 py-2 pt-12">
            <div className={`flex flex-col ${theme == "light" ? "bg-bg_lightest shadow-md" : "bg-bg_grey"} h-full min-h-[165px] gap-4 rounded-md p-2 lg:p-4 text-md font-thin`}>
                <p className="flex-1 text-sm lg:text-base">{element.message?.slice(0, 130)}...</p>
                <div className="flex items-center gap-2 mt-3">
                    {[...Array(5)]?.map((_, index) => (
                        <StarIcon
                            key={index}
                            className={`${element?.rating > index ? "" : "fill-muted stroke-muted-foreground"} h-5 w-5 ${theme == "light" ? "fill-clr_alt text-clr_alt" : "fill-cl_primary text-cl_primary"
                                }`}
                        />
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <img
                        src={element?.image}
                        alt="cover"
                        className="rounded-full object-cover object-center h-[40px] w-[40px]"
                    />
                    <div className="lg:flex flex-col items-start justify-between">
                        <div>
                            <h6 className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} text-sm lg:text-base font-semibold`}>{element?.name}{" "}{element?.lastname}</h6>
                            <span className={`w-full block ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} text-xs font-normal italic lg:text-sm`}>
                                {element.company}
                            </span>
                        </div>
                    </div>
                </div>
                {currentUser && (currentUser.is_staff || currentUser?.is_admin) ? (
                    <select value={element.status} onChange={e => handleStatusChange(e, element?.id)} className={`${theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"} mt-5`}>
                        <option value="" disabled selected hidden>Select status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accept</option>
                    </select>
                ) : ""}
            </div>
        </div>
    )
}

export default Card