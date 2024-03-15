import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";

const Comment = ({
  handler,
  response,
  setResponse,
  setActive,
  options,
  name,
  placeholder,
  setOption,
  suggestion
}) => {
  return (
    <div className="w-full lg:px-10 md:my-4 space-y-4 z-10">
      <div className="flex bg-white border rounded-md border-bg_light">
        {options && options?.length > 0 ? (
          <select name={name} onChange={(e) => setOption(e.target.value)}>
            {options?.map((element, id) => (
              <option key={id} value={element}>
                {element.toUpperCase()}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}
        <textarea
          rows="2"
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
        ) : setActive ? (
          <div
            onClick={() => setActive(false)}
            className="flex items-center rounded-r-md h-11 w-10 cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiCloseLine size={22} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Comment;
