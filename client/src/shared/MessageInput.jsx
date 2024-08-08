import { useEffect, useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { createProjectMessage, getProjectMessages } from "../features/project/projectSlice";
import toast from "react-hot-toast";

const MessageInput = ({ setActive }) =>
{
  const [message, setMessage] = useState("");
  const { project } = useSelector((state) => state.project);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const messageHandler = (e) =>
  {
    e.preventDefault()
    if ((message, project && project?.project_id))
    {
      const data = {
        account_id: currentUser?.id,
        message,
        project_id: project?.project_id,
      };
      dispatch(createProjectMessage(data));
    } else
    {
      toast("Missing data");
    }
    setMessage('')
    setActive(false)
  };

  return (
    <form onSubmit={messageHandler} className="w-full md:my-4 z-10">
      <div className="flex bg-white border w-full rounded-md border-bg_light">
        <input
          className="w-full"
          placeholder="What do you think ?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message ? (
          <button type="submit" className="flex items-center rounded-r-md h-11 w-10 cursor-pointer text-white  bg-clr_alt justify-center">
            <RiSendPlaneFill />
          </button>
        ) : (
          <div
            onClick={() => setActive(false)}
            className="flex items-center rounded-r-md h-11 w-10 cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiCloseLine size={22} />
          </div>
        )}
      </div>
    </form>
  );
};

export default MessageInput;
