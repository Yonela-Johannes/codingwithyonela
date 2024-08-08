import { useEffect, useState } from "react";
import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";
import { getAllCategories } from "../../features/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics } from "../../features/topic/topicSlice";
import toast from "react-hot-toast";
import { createProject, getAllprojects } from "../../features/project/projectSlice";

const ProjectInput = ({ setActive }) =>
{
  const { currentUser } = useSelector((state) => state.user);
  const { loading, project, messages, success } = useSelector(state => state.project)
  const { topics } = useSelector((state) => state.topic);
  const dispatch = useDispatch();

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [github, setGithub] = useState('')
  const [live, setLive] = useState('')
  const [topic, setTopic] = useState('')

  useEffect(() =>
  {
    dispatch(getAllCategories());
  }, []);

  useEffect(() =>
  {
    dispatch(getAllTopics());
  }, []);

  useEffect(() =>
  {
    getAllprojects();
  }, []);

  useEffect(() =>
  {
    if (success)
    {
      toast("Project created successful")
      setName('')
      setDescription('')
      setGithub('')
      setLive('')
      setTopic('')
      setActive(false)
    }
  }, [success]);

  const projectHandler = () =>
  {
    if (name && description && github && live)
    {
      const data = {
        account_id: currentUser?.id,
        project_name: name,
        description,
        github,
        link: live,
        skill_id: topic
      }
      dispatch(createProject(data))
    } else
    {
      toast("Name, description,github link, live site fields required")
    }
  };

  return (
    <div className="w-full md:my-4 z-20 py-2">
      <div className="flex bg-white border w-full rounded-md border-bg_light">
        <form onSubmit={projectHandler} className="w-full space-y-2">
          <input
            className="w-full"
            placeholder="Name*"
            value={project?.project_name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Description* (min-50, max-120"
            value={project?.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="GitHub*"
            value={project?.github}
            onChange={(e) => setGithub(e.target.value)}
          />
          <input
            className="w-full"
            placeholder="Live site"
            value={project?.link}
            onChange={(e) => setLive(e.target.value)}
          />
        </form>
        {name ? (
          <button type="submit" className="border-none">
            <RiSendPlaneFill />
          </button>
        ) : (
          <div
            onClick={() => setActive(false)}
            className="flex items-center rounded-full p-1 h-8 w-8 cursor-pointer text-white  bg-clr_alt justify-center absolute top-0 right-0"
          >
            <RiCloseLine size={22} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectInput;
