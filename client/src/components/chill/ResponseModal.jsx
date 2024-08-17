import React, { useContext } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { createPostResponse } from '../../features/post/postSlice';
import Loader from '../../shared/Loader';
import { ThemeContext } from '../../context/ThemeContext';
import { ModalContext } from '../../context/ModalContext';

const ResponseModal = () =>
{
    const { loading, responses } = useSelector((state) => state?.posts);
    const { selectedPost, response_text, setResponseText } = useContext(ModalContext)
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch()

    const responseHandler = async () =>
    {

        if (response_text > 200)
        {
            toast("Must be less or equal 200 characters");
        } else
        {
            if ((selectedPost && currentUser && currentUser?.account_id, response_text))
            {
                const data = {
                    account: currentUser?.account_id,
                    text: response_text,
                    post: selectedPost?.post_id,
                };
                dispatch(createPostResponse(data));
            }
        }
    };

    return (
        <div className={`${theme == 'light' ? "bg-bg_lightest" : "bg-bg_light"} max-h-[520px] overflow-auto rounded-lg max-w-[800px] m-auto z-30`}
        >
            <div className={`${theme == 'light' ? "bg-bg_lightest" : ""} p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full hover:border-bg_core duration-200 cursor-pointer`}>
                <div className="p-2 w-full border-b border-bg_light hover:border-bg_core duration-200 cursor-pointer">
                    <div className="flex-col flex md:flex-row items-start gap-3 md:gap-4 justify-between w-full ">
                        <div className="w-full h-full">
                            {selectedPost?.image ? (
                                <div className='mb-2'>
                                    <img
                                        src={selectedPost?.image}
                                        alt="cover"
                                        className="rounded-lg object-cover object-center h-[400px] w-full"
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                            {
                                selectedPost?.type !== 'image/video' ? (
                                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-xl my-2`}>
                                        {selectedPost?.text}
                                    </p>
                                ) : ""
                            }
                        </div>
                    </div>
                    <div>
                        <div className="flex w-full md:w-max h-full flex-col space-y-2">
                            <div className="flex w-full items-start md:justify-between gap-2">
                                <div className="space-y-1">
                                    <p className="text-xs">
                                        {selectedPost?.username}{" "}
                                        {selectedPost?.lastname}
                                    </p>
                                    <p className="text-xs dark:text-gray-400">
                                        {moment(
                                            selectedPost?.post_time
                                        ).fromNow()}
                                    </p>
                                </div>
                                <div>
                                    <img
                                        src={selectedPost?.profile}
                                        alt="cover"
                                        className="rounded-full object-cover object-center h-[35px] w-[35px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {currentUser && currentUser?.account_id ? (
                    <div className="rounded-md p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
                        <div className="w-full">
                            <textarea
                                value={response_text}
                                onChange={(e) => setResponseText(e.target.value)}
                                rows={1}
                                placeholder="Respond*"
                            ></textarea>
                        </div>
                        <div>
                            <div className="flex w-full md:w-max h-full flex-col space-y-2">
                                <div className="flex flex-col items-center text-black rounded-full md:justify-between gap-2">
                                    <div>
                                        <img
                                            src={currentUser?.profile}
                                            alt="cover"
                                            className="rounded-full object-cover object-center h-[35px] w-[35px]"
                                        />
                                    </div>
                                    <button className="p-2 lg:px-4 lg:py-2" onClick={responseHandler}>Reply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {loading ? (
                    <div className="w-full">
                        <Loader />
                    </div>
                ) : responses?.length > 0 ? (
                    <div className="rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border duration-200 cursor-pointer">
                        {responses?.map((res) => (
                            <div
                                key={res?.id}
                                className="rounded-md p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full h-full duration-200 cursor-pointer"
                            >
                                <p className="text-sm md:text-base">{res?.text}</p>
                                <div>
                                    <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                                        <div className="flex items-center text-bg_core rounded-full md:justify-between gap-2">
                                            <div className="space-y-1py-1 pl-3">
                                                <p className="text-xs">
                                                    {res?.username} {res?.lastname}
                                                </p>
                                                <p className="text-xs dark:text-gray-400">
                                                    {moment(res?.post_comment_time).fromNow()}
                                                </p>
                                            </div>
                                            <div>
                                                <img
                                                    src={res?.profile}
                                                    alt="cover"
                                                    className="rounded-full object-cover object-center h-[30px] w-[30px]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-lg my-2`}>Be the first to respond</p>
                )}
            </div>
        </div>
    )
}

export default ResponseModal