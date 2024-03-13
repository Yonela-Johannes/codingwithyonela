import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBlog } from "../features/blogs/blogSlice";

const Blog = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const [blog, setBlog] = useState({});
  const navigate = useNavigate();
  const slug = useParams().id;

  useEffect(() => {
    if (blogs && blogs?.length > 0 && slug) {
      const response = blogs?.find((elem) => elem?.slug == slug);
      setBlog(response);
    } else {
      navigate("/blogs");
    }
  }, []);

  return (
    <div className="rounded-md border border-bg_light min-h-full">
      <div className="flex h-full flex-col space-y-4 lg:space-y-8 px-2 py-4">
        <div className="h-full">
          <img
            src={blog?.blog_image}
            alt="cover"
            className="rounded-md object-cover object-center h-[600px] w-full"
          />
        </div>
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
        <div className="px-2 lg:px-8">
          <div className="text-sm md:text-base lg:w-[800px] space-y-4 lg:space-y-8">
          <h4 className="text-lg font-bold">{blog?.blog_title}</h4>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog?.post}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
