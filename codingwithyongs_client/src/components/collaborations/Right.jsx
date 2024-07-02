import Chat from "./Chat";
import MessageInput from "../../shared/MessageInput";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getProjectMessages, setSelectProject } from "../../features/project/projectSlice";

const Right = () =>
{
  const [active, setActive] = useState(true);
  const dispatch = useDispatch()
  const { project, messages, success } = useSelector(state => state.project)

  const user = {}

  useEffect(() =>
  {
    if (project)
    {
      dispatch(setSelectProject(project))
    }
  }, [project])

  useEffect(() =>
  {
    if (success)
    {
      dispatch(getProjectMessages(project?.project_id))
    }
  }, [success])

  return (
    <div className="flex flex-col rounded-md relative gap-10 h-full  pt-3 pb-1">
      <div className="z-20 h-[580px] overflow-y-auto space-y-4">
        {messages?.map((message) => (
          <Chat key={message?.id} message={message} />
        ))}
      </div>
      <div className="flex items-end  justify-end absolute bottom-10 w-full px-10 z-40">
        {active && project && project?.project_name && user && user?.id ? (
          <MessageInput setActive={setActive} />
        ) : project && project?.project_name && user && user?.id ? (
          <div
            onClick={() => setActive(!active)}
            className="cursor-pointer text-white  bg-clr_alt items-end p-2 rounded-full"
          >
            <MdModeEdit size={22} />
          </div>
        ) : ""}
      </div>
    </div>
  );
};

export default Right;
