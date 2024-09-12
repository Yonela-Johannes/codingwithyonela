import { Hash } from "lucide-react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectProject } from "../../features/project/projectSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function ProjectList({ projects }) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeGroupHandler = (elem) => {
    if (elem && elem?.project_id) {
      dispatch(setSelectProject(elem));
      navigate(`/project/${elem?.project_id}/todo`);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      {projects?.map((project) => (
        <div key={project._id} onClick={() => activeGroupHandler(project)}>
          <div
            className={`${
              theme == "light"
                ? "bg-white text-bg_primary"
                : "bg-bg_core border-bg_core text-slate-300"
            } text-sm lg:text-base shadow flex flex-col gap-2 border p-2 lg:p-4 mb-3 cursor-pointer`}
          >
            <div className={`flex items-center mb-1 space-x-2 ${
              theme == "light"
                ? "bg-white text-bg_primary border-b-2"
                : "bg-bg_core  border-b-2 border-bg_grey"
            } py-2 `}>
              <Hash className="text-primary w-5" />
              <div className="grid grid-cols-2 justify-between items-center w-full">
                <strong>{project?.project_name}</strong>
                <div>
                  <img
                    src={project?.image}
                    alt={project?.project_name}
                    className="rounded-md object-contain h-[25px] w-[25px]"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p>
                <strong>Title:</strong> {project?.project_name}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {project?.description || "No description provided"}
              </p>
              <p>
                <strong>Status:</strong> {project?.project_status}
              </p>
              <p>
                <strong>Priority:</strong> {project?.priority}
              </p>
              <p>
                <strong>Tags:</strong> {project?.tag_name || "No tags"}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {project?.created
                  ? moment(project?.startDate).format("DD-MMM-YYYY")
                  : "Not set"}
              </p>
              <p>
                <strong>Author:</strong> {project?.firstname} {project.lastname}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
