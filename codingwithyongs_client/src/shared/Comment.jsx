import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";

const Comment = ({
  handler,
  response,
  setResponse,
  placeholder,
  suggestion
}) => {
  return (
    <div className="w-full lg:px-10 md:my-4 space-y-4 z-10">
      <div className="flex bg-white border rounded-md border-bg_light">
        <textarea
          rows="1"
          placeholder={placeholder}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        {response ? (
          <button
            onClick={() => handler(response, suggestion)}
            className="flex items-center p-0 rounded-r-md h-11 w-10 cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiSendPlaneFill color="white" />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
