import React, { useEffect, useState } from "react";
import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";
import moment from "moment";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";

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
            <p className="text-xs font-semibold text-black">
              {project?.username} {project?.lastname}
            </p>
            <div className="flex gap-1 items-center mb-2">
              <p className={`${theme == "light" ? "text-cl_alt" : "text-gray-200"} text-sm text-start`}>
                {moment(project?.start_date).format("MMMM Do YYYY")}
              </p>
            </div>
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
