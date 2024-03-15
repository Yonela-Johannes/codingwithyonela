import { RiSendPlaneFill } from "react-icons/ri";

const GlobalComment = ({
  handler,
  comment,
  setComment,
  placeholder,
}) => {
  return (
      <div className="flex bg-red-300 border rounded-md border-bg_light w-full">
        <textarea
          rows="2"
          placeholder={placeholder}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full"
        />
        {comment ? (
          <button
            onClick={() => handler(comment)}
            className="flex items-center p-0 rounded-r-md h-11 w-16 text-lg cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiSendPlaneFill color="white" />
          </button>
        ) : (
          ""
        )}
      </div>
  );
};

export default GlobalComment;
