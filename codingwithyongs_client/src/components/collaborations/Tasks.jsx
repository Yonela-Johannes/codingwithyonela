import React from "react";
import clipper from "../../assets/old-parchment-paper-scroll-sheet-vintage-aged-or-texture-background-png.webp";
import moment from 'moment'
const Tasks = ({ task }) => {
  return (
    <div
      className={`${
        task?.progress == "done"
          ? "text-green-900"
          : task?.progress == "progress"
          ? "text-orange-500"
          : "text-red-900"
      } h-[140px] rounded-md align-text-top text-start relative font-bold `}
    >
      <img src={clipper} className="w-full h-full object-cover hidden lg:block" />
      <div className="absolute top-6 z-10
      left-10 pr-5">
        <p className="text-base text-black">{task?.title}</p>
        <p className="text-sm">{task?.description}</p>
        <p className="text-xs font-semibold text-black">{task?.host?.name}</p>
        <div className="flex gap-1 items-center text-end justify-end">
          <p className="text-xs font-semibold text-bg_core">
            {moment(task?.start_date).format('MMMM Do YYYY')}
          </p>{" "}
          -
          <p className="text-xs font-semibold text-bg_core">{moment(task?.end_date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
