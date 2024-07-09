import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import toast, { Toaster } from "react-hot-toast";
import Dropzone from "react-dropzone";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules } from "./moduleToolbar";
import { MdCloudUpload } from "react-icons/md";
// import { createBlog } from "../../app/features/blogs/blogsSlice";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';

const CreateBlog = () =>
{
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const [imageSrc, setImageSrc] = useState(null);
  const navigate = useNavigate();
  //   const { _id } = useSelector((state) => state.auth);
  //   const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    errors: "",
    userId: "",
    title: "",
    message: "",
    image: null,
  });

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!inputData.title) return toast("Blog title is required");
    if (inputData.title.length < 4)
      return toast("Title should have a minimum of 4 characters");
    // if (!_id)
    //   return toast("Something went wrong: user details missing!");
    if (!inputData.message) return toast("Blog post is required");
    if (!inputData.image) return toast("Image is required");

    setLoading(true);
    console.log(inputData.image);
    const formData = new FormData();
    if (inputData?.image)
    {
      formData.append("file", inputData?.image);
      formData.append("upload_preset", "nomiupload");
      await axios.post(
        "https://api.cloudinary.com/v1_1/globalnomi/image/upload",
        formData
      );
      // .then((res) =>
      //   dispatch(
      //     createBlog({
      //       ...inputData,
      //       userId: _id,
      //       image: res?.data.url,
      //     })
      //   )
      // )
      // .catch(error => {
      //   console.log(error)
      //   toast("Error creating blog post")
      //   setLoading(false)
      // })
    } else
    {
      toast("Something went wrong!");
      setLoading(false);
    }
    setLoading(false);
    setImageSrc(null);
    setInputData({});
    navigate("/blogs");
  };

  return (
    <>
      <Toaster />
      {loading ? (
        <FallingLines
          color="#5A2E98"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      ) : (
        <div className="bg-white text-black my-20 w-[300px] md:w-full md:px-8">
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
            <select name="suggestion-categories">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <div>
              <ReactQuill
                theme="snow"
                className="mb-3 text-[16px]"
                placeholder={"Write the post content..."}
                modules={modules}
                value={inputData.message}
                onChange={(e) => setInputData({ ...inputData, message: e })}
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
                      console.log(typeof inputData.image);
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
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBlog;
