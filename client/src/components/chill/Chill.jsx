import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { getAllTopics } from "../../features/topic/topicSlice";
import toast from "react-hot-toast";
import
{
  createPost,
  createPostComment,
  deletePost,
  disableUpdates,
  fetchPostComment,
  getAllPosts,
  getPostResponses,
  updatePost,
} from "../../features/post/postSlice";
import moment from "moment";
import { ThemeContext } from "../../context/ThemeContext";
import NewPostForm from "../Post copy/PostForm/NewPostForm";
import PostCard from "../Post copy/PostItem/PostCard";
import QuestionCard from "../Post copy/PostItem/QuestionCard";
import SuggestionCard from "../Post copy/PostItem/SuggestionCard";
import PollCard from "../Post copy/PostItem/PollCard";
import ImageCard from "../Post copy/PostItem/ImageCard";
import Loader from "../../shared/Loader";
import { ModalContext } from "../../context/ModalContext";
import CommentsModal from "./CommentsModal";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import ResponseModal from "./ResponseModal";

const Chill = () =>
{
  const { currentUser } = useSelector((state) => state?.user);
  const { openDelete, setOpenDelete, openComment, setOpenComment, selectedPost, setSelectedPost, open, setOpen, setComment, openResponse, setOpenResponse } = useContext(ModalContext)
  const { posts, created, loading, commented, updated, deleted } = useSelector((state) => state?.posts);
  const [filterValue, setFilterValue] = useState("")
  const dispatch = useDispatch();

  const fetchPost = () =>
  {
    dispatch(getAllPosts());
  }


  const fetchUser = () =>
  {
    dispatch(getAllPosts());
  }

  useEffect(() =>
  {
    fetchPost()
  }, []);

  useEffect(() =>
  {
    if (created || updated || deleted)
    {
      dispatch(disableUpdates())
      setOpen(false);
      fetchPost()
    }
    if (commented && selectedPost)
    {
      fetchPost()
      setComment('')
      dispatch(fetchPostComment(selectedPost?.post_id))
    }
  }, [created, commented, selectedPost, updated, deleted]);

  const handleLike = (params) =>
  {
    if (currentUser && currentUser.id)
    {
      const data = {
        account: currentUser?.account_id,
        post: params?.post_id
      }
      dispatch(updatePost(data));
    }
  };

  const handleDelete = () =>
  {
    if (selectedPost && currentUser && currentUser?.account_id == selectedPost?.account_id)
    {
      const data = {
        account: currentUser?.account_id,
        post_user: selectedPost?.account_id,
        post: selectedPost?.post_id
      }
      dispatch(deletePost(data))
    }
    setOpenDelete(false)
  }
  console.log(currentUser)

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="relative overflow-x-hidden flex-1 flex-grow">
        <div className="absolute top-2 right-1 mb-8 lg:pt-4">
          {currentUser && currentUser?.id ? (
            <button
              onClick={() => setOpen(true)}
              title="Add recommendation"
              className="flex p-0 items-center justify-center text-lg bg-clr_alt text-white rounded-full w-11 h-11"
            >
              <MdOutlineAdd size={20} />
            </button>
          ) : ""}
        </div>
        <div className="h-full my-5 max-w-[800px] mx-auto overflow-hidden">
          {loading ? (
            <Loader />
          ) : posts?.length < 1 ? (
            ""
          ) : posts?.length > 0 ? (
            <div className="flex flex-col gap-8 h-full w-full overflow-x-hidden">
              <div className="flex flex-col overflow-hidden py-4 gap-8 h-full">
                {filterValue ? posts?.filter((element) => element.topic_name == filterValue)?.map((post) => (
                  <>
                    {post?.type == 'post' ? (
                      <PostCard
                        key={post?.id}
                        setSelectedPost={setSelectedPost}
                        setOpenComments={setOpenComment}
                        post={post}
                        handleLike={handleLike}
                        setOpenDelete={setOpenDelete}
                      />
                    ) : ""}
                    {post?.type == 'question' ? (
                      <QuestionCard
                        key={post?.id}
                        setSelectedPost={setSelectedPost}
                        setOpenComments={setOpenComment}
                        post={post}
                        handleLike={handleLike}
                        setOpenDelete={setOpenDelete}
                      />
                    ) : ""}
                    {post?.type == 'suggestion' ? (
                      <SuggestionCard
                        key={post?.id}
                        setSelectedPost={setSelectedPost}
                        setOpenComments={setOpenComment}
                        setOpenResponse={setOpenResponse}
                        post={post}
                        handleLike={handleLike}
                        setOpenDelete={setOpenDelete}
                      />
                    ) : ""}
                    {post?.type == 'image/video' ? (
                      <ImageCard
                        key={post?.id}
                        setSelectedPost={setSelectedPost}
                        setOpenComments={setOpenComment}
                        post={post}
                        handleLike={handleLike}
                        setOpenDelete={setOpenDelete}
                      />
                    ) : ""}
                    {post?.type == 'poll' ? (
                      <PollCard
                        key={post?.id}
                        setSelectedPost={setSelectedPost}
                        setOpenComments={setOpenComment}
                        post={post}
                        handleLike={handleLike}
                        setOpenDelete={setOpenDelete}
                      />
                    ) : ""}
                  </>
                )) : (
                  posts?.map((post) => (
                    <>
                      {post?.type == 'post' ? (
                        <PostCard
                          key={post?.id}
                          setSelectedPost={setSelectedPost}
                          setOpenComments={setOpenComment}
                          post={post}
                          handleLike={handleLike}
                          setOpenDelete={setOpenDelete}
                        />
                      ) : ""}
                      {post?.type == 'question' ? (
                        <QuestionCard
                          key={post?.id}
                          setSelectedPost={setSelectedPost}
                          setOpenComments={setOpenComment}
                          post={post}
                          handleLike={handleLike}
                          setOpenDelete={setOpenDelete}
                        />
                      ) : ""}
                      {post?.type == 'suggestion' ? (
                        <SuggestionCard
                          key={post?.id}
                          setSelectedPost={setSelectedPost}
                          setOpenComments={setOpenComment}
                          post={post}
                          handleLike={handleLike}
                          setOpenDelete={setOpenDelete}
                        />
                      ) : ""}
                      {post?.type == 'image/video' ? (
                        <ImageCard
                          key={post?.id}
                          setSelectedPost={setSelectedPost}
                          setOpenComments={setOpenComment}
                          post={post}
                          handleLike={handleLike}
                          setOpenDelete={setOpenDelete}
                        />
                      ) : ""}
                      {post?.type == 'poll' ? (
                        <PollCard
                          key={post?.id}
                          setSelectedPost={setSelectedPost}
                          setOpenComments={setOpenComment}
                          post={post}
                          handleLike={handleLike}
                          setOpenDelete={setOpenDelete}
                        />
                      ) : ""}
                    </>
                  )
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}

          <Modal
            title="Create post"
            centered
            open={open}
            onCancel={() => setOpen(false)}
            width={800}
            footer={false}
            height={500}
          >
            <NewPostForm />
          </Modal>
          <Modal
            title="Comment"
            centered
            open={openComment}
            onCancel={() => setOpenComment(false)}
            width={800}
            footer={false}
            height={500}
          >
            <CommentsModal />
          </Modal>
          <Modal
            title="Response"
            centered
            open={openResponse}
            onCancel={() => setOpenResponse(false)}
            width={800}
            footer={false}
            height={500}
          >
            <ResponseModal />
          </Modal>
          <Modal
            title={`Are you sure delete, "${selectedPost?.text?.slice(0, 15)}..."`}
            icon={AiTwotoneExclamationCircle}
            centered
            open={openDelete}
            onCancel={() => setOpenDelete(false)}
            width={800}
            height={500}
            onOk={handleDelete}
          >
            <p className={`text-base lg:text-xl my-2`}>"{selectedPost?.text?.slice(0, 30)}...", with all its data will be removed</p>
          </Modal>
        </div>
      </div>
    )
  );
};

export default Chill;
