import { useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";

const MessageInput = ({setActive}) => {
  const [message, setMessage] = useState("");
  return (
    <div className="w-full md:my-4 z-10">
      <form className="flex bg-white border w-full rounded-md border-bg_light">
        <input
          className="w-full"
          placeholder="What do you think ?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message ? (
          <button type="submit" className="border-none">
            <RiSendPlaneFill />
          </button>
        ) : (
          <div onClick={() => setActive(false)} className="flex items-center rounded-r-md h-11 w-10 cursor-pointer text-white  bg-clr_alt justify-center">
            <RiCloseLine size={22} />
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
