import Chat from "./Chat";
import MessageInput from "../../shared/MessageInput";
import { useEffect, useState } from "react";
import { MdAdd, MdModeEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { disableMessageUpdate, getProjectMessages, setSelectProject } from "../../features/project/projectSlice";
import Loader from "../../shared/Loader";

const Right = () =>
{
  const [active, setActive] = useState(false);
  const dispatch = useDispatch()
  const { loading, project, messages, success } = useSelector(state => state.project)
  const { currentUser } = useSelector((state) => state.user);

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
      dispatch(disableMessageUpdate())
    }
  }, [success])

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="flex flex-col rounded-md relative gap-10 h-full  pt-3 pb-1">
        <div className="z-20 h-[580px] overflow-y-auto space-y-4">
          {messages?.map((message) => (
            <Chat key={message?.id} message={message} />
          ))}
        </div>
        <div className="flex items-end  justify-end absolute top-1 w-full px-10 z-40">
          {active && project?.id && currentUser?.id == project?.account_id
            ? (
              <MessageInput setActive={setActive} />
            ) : project && currentUser && currentUser?.is_admin || currentUser?.id == project?.account_id ? (
              <div
                onClick={() => setActive(!active)}
                className="cursor-pointer text-white  bg-clr_alt items-end p-2 rounded-full"
              >
                <MdAdd size={22} />
              </div>
            ) : ""}
        </div>
      </div>

    )
  );
};

export default Right;