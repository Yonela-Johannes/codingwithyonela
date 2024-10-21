import { Calendar, Hash } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { cn, formatDate } from "../../lib/utils";
import HoverUnderLine from "../HoverUnderLine";
import { ThemeContext } from "../../context/ThemeContext";
import Text from "../../shared/Markdown";

const Post = ({ blog }) =>
{
  const { theme } = useContext(ThemeContext);
  return (
    <Link to={`/blog/${blog?.slug}`}>
      <article
        className={`${theme == "light"
          ? "text-bg_primary  border-bg_light border-b"
          : "text-slate-400 border-none"
          } w-full flex flex-col gap-2 py-3 border border-cl_primary shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c] space-y-4 mx-auto mb-8 px-5`}
      >
        <div
          className={`flex items-center mb-1 space-x-2 ${theme == "light"
            ? "bg-white text-bg_primary border-b-2"
            : "bg-bg_core  border-b-2 border-bg_grey"
            } py-2 `}
        >
          <Hash className="text-primary w-5" />
          <div className="w-full">
            <strong>
              {blog?.blog_title}
            </strong>
          </div>
        </div>
        <div>
          <HoverUnderLine>
            <h2
              className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"
                } text-base lg:text-xl my-2`}
            >
              <Link to={`/blog/${blog?.slug}`}>
                {blog?.blog_title?.slice(0, 40)}...
              </Link>
            </h2>
          </HoverUnderLine>
        </div>
        <div className="grid lg:grid-cols-2  h-full w-full">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={blog?.blog_image}
              alt={blog?.blog_title}
              className="rounded-md object-contain h-full"
            />
          </div>
          <div>
            <div className="max-w-none text-muted-foreground">
              <Text text={blog?.post?.slice(0, 400) + "..."} />
            </div>
            <div className="flex justify-between items-center">
              <dl>
                <dt className="sr-only">Published On</dt>
                <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={blog?.blog_time}>
                    {formatDate(blog?.blog_time)}
                  </time>
                </dd>
              </dl>
              <Link to={`/blog/${blog?.slug}`} className={cn("py-0")}>
                <HoverUnderLine>Read more →</HoverUnderLine>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Post;
