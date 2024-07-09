import { useEffect, useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";
import { getAllCategories } from "../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics } from "../../features/topic/topicSlice";
import toast from "react-hot-toast";
import { createProject, getAllprojects } from "../../features/project/projectSlice";

const ProjectInput = ({ setActive }) => {
  const { user } = useSelector((state) => state.user);
  const { projects, success } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.categories);
  const { topics } = useSelector((state) => state.topic);
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [github, setGithub] = useState('')
  const [live, setLive] = useState('')
  const [board, setBoard] = useState('')
  const [category, setCategory] = useState('')
  const [topic, setTopic] = useState('')

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  useEffect(() => {
    getAllprojects();
  }, []);

  useEffect(() => {
    if(success){
      toast("Project created successful")
      setName('')
      setDescription('')
      setGithub('')
      setLive('')
      setBoard('')
      setCategory('')
      setTopic('')
      setActive(false)
    }
  }, [success]);

  const projectHandler = () => {
    if(name && description && github && live){
      const data = {
        account_id: user?.id,
        project_name: name,
        description,
        category_id: category,
        github,
        link: live,
        management_tool: board,
        skill_id: topic
      }
      console.log("DATA: ", data)
      dispatch(createProject(data))
    }else{
      toast("Name, description,github link, live site fields required")
    }
  };
  console.log(projects);

  return (
    <div className="w-full md:my-4 z-20 py-2">
      <div className="flex bg-white border w-full rounded-md border-bg_light">
        <div className="w-full space-y-2">
          <input
            className="w-full"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Description* (min-50, max-120"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="GitHub*"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Live site* (min-50, max-120"
            value={live}
            onChange={(e) => setLive(e.target.value)}
          />          
          <input
            className="w-full"
            placeholder="Management board"
            value={board}
            onChange={(e) => setBoard(e.target.value)}
          />
          <select onChange={(e) => setCategory(e.target.value)}>
            {categories?.map((element) => (
              <option
                key={element?.id}
                value={element?.id}
                className="flex items-center cursor-pointer gap-4 rounded-none border-none border-b border-bg_core drop-shadow-none w-full"
              >
                {element?.category}
              </option>
            ))}
          </select>
          <select onChange={(e) => setTopic(e.target.value)}>
            {topics?.map((element) => (
              <option
                key={element?.id}
                value={element?.id}
                className="flex items-center cursor-pointer gap-4 rounded-none border-none border-b border-bg_core drop-shadow-none w-full"
              >
                {element?.name}
              </option>
            ))}
          </select>
        </div>
        {name && description && github && user && live ? (
          <button onClick={projectHandler} className="border-none">
            <RiSendPlaneFill />
          </button>
        ) : (
          <div
            onClick={() => setActive(false)}
            className="flex items-center rounded-full mx-1 h-8 w-8 cursor-pointer text-white  bg-clr_alt justify-center"
          >
            <RiCloseLine size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInput;
