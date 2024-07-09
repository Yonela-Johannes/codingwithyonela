import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";

const Sender = ({
  options,
  name,
  text_placeholder,
  placeholder,
  setActive,
  response,
  setResponse,
  handler,
  title,
  setTitle,
  categories,
  setCategory,
  setOption,
}) => {
  return (
    <div className="w-full lg:px-10 md:my-4 space-y-4 z-10">
      <div className="flex bg-white border rounded-md border-bg_light">
        {categories && categories?.length > 0 ? (
          <select onChange={(e) => setCategory(e.target.value)} name={name}>
            {categories?.map((element) => (
              <option key={element?.id} value={element?.id}>
                {element?.category?.toUpperCase()}
              </option>
            ))}
          </select>
        ) : (
          ""
        )}
        <input className={`${title?.length >= 50 ? 'text-red-600' : '' }`}
          placeholder={text_placeholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
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
            onClick={() => handler(response)}
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

export default Sender;
