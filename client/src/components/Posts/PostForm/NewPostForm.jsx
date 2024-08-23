import React, { useEffect, useRef, useState } from "react";
import { IoDocumentText } from "react-icons/io5";
import TabItem from "./TabItem";
import ImageUpload from "./ImageUpload";
import { FaImage, FaLightbulb, FaPollH, FaQuestion } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../features/post/postSlice";
import Loader from "../../../shared/Loader";

const formTabs = [
  {
    title: "Post",
    icon: <IoDocumentText size={18} />,
  },
  {
    title: "Question",
    icon: <FaQuestion size={18} />,
  },
  {
    title: "Suggestion",
    icon: <FaLightbulb size={18} />,
  },
  {
    title: "Image / Video",
    icon: <FaImage size={18} />,
  },
  {
    title: "Poll",
    icon: <FaPollH size={18} />,
  }
];


const NewPostForm = () =>
{
  const { currentUser } = useSelector((state) => state.user)
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);

  const [post, setPost] = useState('')
  const [type, setType] = useState('')
  const [question, setQuestion] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [poll, setPoll] = useState('')
  const [answers, setAnswers] = useState({
    answer_one: "",
    answer_two: "",
    answer_three: "",
  })
  const [selectedFile, setSelectedFile] = useState();
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const selectFileRef = useRef(null);
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false);

  const handleCreatePost = async () =>
  {
    setLoading(true);
    if (selectedFile || post || question || poll || suggestion && type || image)
    {
      const formData = new FormData();
      formData.append('account', currentUser?.account_id);
      formData.append('text', text);
      formData.append('image', image);
      formData.append('type', type);
      if (type == "Poll" && answers)
      {
        formData.append('answer_one', answers.answer_one)
        formData.append('answer_two', answers.answer_two)
        formData.append('answer_three', answers.answer_three)
      }
      dispatch(createPost(formData))
      // Empty fields
      setSelectedFile('')
      setText('')
      setPost('')
      setQuestion('')
      setPoll('')
      setSuggestion('')
      setType('')
    } else
    {
      toast('Enter any post field')
    }
    setLoading(false)
  };

  const onSelectImage = (event) =>
  {
    const reader = new FileReader();
    if (event.target.files?.[0])
    {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) =>
    {
      if (readerEvent.target?.result)
      {
        setImage(event.target.files[0])
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  useEffect(() =>
  {
    if (post || question || suggestion || poll || image)
    {
      setType(type)
      if (type == 'Post')
      {
        setText(post)
      } else if (type == 'Question')
      {
        setText(question)
      } else if (type == 'Suggestion')
      {
        setText(suggestion)
      } else if (type == 'Poll')
      {
        setText(poll)
      }
    }

  }, [post, question, suggestion, poll])

  useEffect(() =>
  {
    if (selectedTab)
    {
      setType(selectedTab)
    }
  }, [selectedTab])

  const handleChange = (e) =>
  {
    const newData = {
      ...answers,
      [e.target.name]: e.target.value
    }
    setAnswers(newData)
  }

  console.log(answers)

  return (
    loading ?
      <div className="w-full">
        <Loader />
      </div>
      : (
        <div
          className="flex flex-col"
        >
          <div className="flex">
            {formTabs.map((item, index) => (
              <TabItem
                key={index}
                item={item}
                setSelectedTab={setSelectedTab}
              />
            ))}
          </div>
          <div className="p-2">
            {selectedTab === "Post" && (
              <div className="w-full">
                <div className="w-full">
                  <textarea
                    placeholder="Share something..."
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                  />
                </div>
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  setSelectedTab={setSelectedTab}
                  selectFileRef={selectFileRef}
                  onSelectImage={onSelectImage}
                />
                <div className="flex items-end justify-end">
                  <button onClick={handleCreatePost} className="p-2 lg:px-4 lg:py-2">Post</button>
                </div>
              </div>
            )}
            {selectedTab === "Question" && (
              <div className="w-full">
                <div className="w-full">
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  setSelectedTab={setSelectedTab}
                  selectFileRef={selectFileRef}
                  onSelectImage={onSelectImage}
                />
                <div className="flex items-end justify-end">
                  <button onClick={handleCreatePost} className="p-2 lg:px-4 lg:py-2">Create</button>
                </div>
              </div>
            )}
            {selectedTab === "Suggestion" && (
              <div className="w-full">
                <div className="w-full">
                  <textarea
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Enter your suggestion"
                  />
                </div>
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  setSelectedTab={setSelectedTab}
                  selectFileRef={selectFileRef}
                  onSelectImage={onSelectImage}
                />
                <div className="flex items-end justify-end">
                  <button onClick={handleCreatePost} className="p-2 lg:px-4 lg:py-2">Create</button>
                </div>
              </div>
            )}
            {selectedTab === "Image / Video" && (
              <div className="w-full">
                <ImageUpload
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  setSelectedTab={setSelectedTab}
                  selectFileRef={selectFileRef}
                  onSelectImage={onSelectImage}
                />
                <div className="flex items-end justify-end">
                  <button onClick={handleCreatePost} className="p-2 lg:px-4 lg:py-2">Post</button>
                </div>
              </div>)}
            {selectedTab === "Poll" && (
              <div className="w-full">
                <textarea
                  value={poll}
                  onChange={(e) => setPoll(e.target.value)}
                  placeholder="Enter poll question"
                  className="border-b border-bg_lighter"
                />
                <div className="mb-2">
                  <input
                    name="answer_one"
                    value={answers.answer_one}
                    onChange={handleChange}
                    placeholder="Option 1 (*answer 1)"
                  />
                  <input
                    name="answer_two"
                    value={answers.answer_two}
                    onChange={handleChange}
                    placeholder="Option 2 (*answer 2)"
                  />
                  <input
                    name="answer_three"
                    value={answers.answer_three}
                    onChange={handleChange}
                    placeholder="Option 3 (*answer 3) or other"
                  />
                </div>
                <div className="flex items-end justify-end">
                  <button onClick={handleCreatePost} className="p-2 lg:px-4 lg:py-2">Create</button>
                </div>
              </div>)}
          </div>
        </div>
      )
  );
};
export default NewPostForm;
