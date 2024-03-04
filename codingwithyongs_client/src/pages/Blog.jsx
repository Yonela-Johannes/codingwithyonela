import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { BiHeart, BiSolidHeart} from "react-icons/bi";
import { FaEye, FaRegEye } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Blog = () => {
  const path = useLocation().pathname;
  const pathArray = path.split('/')
  pathArray[2]

  const blog = {
    _id: "655b21192255c0b35d4ab60bdfd",
    title: "Fullstack Social Media App - Frontend",
    slug: "fullstack-social-media-app-frontend",
    img: "https://res.cloudinary.com/djs3wu5bg/image/upload/v1683874453/samples/bike.jpg",
    cat: "FASHION",
    createdAt: "2023-11-20T09:04:26.018Z",
    views: 23,
    authorImg:
      "https://media.licdn.com/dms/image/D4D03AQH2Rk6Ms8QM3A/profile-displayphoto-shrink_800_800/0/1705361153176?e=1714608000&v=beta&t=jBQ3AzNBVNokv7cGkBKgyNYzwMK1wzQmrUHSswS2U2c",
    author: "Hlomla Tapuko",
    post: '',
    likes: 50,
    category: "Fashion",
  };

  return (
    <div className="rounded-md border border-bg_light min-h-full">
      <div className="flex h-full flex-col space-y-4 px-2 py-4">
        <div className="h-full">
          <img
            src={blog?.img}
            alt="cover"
            className="rounded-md object-cover object-center h-[600px] w-full"
          />
        </div>
        <div className="flex justify-between">
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
              src={blog?.authorImg}
              alt="cover"
              className="rounded-md object-cover object-center h-[40px] w-[40px]"
            />
            <div>
              <p className="text-sm dark:text-gray-400">
                {new Date(blog?.createdAt).toDateString()}
              </p>
              <p className="text-sm">{blog?.author}</p>
            </div>
          </div>
        </div>
        <h4 className="text-lg">{blog?.title}</h4>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{blog?.post}</ReactMarkdown>
    </div>
  );
};

export default Blog;
