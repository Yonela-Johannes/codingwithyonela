import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { cn, formatDate } from "../../lib/utils";
import HoverUnderLine from "../HoverUnderLine";
import { ThemeContext } from "../../context/ThemeContext";
import Text from "../../shared/Markdown";

const Post = ({ blog }) =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <article className={`${theme == "light" ? "text-bg_primary  border-bg_light border-b" : "text-slate-400 border-none"} w-full flex flex-col gap-2 py-3`}>
      <div>
        <HoverUnderLine>
          <h2 className={`${theme == 'light' ? "text-clr_alt" : "text-cl_primary"} text-base lg:text-xl my-2`}>
            <Link to={`/blog/${blog?.slug}`}>{blog?.blog_title?.slice(0, 28)}</Link>
          </h2>
        </HoverUnderLine>
      </div>
      <div className="max-w-none text-muted-foreground"><Text text={blog?.post?.slice(0, 400) + "..."} /></div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={blog?.blog_time}>{formatDate(blog?.blog_time)}</time>
          </dd>
        </dl>
        <Link to={`/blog/${blog?.slug}`} className={cn("py-0")}>
          <HoverUnderLine>Read more →</HoverUnderLine>
        </Link>
      </div>
    </article>
  );
};

export default Post;
