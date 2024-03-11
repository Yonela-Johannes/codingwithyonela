import { Link } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";

const UpvoteCard = ({ suggestion }) => {
  return (
    <div className="rounded-md p-2 flex-col flex md:flex-row items-center gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
      <div className="flex w-min flex-row md:flex-col md:text-2xl items-center justify-evenly h-full gap-2 text-clr_alt rounded-md p-2">
        <div className="flex gap-1 items-center">
          <BiUpvote />
          <p className="text-sm">{suggestion?.upvotes}</p>
        </div>
        <div className="flex text-black gap-1 items-center">
          <BiDownvote />
          <p className="text-sm">{suggestion?.downvotes}</p>
        </div>
      </div>
      <h4 className="text-sm md:text-base">{suggestion?.post}</h4>
      <div>
        <Link
          to={`/suggestions/${suggestion?.slug}`}
          className="cursor-pointer"
        >
          <div className="text-sm rounded-md bg-bg_light md:h-full p-1 md:p-2">
            <p className="text-xs">100 Comments</p>
            <p className="text-xs">{suggestion?.category}</p>
          </div>
        </Link>
        <div className="flex w-full md:w-min h-full flex-col space-y-2 py-4">
          <div className="flex  md:flex-col items-start md:justify-between gap-2">
            <div className="space-y-1">
              <p className="text-xs dark:text-gray-400">
                {new Date(suggestion?.createdAt).toDateString()}
              </p>
              <p className="text-xs">{suggestion?.author}</p>
            </div>
            <div>
              <img
                src={suggestion?.authorImg}
                alt="cover"
                className="rounded-md object-cover object-center h-[50px] w-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpvoteCard;
