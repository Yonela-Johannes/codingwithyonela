import React, { useEffect, useState } from "react";
import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";
import moment from "moment";
import { useSelector } from "react-redux";
const Details = () => {
  const { project } = useSelector((state) => state.project);

  return (
    <div
      className={`${
        project?.progress == "done"
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
          <p className="text-base text-black">{project?.project_name}</p>
          <p className="text-sm">{project?.description}</p>
          <p className="text-xs font-semibold text-black">
          {project?.username} {project?.lastname}
        </p>
          <div className="flex gap-1 items-center">
            <p className="text-xs font-semibold text-bg_core">
              {moment(project?.start_date).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Details;
