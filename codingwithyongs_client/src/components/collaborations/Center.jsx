import List from "./List";
import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import ProjectInput from "../project/ProjectInput";

const Center = () => {
  const [active, setActive] = useState(false);
  const tasks = [
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 20,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 40,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 100,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 100,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 100,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 100,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
    {
      title: "Front End",
      progress: "not_done",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: 100,
      category: "personal",
      stack: ["React", "Python", "Tailwind", "Flask", "Javascript"],
      description:
        "Create engaging social media content for new product launch.",
    },
  ];
  return (
    <div className="flex flex-col relative gap-10 h-full">
      <div className="hidden lg:block absolute -mt-5 p-0 m-0 top-0  w-full h-full">
        <img src={clipper} className="w-full h-full object-contain" />
      </div>
      <div className="z-20 h-[580px] overflow-y-scroll space-y-4">
        {tasks?.map((task, i) => (
          <List key={i} task={task} />
        ))}
      </div>
      {active ? (
        <div className="w-full px-5 absolute bottom-8 z-20">
          <ProjectInput setActive={setActive} />
        </div>
      ) : (
        <div
          onClick={() => setActive(!active)}
          className={`cursor-pointer text-white absolute bottom-10 right-8 bg-clr_alt items-end p-2 rounded-full`}
        >
          <MdModeEdit size={22} />
        </div>
      )}
    </div>
  );
};

export default Center;
