import { RiSendPlaneFill } from "react-icons/ri";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const GlobalComment = ({
  handler,
  comment,
  setComment,
  placeholder,
}) =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="flex w-full">
      <textarea
        rows="2"
        placeholder={placeholder}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className={`w-full px-3 py-2 mt-1 rounded-none border ${theme == "light" ? "text-black bg-bg_lightest" : "bg-bg_grey text-white"}`}
      />
      {comment ? (
        <button
          onClick={() => handler(comment)}
          className={`flex items-center justify-center rounded-md h-full w-max p-2 text-center border-none font-bold text-white m-auto ml-2 ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}`}
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
