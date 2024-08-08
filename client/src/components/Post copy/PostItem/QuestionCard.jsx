import React, { useContext } from "react";
import { AiTwotoneDelete, AiTwotoneMessage, AiTwotoneQuestionCircle } from "react-icons/ai";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PiArrowCircleUpDuotone } from "react-icons/pi";
import { ThemeContext } from "../../../context/ThemeContext";
import { fetchPostComment } from "../../../features/post/postSlice";
import moment from 'moment'

const QuestionCard = ({
    post,
    setSelectedPost,
    setOpenComments,
    handleLike,
    setOpenDelete,
}) =>
{
    const { theme } = useContext(ThemeContext)
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    return (
        <div
            className={`relative ${theme == "light" ? 'bg-bg_light border border-bg_grey' : 'bg-bg_grey'} p-2 flex flex-col w-full`}
        >
            <div className="text-xl  lg:text-3xl mb-2">
                <AiTwotoneQuestionCircle />
            </div>
            <div className="absolute top-1 right-2 flex w-full flex-col space-y-2 my-2 items-center justify-center">
                <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-center md:justify-end gap-2`}>
                    <div className="space-y-1">
                        <p className="text-sm">
                            {post?.username} {post?.lastname}
                        </p>
                        <p className="text-sm dark:text-gray-400">
                            {moment(post.post_time).fromNow()}
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
            <div
                className="flex flex-col w-full"
            >
                {post?.image ? (
                    <div>
                        <img
                            src={post?.image}
                            alt="cover"
                            className="rounded-t-lg object-cover object-center h-[300px] w-full"
                        />
                    </div>
                ) : (
                    ""
                )}
                {
                    post?.text ? (
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-xl my-2`}>{post?.text}</p>
                    ) : ""
                }
                <div className="flex justify-between p-2">
                    <div className="flex flex-col items-center justify-center">
                    </div>
                    <div className="flex">
                        <p className="text-sm p-1 font-bold text-slate-400">
                            #{post?.type}
                        </p>
                    </div>
                </div>
                <div
                    className={`flex items-center justify-center py-4 px-5 font-semibold border-t border-bg_lighter`}>
                    <div
                        className={`flex items-center py-4 px-5 hover:bg-gray-200 cursor-pointer`}
                        onClick={() => handleLike(post)}
                    >
                        <PiArrowCircleUpDuotone size={22} />
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} flex items-center font-bold`}>{post?.like_count}</p>
                    </div>
                    <div
                        className={`flex items-center py-4 px-5 hover:bg-gray-200 cursor-pointer`}
                        onClick={() => (setSelectedPost(post), dispatch(fetchPostComment(post?.post_id)), setOpenComments(true))}
                    >
                        <AiTwotoneMessage size={22} />
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} flex items-center font-bold`}>{post?.comment_count}</p>
                    </div>

                    {currentUser && currentUser?.account_id == post?.account_id ? (
                        <>
                            <div
                                className={`flex items-center py-4 px-5 hover:bg-gray-200 cursor-pointer`}
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
        </div>
    );
};

export default QuestionCard;
