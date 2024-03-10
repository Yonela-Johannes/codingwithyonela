import Tasks from "./Tasks";

const Left = () => {
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
    <div className="space-y-4 h-full">
      {tasks?.map((task, i) => (
        <Tasks key={i} task={task} />
      ))}
    </div>
  );
};

export default Left;
