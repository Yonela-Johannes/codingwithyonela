import List from "./List";
import clipper from "../../assets/png-transparent-paper-scroll-paper-miscellaneous-presentation-parchment-thumbnail.png";


const Center = () => {
  
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
      status: "",
      category: "personal",
      description: "Create engaging social media content for new product launch."

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
      status: "",
      category: "personal",
      description: "Create engaging social media content for new product launch."

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
      status: "",
      category: "personal",
      description: "Create engaging social media content for new product launch."

    },
    {
      title: "Front End",
      progress: "progress",
      start_date: Date.now(),
      end_date: Date.now(),
      host: {
        name: "Yonela Johannes",
        image: "",
      },
      status: "",
      category: "personal",
      description: "Create engaging social media content for new product launch."
    },
    
  ];
  return (
    <div className="flex flex-col relative gap-10 h-full">
    <div className="absolute -mt-5 p-0 m-0 top-0  w-full h-full">

        <img src={clipper} className="w-full h-full object-contain" />
    </div>
      {tasks?.map((task, i) => (
        <List key={i} task={task} />
      ))}
    </div>
  );
};

export default Center;
