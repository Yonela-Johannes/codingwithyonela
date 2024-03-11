import { useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";

const ProjectInput = ({ setActive }) => {
  const [message, setMessage] = useState("");
  return (
    <div className="w-full md:my-4 z-20 py-2">
      <form className="flex bg-white border w-full rounded-md border-bg_light">
        <div className="w-full space-y-2">
          <input
            className="w-full"
            placeholder="Title ?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Description ? (min-50, max-120"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Category?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Tech stack separated by commas ?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {message ? (
          <button type="submit" className="border-none">
            <RiSendPlaneFill />
          </button>
        ) : (
          <div
            onClick={() => setActive(false)}
            className="flex items-center rounded-full mx-1 h-8 w-8 cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiCloseLine size={22} />
          </div>
        )}
      </form>
    </div>
  );
};

export default ProjectInput;
