import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import
{
  createBlogComment,
  fetchBlogComment,
  getAllBlogs,
} from "../features/blogs/blogSlice";
import GlobalComment from "../shared/BlogComment.jsx";
import toast from "react-hot-toast";
import moment from "moment";
import Markdown from "../shared/Markdown.jsx";

const Blog = () =>
{
  const { user } = useSelector((state) => state.user);
  const { blogs, created, comments, loading } = useSelector(
    (state) => state.blogs
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const slug = useParams().id;

  useEffect(() =>
  {
    dispatch(getAllBlogs())
  }, []);

  useEffect(() =>
  {
    if (blogs && blogs?.length > 0 && slug)
    {
      const response = blogs?.find((elem) => elem?.slug == slug);
      setBlog(response);
    } else
    {
      navigate("/blogs");
    }
  }, [slug]);

  useEffect(() =>
  {
    console.log(blog);
    if (blog && blog?.id && blog?.blog_id && slug)
    {
      dispatch(fetchBlogComment(blog?.blog_id));
    }
  }, [slug, blog]);

  useEffect(() =>
  {
    if (created)
    {
      toast("Comment added successful");
      setComment("");
    }
  }, [created]);

  const sendMessageHander = async (params) =>
  {
    if (params && blog && blog?.id && user && user?.id)
    {
      const data = {
        comment: params,
        blog_id: blog?.blog_id,
        account_id: user?.id,
      };
      dispatch(createBlogComment(data));
    }
  };

  return (
    <div className="rounded-md border border-bg_light w-full min-h-full">
      <img
        src={blog?.blog_image}
        alt="cover"
        className="rounded-md object-cover object-center h-[300px] lg:h-[600px] w-full"
      />
      <div className="flex w-full h-full flex-col space-y-4 lg:space-y-8 px-2 py-4">
        <div className="flex justify-between lg:justify-start">
          <div>
            <div className="text-sm flex gap-2">
              <FaRegEye className="text-lg" />
              {/* <FaEye /> */}
              <p className="text-sm">{blog?.likes}</p>
            </div>
            <div className="text-sm flex gap-2">
              <BiHeart className="text-lg" />
              {/* <BiSolidHeart /> */}
              <p className="text-sm">{blog?.likes}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={blog?.profile}
              alt="cover"
              className="rounded-md object-cover object-center h-[40px] w-[40px]"
            />
            <div>
              <p className="text-sm dark:text-gray-400">
                {new Date(blog?.blog_time).toDateString()}
              </p>
              <p className="text-sm">
                {blog?.username} {blog?.lastname}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-20 lg:flex-row px-2 lg:px-8">
          <div className="text-sm md:text-base lg:w-full space-y-4 lg:space-y-8">
            <h4 className="text-lg font-bold">{blog?.blog_title}</h4>
            <Markdown text={blog?.post} />
          </div>
          <div className="w-full lg:space-y-8">
            {user && user?.id ? (
              <div className="w-full">
                <GlobalComment
                  object={blog}
                  handler={sendMessageHander}
                  comment={comment}
                  setComment={setComment}
                  placeholder="What do you think about this blog*"
                />
              </div>
            ) : ""}

            <div>
              {loading ? (
                "loading"
              ) : loading == false && comments?.length == 0 ? (
                "No data"
              ) : comments?.length > 0 && loading == false ? (
                <div className="flex-col flex items-start gap-2 md:gap-4 justify-between w-full duration-200 cursor-pointer">
                  {comments?.map((res) => (
                    <div
                      key={res?.id}
                      className="p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border-b border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer"
                    >
                      <h4 className="text-sm md:text-base">{res?.comment}</h4>
                      <div>
                        <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                          <div className="flex items-center text-black rounded-full md:justify-between gap-2">
                            <div className="space-y-1py-1 pl-3">
                              <p className="text-xs">
                                {res?.username} {res?.lastname}
                              </p>
                              <p className="text-xs dark:text-gray-400">
                                {moment(res?.sug_com_time).fromNow()}
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
