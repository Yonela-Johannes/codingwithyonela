import moment from "moment";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";

const Details = ({ theme }) =>
{
  const { loading, project } = useSelector((state) => state.project);
  return (
    loading ? (
      <Loader />
    ) : (
      <div
        className={`${project?.progress == "done"
          ? "text-green-900"
          : project?.progress == "progress"
            ? "text-orange-500"
            : "text-red-900"
          } h-[140px] rounded-md align-text-top text-start relative font-bold `}
      >
        {project && project?.project_name ? (
          <div
            className="absolute top-6 z-10
    left-5 w-full"
          >
            <p className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-[14px] lg:text-lg mb-2  text-start`}>{project?.project_name}</p>
            <p className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-sm text-start`}>{project?.description}</p>
            <div className="flex gap-1 items-center mb-2">
              <p className={`${theme == "light" ? "text-cl_alt" : "text-gray-200"} text-sm text-start`}>
                {project?.firstname} {project?.lastname}
              </p>
            </div>
            <div className="flex gap-1 items-center mb-2">
              <p className={`${theme == "light" ? "text-cl_alt" : "text-gray-200"} text-sm text-start`}>
                {moment(project?.start_date).format("MMMM Do YYYY")}
              </p>
            </div>
            <p className={`${theme == "light" ? "text-bg_primary" : "text-bg_lighter"}`}>
              {project?.project_status}
            </p>
            <p className={`${theme != "light" ? "text-cl_primary_alt" : "text-clr_alt"}`}>
              <a href={project.link} target="_blank" className="text-xs font-semibold">
                {project?.link}
              </a>
            </p>
            <p className={`${theme != "light" ? "text-cl_primary_alt" : "text-clr_alt"}`}>
              <a href={project.github} target="_blank" className="text-xs font-semibold">
                {project?.github}
              </a>
            </p>
            <img src={project?.image} className="w-full h-full object-contain object-center" />
          </div>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default Details;
