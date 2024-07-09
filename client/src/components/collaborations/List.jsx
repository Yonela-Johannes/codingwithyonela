import moment from "moment";
import HoverUnderLine from "../HoverUnderLine";
import { getProjectMessages, setSelectProject } from "../../features/project/projectSlice";
import { useDispatch } from "react-redux";

const List = ({ project }) =>
{
  const dispatch = useDispatch()

  const activeGroupHandler = () =>
  {
    if (project && project?.project_id)
    {
      dispatch(getProjectMessages(project?.project_id))
      dispatch(setSelectProject(project))
    }
  }
  console.log(project)
  return (
    <div
      className={`${project?.progress == "done"
        ? "text-green-900"
        : project?.progress == "progress"
          ? "text-orange-500"
          : "text-red-900"
        } w-full h-[90px] rounded-md align-text-top text-start relative font-bold `}
    >
      <div
        className="absolute top-6 z-10
      px-7 w-full"
      >
        <HoverUnderLine>
          <div className={`bg-clr_alt w-[${project.progress}%] h-2 rounded-md`}>

          </div>
          <p
            onClick={() => activeGroupHandler()}
            className="text-base text-black"
          >
            {project?.project_name}
          </p>
        </HoverUnderLine>
        <p className="text-sm">{project?.description?.slice(0, 100)}...</p>
      </div>
    </div>
  );
};

export default List;
