import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { Helmet } from "react-helmet";
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
import { motion } from "framer-motion";

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
    if (params && blog?.blog_id && currentUser?.id)
    {
      const data = {
        comment: params,
        blog_id: blog?.blog_id,
        account_id: currentUser?.account_id,
      };
      dispatch(createBlogComment(data));
    } else
    {
      toast("Try login out and in again")
    }
  };


  return (
    <>
    <Helmet>
      <title>{blog?.title}</title>
      <meta name="description" content={blog?.post} />
      <meta property="og:image" content={blog?.blog_image} />
      <meta name="author" content={blog?.username} />
      <meta name="creator" content={blog?.firstname + " " + blog?.lastname} />
      <meta property="og:image:alt" content="blog image" />
      <meta property="og:url" content={"https://codingwithyonela.vercel.app/" + slug} />
      </Helmet>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full min-h-full">
        <div className="flex w-full h-full flex-col space-y-4 lg:space-y-8 px-2 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 lg:flex-row px-2 lg:px-8">
            {loading ? <Loader /> :
              (
                <div className="text-sm md:text-base lg:w-full space-y-4 lg:space-y-8">
                  <img
                    src={blog?.blog_image}
                    alt="cover"
                    className="object-cover object-center w-full h-[300px] lg:h-[420px]"
                  />
                  <div className="flex justify-between lg:justify-start">
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex w-full flex-col space-y-2 my-2 items-center justify-center">
                        <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex items-center md:justify-end gap-2`}>
                          <div>
                            <img
                              src={blog?.profile}
                              alt="cover"
                              className="object-cover object-center h-[35px] w-[35px]"
                            />
                          </div>
                          <div className="space-y-1">
                            <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                              {blog?.firstname}{" "}{blog?.username}{" "}{blog?.lastname}
                            </p>
                            <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                              {moment(blog?.blog_time).fromNow()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-lg lg:text-2xl my-2`}>{blog?.blog_title}</p>
                  <Markdown text={blog?.post} />
                </div>
              )}
            <div className="w-full lg:space-y-8">
              {currentUser && currentUser?.id ? (
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
                ) : comments?.length ? (
                  <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex-col flex items-start gap-2 md:gap-4 justify-between w-full duration-200 cursor-pointer`}>
                    {comments?.map((res) => (
                      <div
                        key={res?.id}
                        className={`${theme == "light" ? "border-bg_light" : "border-bg_primary"} p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border-b  h-full duration-200 cursor-pointer`}
                      >

                        <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500  bg-bg_core"} w-max flex space-y-2 my-2 items-start justify-start`}>
                          <div className={`${theme == "light" ? "text-gray-700" : "text-gray-500"} flex w-full items-start md:justify-start gap-2 max-w-[220px]`}>
                            <div>
                              <img
                                src={res?.profile}
                                alt="cover"
                                className="object-cover object-center h-[30px] w-[30px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                                {res?.username} {res?.lastname}
                              </p>
                              <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_light"} text-sm`}>
                                {moment(res?.comment_time).fromNow()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className={`${theme == 'light' ? "text-bg_primary" : "text-bg_lightest"} text-base lg:text-lg my-2 w-full`}>{res?.comment}</p>
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
      </motion.div>
    </>
    
  );
};

export default Blog;
