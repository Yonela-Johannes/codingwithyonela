import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { getAllTopics } from "../../features/topic/topicSlice";
import toast from "react-hot-toast";
import {
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
import NewPostForm from "../Posts/PostForm/NewPostForm";
import PostCard from "../Posts/PostItem/PostCard";
import QuestionCard from "../Posts/PostItem/QuestionCard";
import SuggestionCard from "../Posts/PostItem/SuggestionCard";
import PollCard from "../Posts/PostItem/PollCard";
import ImageCard from "../Posts/PostItem/ImageCard";
import Loader from "../../shared/Loader";
import { ModalContext } from "../../context/ModalContext";
import CommentsModal from "./CommentsModal";
import { AiTwotoneExclamationCircle } from "react-icons/ai";
import ResponseModal from "./ResponseModal";
import Empty from "../../pages/Empty";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../../animation/animate";

const Chill = () => {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state?.user);
  const {
    openDelete,
    setOpenDelete,
    openComment,
    setOpenComment,
    selectedPost,
    setSelectedPost,
    open,
    setOpen,
    setComment,
    openResponse,
    setOpenResponse,
    setResponseText,
  } = useContext(ModalContext);
  const { posts, created, loading, commented, updated, deleted, responded } =
    useSelector((state) => state?.posts);
  const [filterValue, setFilterValue] = useState("");
  const dispatch = useDispatch();

  const fetchPost = () => {
    dispatch(getAllPosts());
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (created || updated || deleted) {
      dispatch(disableUpdates());
      setOpen(false);
      fetchPost();
    }
    if (commented && selectedPost) {
      setComment("");
      dispatch(fetchPostComment(selectedPost?.post_id));
      dispatch(disableUpdates());
    }
    if (responded && selectedPost) {
      setResponseText("");
      dispatch(getPostResponses(selectedPost?.post_id));
      dispatch(disableUpdates());
    }
  }, [created, commented, selectedPost, updated, deleted, responded]);

  const handleLike = (params) => {
    if (currentUser && currentUser.id) {
      const data = {
        account: currentUser?.account_id,
        post: params?.post_id,
      };
      dispatch(updatePost(data));
    }
  };

  const handleDelete = () => {
    if (
      selectedPost &&
      currentUser &&
      currentUser?.account_id == selectedPost?.account_id
    ) {
      const data = {
        account: currentUser?.account_id,
        post_user: selectedPost?.account_id,
        post: selectedPost?.post_id,
      };
      dispatch(deletePost(data));
    }
    setOpenDelete(false);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="relative overflow-x-hidden flex-1 flex-grow">
      <div className="space-y-4 max-w-[550px] mb-8">
        <motion.h1
          variants={SlideLeft(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-xl lg:text-4xl font-bold"
        >
          Articles
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="text-gray-500 text-sm max-w-[350px]"
        >
          Bring your dream home to life with one-on-one design help & hand
          picked products
        </motion.p>
      </div>
      <div className="hidden lg:block absolute top-2 right-1 mb-8 lg:pt-4">
        {currentUser && currentUser?.id ? (
          <button
            onClick={() => setOpen(true)}
            title="Add recommendation"
            className={` ${
              theme == "light"
                ? "text-black bg-bg_light"
                : "bg-bg_grey text-bg_lightest"
            } flex p-0 items-center justify-center text-base border-none`}
          >
            <p className="pl-2">Post</p>
            <div
              className={` ${
                theme == "light"
                  ? "text-black bg-bg_light"
                  : "bg-bg_grey text-bg_lightest"
              } flex p-0 items-center justify-center text-lg w-10 h-10`}
            >
              <MdOutlineAdd size={20} />
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="h-full my-5 max-w-[800px] mx-auto overflow-hidden">
        {loading ? (
          <Loader />
        ) : posts?.length > 0 ? (
          <div className="flex flex-col gap-8 h-full w-full overflow-x-hidden">
            <div className="flex flex-col overflow-hidden py-4 gap-8 h-full">
              <div className="flex gap-1 lg:gap-4 flex-wrap w-full">
                {[
                  "all",
                  "post",
                  "question",
                  "suggestion",
                  "image/video",
                  "poll",
                ]?.map((elem, x) => (
                  <button
                    key={x}
                    onClick={() => setFilterValue(elem)}
                    className={`${
                      filterValue == elem ? "text-white bg-clr_alt" : ""
                    } ${
                      theme == "light"
                        ? "text-bg_primary bg-bg_light"
                        : " border-none bg-bg_grey"
                    } text-bg_lightest`}
                  >
                    {elem?.toUpperCase()}
                  </button>
                ))}
              </div>
              {filterValue && filterValue !== "all"
                ? posts
                    ?.filter((element) => element.type === filterValue)
                    ?.map((post) =>
                      (!currentUser?.is_admin || !currentUser?.is_staff) &&
                      post?.status != "pending" ? (
                        <>
                          {post?.type == "post" ? (
                            <PostCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "question" ? (
                            <QuestionCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "suggestion" ? (
                            <SuggestionCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "image/video" ? (
                            <ImageCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "poll" ? (
                            <PollCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ) : currentUser?.is_admin === true ||
                        currentUser?.is_staff === true ? (
                        <>
                          {post?.type == "post" ? (
                            <PostCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "question" ? (
                            <QuestionCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "suggestion" ? (
                            <SuggestionCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "image/video" ? (
                            <ImageCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                          {post?.type == "poll" ? (
                            <PollCard
                              key={post?.id}
                              setSelectedPost={setSelectedPost}
                              setOpenComments={setOpenComment}
                              post={post}
                              handleLike={handleLike}
                              setOpenDelete={setOpenDelete}
                            />
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        ""
                      )
                    )
                : posts?.map((post) =>
                    (!currentUser?.is_admin || !currentUser?.is_staff) &&
                    post?.status != "pending" ? (
                      <>
                        {post?.type == "post" ? (
                          <PostCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "question" ? (
                          <QuestionCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "suggestion" ? (
                          <SuggestionCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "image/video" ? (
                          <ImageCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "poll" ? (
                          <PollCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    ) : currentUser?.is_admin === true ||
                      currentUser?.is_staff === true ? (
                      <>
                        {post?.type == "post" ? (
                          <PostCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "question" ? (
                          <QuestionCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "suggestion" ? (
                          <SuggestionCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "image/video" ? (
                          <ImageCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                        {post?.type == "poll" ? (
                          <PollCard
                            key={post?.id}
                            setSelectedPost={setSelectedPost}
                            setOpenComments={setOpenComment}
                            post={post}
                            handleLike={handleLike}
                            setOpenDelete={setOpenDelete}
                          />
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )
                  )}
            </div>
          </div>
        ) : (
          <Empty
            title="No Posts"
            description="The CodingWithYonela Team has not created a post yet."
            path=""
            pathMessage=""
          />
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
          title={`Are you sure delete, "${selectedPost?.text?.slice(
            0,
            15
          )}..."`}
          icon={AiTwotoneExclamationCircle}
          centered
          open={openDelete}
          onCancel={() => setOpenDelete(false)}
          width={800}
          height={500}
          onOk={handleDelete}
        >
          <p className={`text-base lg:text-xl my-2`}>
            "{selectedPost?.text?.slice(0, 30)}...", with all its data will be
            removed
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default Chill;
