import { useContext, useEffect, useRef } from 'react';
import { useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../features/project/projectSlice';
import { MdClose } from "react-icons/md";
import { getAllTopics } from '../../features/topic/topicSlice';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { BsCardImage } from "react-icons/bs";
import StackInput from '../notes/Input/StackInput';
import TeamInput from '../notes/Input/TeamInput';

const CreateProject = () =>
{
  const { loading } = useSelector((state) => state.project);
  const { topics } = useSelector((state) => state.topic);
  const { currentUser } = useSelector((state) => state.user)
  const [team, setTeam] = useState([]);
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState();
  const [image, setImage] = useState(null)
  const { theme } = useContext(ThemeContext)
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [inputData, setInputData] = useState({
    account_id: currentUser?.id,
    image: '',
    project_name: '',
    description: '',
    github: '',
    link: '',
    manager: '',
    due_date: '',
    tags: [],
    team: []
  })

  const handleSubmit = async (e) =>
  {
    e.preventDefault()
    if(!image) return toast('Select project image')
    if(!inputData?.project_name) return toast('Enter project name')
    if(!inputData?.description) return toast('Enter project description')
    if(!inputData?.github) return toast('Enter Github repository')
    if(!inputData?.link) return toast('Enter project live link')
    if(!inputData?.manager) return toast('Enter project manager')
    if(!inputData?.due_date) return toast('Enter project due date')
    if(!inputData?.tags.length < 1) return toast('Select atleast 1 tag')

    const formData = new FormData();
    formData.append('image', image);
    formData.append('account_id', inputData.account_id);
    formData.append('project_name', inputData.project_name);
    formData.append('description', inputData.description);
    formData.append('github', inputData.github);
    formData.append('link', inputData.link);
    formData.append('tags', tags);
    formData.append('team', team);
    formData.append('manager', inputData.manager);
    formData.append('due_date', inputData.due_date);

    dispatch(createProject(formData));
    setInputData({
      image: '',
      account_id: '',
      project_name: '',
      description: '',
      user_ids: '',
      github: '',
      link: '',
      progress: '',
      priority: '',
      project_status: ''
    })
    navigate('/project-status')
  }

  const handleChange = (e) =>
  {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const onSelectImage = (event) =>
  {
    setImage(event.target.files[0])
    const reader = new FileReader();
    if (event.target.files?.[0])
    {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) =>
    {
      if (readerEvent.target?.result)
      {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  useEffect(() =>
  {
    dispatch(getAllTopics());
  }, []);

  return (
    <div
      className={`${theme == 'light' ? '' : 'border-none'}  w-full h-full flex justify-center 
    transform transition-transform duration-300 ove`}
    >
      <div
        className="
        rounded-sm w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div
            className="relative flex flex-col justify-between items-center"
          >
            {selectedFile ? (
              <>
                <img
                  className="w-[80px] h-[80px] object-covermb-2"
                  src={selectedFile}
                />
                <div className="absolute flex gap-3 top-1 right-1 bg-clr_alt rounded-full border-bg_grey">
                  <button
                    className="p-2 rounded-full text-lg lg:text-xl"
                    onClick={() => setSelectedFile("")}
                  >
                    <MdClose />
                  </button>
                </div>
              </>
            ) : (
              <div
                className="flex flex-col w-full rounded-md justify-center items-center cursor-pointer my-4"
              >
                <div
                  className={`text-xl lg:text-4xl px-3 py-2 mt-1 ${theme == "light" ? "text-black" : "bg-bg_card"} p-2 lg:px-4 lg:py-2`}
                  onClick={() => selectFileRef.current?.click()}
                >
                  <BsCardImage />
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/x-png,image/gif,image/jpeg"
                  hidden
                  ref={selectFileRef}
                  onChange={onSelectImage}
                  className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                />
              </div>
            )
            }
          </div>
          <div
            className="flex justify-between items-center"
          >
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="text"
              id="manager"
              value={inputData?.manager}
              name="name"
              placeholder="Manager"
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center"
          >
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="text"
              id="project_name"
              value={inputData?.project_name}
              name="name"
              placeholder="Project name"
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center"
          >
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="text"
              id="link"
              value={inputData.link}
              name="Repo"
              placeholder="Project live link"
              onChange={handleChange}
            />
          </div>
          <div
            className="flex justify-between items-center"
          >
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="text"
              id="github"
              value={inputData.github}
              name="Repo"
              placeholder="Github repo"
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="flex justify-between items-center"
          >
            <input
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="date"
              id="due_date"
              value={inputData.due_date}
              name="Repo"
              placeholder="Github repo"
              onChange={handleChange}
              required
            />
          </div>

          <div
            className="flex justify-between items-center"
          >
            <textarea
              className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
              type="text"
              value={inputData.description}
              id='description'
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <TeamInput team={team} setTeam={setTeam} />
          <select id="tag" onChange={(e) => setTag(e.target.value)}
            className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-none`}
          >
            {topics?.length ? topics?.map((element) => (
              <>
                <option value="" disabled selected hidden>Select stack</option>
                <option
                  key={element?.id}
                  value={element?.name}

                >
                  {element?.name}
                </option>
              </>
            )) : ""}
          </select>
            <StackInput tags={tags} setTags={setTags} stack={tag} />
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-none px-3 py-2 mt-1 border ${theme == "light" ? "text-white bg-bg_lighter" : "bg-bg_grey text-white"} inline-block px-6 py-2.5 font-medium text-md leading-tight mt-5`}
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Add Project'
            )}
          </button>
        </form>
      </div>
    </div >
  )
}

export default CreateProject
