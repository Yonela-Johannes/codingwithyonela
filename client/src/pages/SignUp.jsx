import { Alert, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeSignin, disableAuthModals, register } from "../features/user/authSlice";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { MdClose } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import { useRef } from "react";
import { motion } from "framer-motion";
import { AiTwotoneMail } from "react-icons/ai";
import { IoIosUnlock } from "react-icons/io";
import {
  PiUserCircleDashedDuotone,
  PiUserCircleDuotone,
  PiEyeDuotone,
} from "react-icons/pi";

export default function SignUp() {
  const [selectedFile, setSelectedFile] = useState();
  const selectFileRef = useRef(null);
  const { message, loading, signup_success } = useSelector(
    (state) => state.user
  );
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.firstname ||
      !formData.lastname ||
      !profile
    )
      return toast("Missing information");
    const newFormData = new FormData();
    newFormData.append("username", formData.username);
    newFormData.append("firstname", formData.firstname);
    newFormData.append("lastname", formData.lastname);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("profile", profile);
    dispatch(register(newFormData));
  };

  useEffect(() => {
    if (signup_success) {
      toast("Check you email for verification link");
      dispatch(disableAuthModals());
      navigate("/");
    }
  }, [message, signup_success]);

  useEffect(() => {
    if (message) {
      toast(message);
    }
  }, [message, signup_success]);

  const onSelectImage = (event) => {
    setProfile(event.target.files[0]);
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${
        theme == "light" ? "" : "border-none"
      } flex flex-col lg:flex-row items-center justify-center lg:items-center lg:absolute h-screen lg:h-sceen w-full lg:z-50 backdrop-blur-xl overflow-auto top-0 left-0 right-0 bottom-0`}
    >
      <div
        className={`${
          theme == "light" ? "bg-white" : "bg-bg_card border-none"
        } w-full lg:relative flex lg:px-16 mx-auto flex-col md:flex-row md:items-center gap-5 lg:border lg:h-[80%] overflow-auto py-10 lg:rounded-lg lg:w-[600px]`}
      >
        <div className="flex-1">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div
              className={`${
                theme == "light" ? "bg-white" : "bg-slate-800 text-white"
              } rounded-full hidden lg:block lg:absolute items-center top-2 lg:right-2 text-xl lg:text-2xl cursor-pointer`}
              onClick={() => dispatch(disableAuthModals())}
            >
              <MdClose />
            </div>
            <p className="text-lg lg:text-xl text-center">Register new account</p>
            <div>
              <div className="relative flex flex-col justify-between items-center">
                {selectedFile ? (
                  <>
                    <img
                      className="w-full max-h-[100px] max-w-[100px] object-cover rounded-full"
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
                  <div className="flex flex-col w-full rounded-md items-center justify-center cursor-pointer">
                    <div
                      className={`text-xl lg:text-4xl  ${
                        theme == "light" ? "text-black" : "bg-bg_card"
                      }`}
                      onClick={() => selectFileRef.current?.click()}
                    >
                      <p
                        value="email"
                        className={`text-base ${
                          theme == "light"
                            ? "text-black"
                            : "bg-bg_card text-white"
                        }`}
                      >
                        Avatar
                      </p>
                      <PiUserCircleDuotone />
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                      className={`w-full px-3 border ${
                        theme == "light"
                          ? "text-black bg-gray-200"
                          : "bg-bg_card text-white"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label
                value="email"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Email
              </label>

              <div
                className={`flex items-center w-full border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
              >
                <AiTwotoneMail size={24} />
                <input
                  className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  }`}
                  value={formData?.email}
                  type="email"
                  name="email"
                  placeholder="your.name@example.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                value="Username"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Username
              </label>
              <div
                className={`flex items-center w-full border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
              >
                <PiUserCircleDashedDuotone size={24} />
                <input
                  className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  }`}
                  type="text"
                  value={formData.username}
                  placeholder="your username"
                  name="username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                value="firstname"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                First name
              </label>
              <div
                className={`flex items-center w-full border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
              >
                <PiUserCircleDuotone size={24} />
                <input
                  className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  }`}
                  type="text"
                  value={formData.firstname}
                  placeholder="your firstname"
                  name="firstname"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                value="lastname"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Last name
              </label>
              <div
                className={`flex items-center w-full border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
              >
                <PiUserCircleDuotone size={24} />
                <input
                  className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  }`}
                  value={formData.lastname}
                  placeholder="your username"
                  name="lastname"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                value="Your password"
                className={`${
                  theme == "light" ? "text-black" : "bg-bg_card text-white"
                }`}
              >
                Password
              </label>
              <div
                className={`flex items-center w-full border ${
                  theme == "light"
                    ? "text-black bg-gray-200"
                    : "bg-bg_card text-white"
                }`}
              >
                <IoIosUnlock size={24} />
                <input
                  className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_card text-white"
                  }`}
                  value={formData.password}
                  type={passwordType}
                  placeholder="Password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
                <div
                  onClick={() =>
                    setPasswordType((currenState) =>
                      currenState == "password" ? "text" : "password"
                    )
                  }
                  className="px-1 lg:px-2 cursor-pointer h-full"
                >
                  <PiEyeDuotone size={22} />
                </div>
              </div>
            </div>
            <div onClick={() => (dispatch(disableAuthModals()), dispatch(activeSignin()))} className="my-1 lg:my-2 text-[#646464] text-sm">
              Already have an account? <b>Login</b>
            </div>
            <p className="my-1 lg:my-2 text-[#646464] text-sm">
              By clicking “Sign up with CodingWithYonela” you agree <br /> to
              the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
            </p>
            <button
              className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${
                theme == "light" ? "bg-clr_alt" : "bg-clr_alt"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>
          {message && (
            <Alert className="mt-5" color="failure">
              {message}
            </Alert>
          )}
        </div>
      </div>
    </motion.div>
  );
}
