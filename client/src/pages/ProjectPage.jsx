import { Hash } from "lucide-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import {
  disableMessageUpdate,
  getAllprojects,
} from "../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import { PiHeartDuotone } from "react-icons/pi";
import { cn } from "../lib/utils";

export default function ProjectPage() {
  const { theme } = useContext(ThemeContext);
  const { projects, success, updated, deleted } = useSelector(
    (state) => state.project
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getProjects = () => {
    dispatch(getAllprojects());
    dispatch(disableMessageUpdate());
  };

  useEffect(() => {
    getProjects();
  }, []);

  const isLiked = "";
  return (
    <div className="grid lg:grid-cols-3 gap-2 lg:gap-4 lg:w-xl ">
      {projects?.map((project) => (
        <div
          key={project?.id}
          onClick={() => navigate(`/projects/${project?.project_id}`)}
          className={`${
            theme == "light"
              ? "bg-bg_lightest text-bg_primary hover:bg-white"
              : "bg-bg_core border-bg_core text-bg_lightest hover:bg-bg_gray"
          } text-sm lg:text-base shadow flex flex-col gap-2 border p-2 lg:p-4 mb-3 cursor-pointer hover:shadow-lg duration-300`}
        >
          <div
            className={`flex flex-1 items-start justify-between${
              theme == "light"
                ? "bg-white text-bg_primary border-b-2"
                : "bg-bg_core  border-b-2 border-bg_grey"
            }`}
          >
            <div className={`flex items-start mb-1 space-x-2 py-2 `}>
              <div className="bg-clr_alt h-20 w-20 flex items-center justify-center rounded-full relative">
                <div className="aspect-square w-full h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={project?.image}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="">
                <h2 className="text-2xl mb-1">{project?.project_name}</h2>
                <p>{project?.description || "No description provided"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <p>
              <strong>Priority:</strong> {project?.priority}
            </p>
            <p>
              <strong>Development stack:</strong>{" "}
              {project?.tags?.replaceAll(",", " | ") || "No tags"}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {project?.due_date
                ? moment(project?.due_date).format("DD-MMM-YYYY")
                : "Not set"}
            </p>
            <p>
              <strong>Manager:</strong> {project?.manager}
            </p>
            <p>
              <strong>Team:</strong>{" "}
              {project?.team?.replaceAll(",", " | ") || "No members"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
