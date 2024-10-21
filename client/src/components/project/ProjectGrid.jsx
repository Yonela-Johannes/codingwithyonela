import { Hash } from "lucide-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setSelectProject } from "../../features/project/projectSlice";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import Loader from "../../shared/Loader";

export default function ProjectGrid({ projects })
{
    const { loading } = useSelector(
        (state) => state.project
    );
    const { theme } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const activeGroupHandler = (elem) =>
    {
        if (elem && elem?.project_id)
        {
            dispatch(setSelectProject(elem));
            navigate(`/project/${elem?.project_id}/todo`);
        }
    };

    return (
        loading ? (
            <Loader />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects?.map((project) => (
                    <div key={project._id} onClick={() => activeGroupHandler(project)}>
                        <div
                            className={`${theme == "light"
                                ? "bg-white text-bg_primary"
                                : "bg-bg_core border-bg_core text-slate-300"
                                } h-full text-sm lg:text-base flex flex-col gap-2 p-2 lg:p-4 cursor-pointer  border border-cl_primary shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c] space-y-4 mx-auto mb-8 px-5`}
                        >
                            <div className={`hidden lg:flex items-center mb-1 space-x-2 ${theme == "light"
                                ? "bg-white text-bg_primary border-b-2"
                                : "bg-bg_core  border-b-2 border-bg_grey"
                                } py-2 `}>
                                <Hash className="text-primary w-5" />
                                <div className="grid grid-cols-2 justify-between items-center w-full">
                                    <strong>{project?.project_name}</strong>
                                </div>
                            </div>
                            <div className="grid grid-cols-1  h-full w-full">
                                <div className="flex items-center justify-center w-full h-full">
                                    <img
                                        src={project?.image}
                                        alt={project?.project_name}
                                        className="rounded-md object-contain h-full"
                                    />
                                </div>
                                <div className="space-y-1 flex-grow">
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
                                        <strong>Tags:</strong> {project?.tags?.replaceAll(',', " | ") || "No tags"}
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
                                        <strong>Author:</strong> {project?.firstname} {project.lastname}
                                    </p>
                                    <p>
                                        <strong>Manager:</strong> {project?.manager}
                                    </p>
                                    <p>
                                        <strong>Team:</strong> {project?.team?.replaceAll(',', " | ") || 'No members'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
}
