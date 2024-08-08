import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import
{
  createBlogComment,
  disableBlogUpdates,
  fetchBlogComment,
  getAllBlogs,
  getBlog,
} from "../features/blogs/blogSlice";
import GlobalComment from "../shared/BlogComment.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import Markdown from "../shared/Markdown.jsx";
import Loader from "../shared/Loader.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import { useContext } from "react";

const Blog = () =>
{
  const { theme } = useContext(ThemeContext)
  const { currentUser } = useSelector((state) => state.user);
  const { blog, created, comments, loading } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const slug = useParams().id;

  const getComments = () =>
  {
    dispatch(fetchBlogComment(blog?.blog_id));
  }

  useEffect(() =>
  {
    if (slug)
    {
      dispatch(getBlog(slug))
    }
  }, [slug]);

  useEffect(() =>
  {
    if (blog && blog?.id)
    {
      getComments()
    }
  }, [slug, blog]);

  useEffect(() =>
  {
    if (created && blog && blog?.id)
    {
      setComment("");
      toast("Comment added successful");
      getComments()
      dispatch(disableBlogUpdates())
    }
  }, [created, slug, blog]);

  const sendMessageHander = async (params) =>
  {
    if (params && blog && blog?.id && currentUser && currentUser?.account_id)
    {
      const data = {
        comment: params,
        blog_id: blog?.blog_id,
        account_id: currentUser?.account_id,
      };
      dispatch(createBlogComment(data));
    }
  };

  return (
    <div className="rounded-md w-full min-h-full">
      <img
        src={blog?.blog_image}
        alt="cover"
        className="rounded-md object-contain object-center h-[300px] lg:h-[600px] w-full"
      />
      <div className="flex w-full h-full flex-col space-y-4 lg:space-y-8 px-2 py-4">
        <div className="flex justify-between lg:justify-start">
          {/* <div>
            <div className="text-sm flex gap-2">
              <FaRegEye className="text-lg" />
              <FaEye />
              <p className="text-sm">{blog?.likes}</p>
            </div>
            <div className="text-sm flex gap-2">
              <BiHeart className="text-lg" />
              <BiSolidHeart />
              <p className="text-sm">{blog?.likes}</p>
            </div>
          </div> */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex w-full flex-col space-y-2 my-2 items-center justify-center">
              <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-center md:justify-end gap-2`}>
                <div className="space-y-1">
                  <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                    {blog?.username} {blog?.lastname}
                  </p>
                  <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                    {moment(blog?.blog_time).fromNow()}
                  </p>
                </div>
                <div>
                  <img
                    src={blog?.profile}
                    alt="cover"
                    className="rounded-full object-cover object-center h-[35px] w-[35px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 lg:flex-row px-2 lg:px-8">
          <div className="text-sm md:text-base lg:w-full space-y-4 lg:space-y-8">
            <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-lg lg:text-2xl my-2`}>{blog?.title}</p>
            <Markdown text={blog?.post} />
          </div>
          <div className="w-full lg:space-y-8">
            {currentUser && currentUser?.account_id ? (
              <div className="w-full">
                <GlobalComment
                  object={blog}
                  handler={sendMessageHander}
                  comment={comment}
                  setComment={setComment}
                  placeholder="What do you think*"
                />
              </div>
            ) : ""}

            <div>
              {loading ? (
                <Loader />
              ) : comments?.length == 0 ? (
                ""
              ) : comments?.length >= 1 ? (
                <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex-col flex items-start gap-2 md:gap-4 justify-between w-full duration-200 cursor-pointer`}>
                  {comments?.map((res) => (
                    <div
                      key={res?.id}
                      className={`${theme == "light" ? "border-bg_light" : "border-bg_primary"} p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border-b  h-full duration-200 cursor-pointer`}
                    >
                      <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-lg my-2`}>{res?.comment}</p>
                      <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500  bg-bg_core"} rounded-full pl-4 full flex flex-col space-y-2 my-2 items-center justify-center`}>
                        <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-center md:justify-end gap-2`}>
                          <div className="space-y-1">
                            <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                              {res?.username} {res?.lastname}
                            </p>
                            <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                              {moment(res?.comment_time).fromNow()}
                            </p>
                          </div>
                          <div>
                            <img
                              src={res?.profile}
                              alt="cover"
                              className="rounded-full object-cover object-center h-[35px] w-[35px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                "Be the first one to comment"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
