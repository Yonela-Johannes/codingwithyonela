import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";

const BlogCard = ({ blog }) =>
{
  const { theme } = useContext(ThemeContext)
  const { loading } = useSelector((state) => state.blogs);

  return (
    <div className={`${theme == "light" ? 'bg-bg_lightest border border-bg_light' : 'border-bg_primary bg-bg_primary'} group relative overflow-hidden h-full duration-200 cursor-pointer`}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Link to={`/blog/${blog?.slug}`}>
            <div className="flex h-full flex-col space-y-2 px-2 py-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm dark:text-gray-400">
                    {new Date(blog?.blog_time).toDateString()}
                  </p>
                  <p className="text-sm">{blog?.username}</p>
                </div>
                <div>
                  <img
                    src={blog?.profile}
                    alt="cover"
                    className="object-cover object-center h-[40px] w-[40px]"
                  />
                </div>
              </div>
              <div className="h-full">
                <img
                  src={blog?.blog_image}
                  alt="cover"
                  className="object-cover object-center h-full"
                />
              </div>
              <h4 className="text-lg">{blog?.blog_title?.slice(0, 28)}...</h4>
            </div>
          </Link>
          <Link
            to={`/blog/${blog.slug}`}
            className='z-10 group-hover:bottom-0 absolute bottom-[-50px] left-0 right-0 text-bg_lightest bg-bg_primary hover:bg-clr_alt transition-all duration-300 text-center py-2 m-2'
          >
            Read article
          </Link>
        </>
      )}
    </div>
  );
};

export default BlogCard;
