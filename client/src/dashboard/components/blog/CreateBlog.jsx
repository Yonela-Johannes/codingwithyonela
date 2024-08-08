import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "./moduleToolbar";
import { MdCloudUpload } from "react-icons/md";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { createBlog, fetchBlogEnums } from '../../../features/blogs/blogSlice';
import { ThemeContext } from '../../../context/ThemeContext';
import Loader from '../../../shared/Loader';

const CreateBlog = () =>
{
  const { theme } = useContext(ThemeContext)
  const [imageSrc, setImageSrc] = useState(null);
  const [selection, setSelection] = useState([])
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { loading, enums } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    title: "",
    image: null,
    account: currentUser.id,
    post: "",
    category: ""
  });

  useEffect(() =>
  {
    const fetchData = () =>
    {
      dispatch(fetchBlogEnums());
    };
    fetchData();

  }, []);

  useEffect(() =>
  {
    if (enums !== '' && enums?.length)
    {
      console.log(enums)
      setSelection(enums?.replaceAll('"', '')?.replace('{', '')?.replace('}', '')?.split(','))
    }

  }, [enums]);
  console.log(selection)

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!inputData.title) return toast("Blog title is required");
    if (inputData.title.length < 4 || inputData.title.length > 200)
      return toast("Title should have a min-max of 4-200 characters");
    if (!inputData.post) return toast("Blog post is required");
    if (inputData.post.length < 300)
      return toast("Post should have a minimum of 300 characters");
    if (!inputData.image) return toast("Image is required");

    const formData = new FormData();
    formData.append("title", inputData?.title);
    formData.append("image", inputData?.image);
    formData.append("post", inputData?.post);
    formData.append("category", inputData?.category);
    formData.append("account", currentUser?.id);
    dispatch(createBlog(formData))
    setImageSrc(null);
    setInputData({});
    navigate('/blog')
  };


  return (
    loading ? (
      <Loader />
    ) : (
      <form onSubmit={handleSubmit} className=" text-black my-10 w-[300px] md:w-full md:px-8">
        <div>
          <input
            id="title"
            label="Blog title"
            name="title"
            className="bg-white mb-4"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Blog title"
            value={inputData.title}
            onChange={(e) =>
              setInputData({ ...inputData, title: e.target.value })
            }
          />
          <select onChange={(e) => setInputData({ ...inputData, category: e.target.value })}
            className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-bg_light" : "bg-bg_grey text-white"} rounded-md`}
          >
            {selection?.map((element) => (
              <option
                key={element}
                value={element}
              >
                {element}
              </option>
            ))}
          </select>
          <div>
            <ReactQuill
              theme="snow"
              className="mb-3 text-[16px] min-h-[200px]"
              placeholder={"Write the post content..."}
              modules={modules}
              value={inputData.post}
              onChange={(e) => setInputData({ ...inputData, post: e })}
            />
          </div>
          <div className="p-2">
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) =>
                acceptedFiles.map((file, index) =>
                {
                  const { type } = file;
                  if (
                    type === "image/png" ||
                    type === "image/svg" ||
                    type === "image/jpeg" ||
                    type === "image/gif" ||
                    type === "image/webp"
                  )
                  {
                    setInputData({ ...inputData, image: file });
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () =>
                    {
                      setImageSrc(reader.result);
                    };
                  }
                })
              }
            >
              {({ getRootProps, getInputProps, isDragActive }) => (
                <div {...getRootProps()} className="p-[1rem]">
                  <input name="banner" {...getInputProps()} />
                  {isDragActive ? (
                    <div className="flex flex-col text-center items-center justify-center">
                      <p className="text-center text-[13px] text-primary">
                        <MdCloudUpload size={22} />{" "}
                      </p>
                      <p className="text-center text-[13px]"> Drop here!</p>
                    </div>
                  ) : imageSrc === null ? (
                    <div className="flex flex-col text-center items-center justify-center">
                      <p className="text-center text-[13px] text-primary">
                        <MdCloudUpload size={22} />
                      </p>
                      <p className="text-center text-[13px]">
                        Drag and Drop here or click to choose
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div>
                        <img
                          className="h-[200px] w-[200px] object-cover rounded-md"
                          src={imageSrc}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <button
            className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}`}
            type='submit'>Post</button>
        </div>
      </form>
    )
  );
};

export default CreateBlog;
