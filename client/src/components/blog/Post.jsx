import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn, formatDate } from "../../lib/utils";
import HoverUnderLine from "../HoverUnderLine";

const Post = ({ slug, title, post, date }) => {
  return (
    <article className="flex flex-col gap-2 border-bg_light border-border border-b py-3">
      <div>
        <HoverUnderLine>
          <h2 className="text-base md:text-2xl font-bold">
            <Link to={`/blogs/${slug}`}>{title}</Link>
          </h2>
        </HoverUnderLine>
      </div>
      <div className="max-w-none text-muted-foreground">{post}</div>
      <div className="flex justify-between items-center">
        <dl>
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={date}>{formatDate(date)}</time>
          </dd>
        </dl>
        <Link to={`/blogs/${slug}`} className={cn("py-0")}>
          <HoverUnderLine>Read more →</HoverUnderLine>
        </Link>
      </div>
    </article>
  );
};

export default Post;
