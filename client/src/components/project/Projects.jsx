import { Hash } from "lucide-react";
import moment from "moment";
import { Link } from "react-router-dom";

export default function ProjectList({ projects }) {
  console.log(projects);
  return (
    <div className="flex flex-col gap-1">
      {projects?.map((project) => {
        return (
          <Link key={project._id} href={`/loggedin/projects/${project._id}`}>
            <div className="text-sm lg:text-base mb-3 bg-white shadow  dark:text-white">
              <div className="flex items-center mb-1 space-x-2 border-b-2 py-2 border-gray-100">
                <Hash className="text-primary w-5" />
                <div className="flex justify-between items-center w-full">
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
                  <strong>Status:</strong> {project?.status}
                </p>
                <p>
                  <strong>Priority:</strong> {project?.priority}
                </p>
                <p>
                  <strong>Tags:</strong> {project?.tags || "No tags"}
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  {project?.created
                    ? moment(project?.startDate).format("DD-MMM-YYYY")
                    : "Not set"}
                </p>
                <p>
                  <strong>Author:</strong> {project?.firstname}{" "}
                  {project.lastname}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
