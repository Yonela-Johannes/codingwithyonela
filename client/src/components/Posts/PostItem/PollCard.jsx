import React, { useContext } from "react";
import moment from "moment";
import { AiTwotoneDelete, AiTwotoneLike, AiTwotoneMessage, AiTwotoneRightSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { PiArrowCircleUpDuotone } from "react-icons/pi";
import { fetchPostComment, vote } from "../../../features/post/postSlice";
import { ThemeContext } from "../../../context/ThemeContext";

const PollCard = ({
    post,
    setSelectedPost,
    setOpenComments,
    handleLike,
    setOpenDelete
}) =>
{
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const handleVote = (id) =>
    {
        if (id && currentUser?.id)
        {
            const data = {
                account: currentUser?.account_id,
                post: id
            }
            dispatch(vote(data));
        }
    }

    return (
        <div
            className={`relative ${theme == "light" ? 'bg-bg_light border-y border-bg_grey' : 'bg-bg_grey'} p-2 flex flex-col w-full`}
        >
            <div className="absolute top-1 right-2 flex w-full flex-col space-y-2 my-2 items-center justify-center">
                <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-center md:justify-end gap-2`}>
                    <div className="space-y-1">
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lighter"} text-sm`}>
                            {post?.username} {post?.lastname}
                        </p>
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lighter"} text-sm`}>
                            {moment(post?.post_time).fromNow()}
                        </p>
                    </div>
                    <div>
                        <img
                            src={post?.profile}
                            alt="cover"
                            className="rounded-full object-cover object-center h-[35px] w-[35px]"
                        />
                    </div>
                </div>
            </div>
            {
                post?.text ? (
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-xl my-2`}>{post?.text}</p>
                ) : ""
            }
            <div className="flex flex-col gap-2 px-2 lg:px-4 pt-4">
                {post.pao_id ? (<button disabled className={`${theme == 'light' ? '' : 'border-bg_dark bg-bg_lighter text-bg_primary'} font-semibold text-base md:text-md px-1 disabled:hover-none`}>{post?.pao_text}</button>) : ""}
                {post.pat_id ? (<button disabled className={`${theme == 'light' ? '' : 'border-bg_dark bg-bg_lighter text-bg_primary'} font-semibold text-base md:text-md px-1 disabled:hover-none`}>{post?.pat_text}</button>) : ""}
                {post.path_id ? (<button disabled className={`${theme == 'light' ? '' : 'border-bg_dark bg-bg_lighter text-bg_primary'} font-semibold text-base md:text-md px-1 disabled:hover-none`}>{post?.path_text}</button>) : ""}



            </div>
            <div className="flex justify-end p-2">
                <div className="flex">
                    <p className="text-sm p-1 font-bold text-slate-400">
                        #{post?.type}
                    </p>
                </div>
            </div>
            <div
                className={`flex items-center justify-center py-4 px-5 font-semibold border-t border-bg_lighter`}>
                <div
                    className={`flex items-center py-4 px-5 cursor-pointer`}
                    onClick={() => (setSelectedPost(post), dispatch(fetchPostComment(post?.post_id)), setOpenComments(true))}
                >
                    <AiTwotoneMessage size={22} />
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} flex items-center font-bold`}>{post?.comment_count}</p>
                </div>
                <div
                    onClick={() => handleLike(post)}
                    className={`flex items-center py-4 px-5 cursor-pointer`}
                >
                    <AiTwotoneLike size={22} />
                    {/* <AiFillLike size={22} /> */}
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} flex items-center font-bold`}>{post?.like_count}</p>
                </div>
                {currentUser && currentUser?.account_id == post?.account_id ? (
                    <>
                        <div
                            className={`flex items-center py-4 px-5 cursor-pointer`}
                            onClick={() => (setOpenComments(false), setSelectedPost(post), setOpenDelete(true))}
                        >
                            <AiTwotoneDelete size={22} />
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
};

export default PollCard;
