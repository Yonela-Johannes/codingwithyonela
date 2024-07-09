import { Link } from "react-router-dom";
import HoverUnderLine from "../HoverUnderLine";

const BlogCard = ({ blog }) =>
{
  return (
    <HoverUnderLine>
      <div className="group relative overflow-hidden rounded-md border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
        <Link to={`/blogs/${blog?.slug}`}>
          <div className="flex h-full flex-col space-y-2 px-2 py-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm dark:text-gray-400">
                  {new Date(blog?.blog_time).toDateString()}
                </p>
                <p className="text-sm">{blog?.username}{" "}{blog?.lastname}</p>
              </div>
              <div>
                <img
                  src={blog?.profile}
                  alt="cover"
                  className="rounded-md object-cover object-center h-[40px] w-[40px]"
                />
              </div>
            </div>
            <div className="h-full">
              <img
                src={blog?.blog_image}
                alt="cover"
                className="rounded-md object-cover object-center h-full"
              />
            </div>
            <h4 className="text-lg">{blog?.blog_title}</h4>
          </div>
        </Link>
        <Link
          to={`/blogs/${blog.slug}`}
          className='z-10 group-hover:bottom-0 absolute bottom-[-50px] left-0 right-0 text-black bg-teal-500 border border-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read article
        </Link>
      </div>
    </HoverUnderLine>
  );
};

export default BlogCard;