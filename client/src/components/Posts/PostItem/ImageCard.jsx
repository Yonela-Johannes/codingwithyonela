import React, { useContext } from "react";
import moment from "moment";
import { AiTwotoneDelete, AiTwotoneLike, AiTwotoneMessage, AiTwotoneRightSquare } from "react-icons/ai";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { PiArrowCircleUpDuotone } from "react-icons/pi";
import { fetchPostComment } from "../../../features/post/postSlice";
import { ThemeContext } from "../../../context/ThemeContext";

const ImageCard = ({
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

    return (
        <div
            className={`${theme == "light" ? 'bg-bg_light' : 'bg-bg_grey'} p-2 flex flex-col w-full rounded-md`}
        >
            {post?.image ? (
                <div>
                    <img
                        src={post?.image}
                        alt="cover"
                        className="rounded-lg object-cover object-center h-[300px] w-full"
                    />
                </div>
            ) : (
                ""
            )}
            <div className="flex justify-between p-2">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex w-full flex-col space-y-2 my-2 items-center justify-center">
                        <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-center md:justify-end gap-2`}>
                            <div>
                                <img
                                    src={post?.profile}
                                    alt="cover"
                                    className="rounded-full object-cover object-center h-[35px] w-[35px]"
                                />
                            </div>
                            <div className="space-y-1">
                                <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                                    {post?.username == "CodingWithContent" ? post?.username : post.firstname} {post?.username == "CodingWithContent" ? "" : post?.lastname}
                                </p>
                                <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                                    {moment(post?.post_time).fromNow()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm font-bold p-1`}>
                        #{post?.status}
                    </p>
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm font-bold p-1`}>
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

export default ImageCard;
