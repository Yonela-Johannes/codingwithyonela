import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { PiHeartDuotone } from "react-icons/pi";
import { cn } from "../lib/utils";
import AddComment from "./projects/AddComment";
import {
  disableMessageUpdate,
  getProjectFeedback,
} from "../features/project/projectSlice";
import Comment from "./projects/Comment";

export default function Project() {
  const { theme } = useContext(ThemeContext);
  const { currentUser } = useSelector((state) => state.user)
  const { projects, feedback, create_project_feedback } = useSelector(
    (state) => state.project
  );
  const [project, setProject] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id && projects?.length) {
      const findProject = projects?.find((element) => element.project_id == id);
      setProject(findProject);
    }
  }, [id, projects]);

  const fetchProjectFeedback = () => {
    dispatch(getProjectFeedback(id));
    dispatch(disableMessageUpdate());
  };

  useEffect(() => {
    if (projects.length && id) {
      fetchProjectFeedback();
    }
  }, [id, projects]);

  useEffect(() => {
    if (create_project_feedback && id) {
      fetchProjectFeedback();
    }
  }, [create_project_feedback]);

  return (
    <div className="flex flex-col gap-1">
      <div className="">
        <div
          className={`${
            theme == "light"
              ? "bg-white text-bg_primary"
              : "bg-bg_core border-bg_core text-slate-300"
          } text-sm lg:text-base shadow flex flex-col gap-2 border p-2 lg:p-4 mb-3`}
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex items-start mb-1 w-full space-x-2 ${
                theme == "light"
                  ? "bg-white text-bg_primary border-b-2"
                  : "bg-bg_core  border-b-2 border-bg_grey"
              } py-2 `}
            >
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
          <h3 className={`{${theme == 'light' ? 'text-bg_grey' : 'text-bg_lighter'} lg:text-md my-5`}>
            About this project
          </h3>
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
              <strong>Development stack:</strong>{" "}
              {project?.tags?.replaceAll(",", " | ") || "No tags"}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {project?.created
                ? moment(project?.created).format("DD-MMM-YYYY")
                : "Not set"}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {project?.due_date
                ? moment(project?.due_date).format("DD-MMM-YYYY")
                : "Not set"}
            </p>
            <p>
              <strong>Author:</strong> {project?.firstname} {project?.lastname}
            </p>
            <p>
              <strong>Manager:</strong> {project?.manager}
            </p>
            <p>
              <strong>Team:</strong>{" "}
              {project?.team?.replaceAll(",", " | ") || "No members"}
            </p>
            <p>
              <strong>Features:</strong>{" "}
              {project?.features?.replaceAll(",", " | ") || "No members"}
            </p>
          </div>
          <div className="">
            <h3 className={`{${theme == 'light' ? '' : ''} lg:text-md my-5 `}>
              Created by
            </h3>
            <div className="flex gap-4">
              <div>
                <div className="bg-clr_alt h-10 w-10 flex items-center justify-center rounded-full relative">
                  <img
                    src={project?.profile}
                    alt="profile"
                    height={120}
                    width={120}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                  <h4 className="font-medium lg:text-md">
                    {project?.firstname} {project?.lastname}
                  </h4>
                  <span className="text-[#74767e]">@{project?.username}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentUser?. id ? (<AddComment project={project} theme={theme} />): <p className={`{${theme == 'light' ? '' : ''} lg:text-md my-2`}>Login in to comment</p>}
      
      <h3 className={`{${theme == 'light' ? '' : ''} lg:text-md my-2 font-semibold`}>Comments</h3>
      {feedback?.length
        ? feedback?.map((comment) => <Comment comment={comment} />)
        :  <p className={`{${theme == 'light' ? '' : ''} lg:text-md my-2`}>Be the first to share your views</p>}
    </div>
  );
}
