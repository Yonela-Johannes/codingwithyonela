import List from "./List";
import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import ProjectInput from "../project/ProjectInput";
import { getAllprojects } from "../../features/project/projectSlice";
import { useDispatch, useSelector } from "react-redux";

const Center = () => {
  const { projects, success } = useSelector((state) => state.project);
  const user = {}
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const getProjects = () => {
    dispatch(getAllprojects())
  }

  useEffect(() => {
    getProjects()
  }, []);


  useEffect(() => {
      getProjects()
  }, [success]);

  return (
    <div className="flex flex-col relative gap-10 h-full">
      <div className="z-20 h-[580px] overflow-y-scroll">
        {projects?.map((project) => (
          <List key={project.id} project={project} />
        ))}
      </div>
      {active && user && user?.id ? (
        <div className="w-full px-5 absolute bottom-8 z-20">
          <ProjectInput setActive={setActive} />
        </div>
      ) : user && user?.id ? (
        <div
          onClick={() => setActive(!active)}
          className={`cursor-pointer text-white absolute bottom-10 right-8 bg-clr_alt items-end p-2 rounded-full z-20`}
        >
          <MdModeEdit size={22} />
        </div>
      ) : ""}
    </div>
  );
};

export default Center;
