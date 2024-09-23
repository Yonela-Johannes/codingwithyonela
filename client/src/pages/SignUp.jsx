import { Alert, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import {
  activeSignin,
  disableAuthModals,
  register,
} from "../features/user/authSlice";
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
  PiEyeSlashDuotone,
} from "react-icons/pi";
import { inputClassName, labelClassName } from "../utils/utils";

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
      !formData.email ||
      !formData.password ||
      !formData.firstname ||
      !formData.lastname ||
      !profile
    )
      return toast("Missing information");
    const newFormData = new FormData();
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
    <div
      className={`${
        theme == "light" ? "bg-bg_lightest" : "border-none bg-bg_core"
      } flex flex-col items-center justify-center lg:items-center absolute h-screen lg:h-sceen w-full lg:z-50 overflow-hidden top-0 left-0 right-0 bottom-0`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${
          theme == "light" ? "bg-bg_lightest" : "border-none bg-bg_core"
        } flex flex-col items-center justify-center lg:items-center absolute h-full w-full lg:mt-20 px-4`}
      >
        <div
          className={`${
            theme == "light" ? "bg-white" : "bg-bg_core border-none"
          } w-full lg:relative flex lg:px-16 mx-auto flex-col md:flex-row md:items-center gap-5 lg:border lg:h-[80%] overflow-auto py-10 lg:w-[600px] px-4 rounded-md`}
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
                } rounded-full hidden lg:block lg:absolute top-2 lg:right-2 text-xl lg:text-2xl cursor-pointer`}
                onClick={() => dispatch(disableAuthModals())}
              >
                <MdClose />
              </div>
              <p
                className={`${theme == "light" ? "bg-white" : "text-white"}
                text-lg lg:text-xl text-center`}
              >
                Register new account
              </p>
              <div>
                <div className="relative flex flex-col justify-between items-center">
                  {selectedFile ? (
                    <>
                      <img
                        className="w-full max-h-[100px] max-w-[100px] object-cover rounded-full"
                        src={selectedFile}
                      />
                      <div
                        className={`${
                          theme == "light" ? "" : "text-white border-bg_grey"
                        } absolute flex gap-3 top-1 right-1 `}
                      >
                        <button
                          className="p-2 rounded-full text-lg lg:text-xl"
                          onClick={() => setSelectedFile("")}
                        >
                          <RiDeleteBin2Line size={24} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col w-full rounded-md items-center justify-center cursor-pointer">
                      <div
                        className={`text-xl lg:text-4xl  ${
                          theme == "light" ? "text-black" : " text-bg_lightest"
                        }`}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        <p
                          value="email"
                          className={`text-base ${
                            theme == "light" ? "text-black" : "text-bg_lightest"
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
                            : "bg-bg_lightest text-bg_core"
                        }`}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-transparent">
                <label value="firstname" className={labelClassName(theme)}>
                  First name
                </label>
                <div
                  className={`flex items-center w-full border ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_lightest text-bg_core"
                  }`}
                >
                  <input
                    className={inputClassName(theme)}
                    type="text"
                    value={formData.firstname}
                    placeholder="your firstname"
                    name="firstname"
                    id="firstname"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="bg-transparent">
                <label value="lastname" className={labelClassName(theme)}>
                  Last name
                </label>
                <div
                  className={`flex items-center w-full border ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_lightest text-bg_core"
                  }`}
                >
                  <input
                    className={inputClassName(theme)}
                    value={formData.lastname}
                    placeholder="your username"
                    name="lastname"
                    id="lastname"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="bg-transparent">
                <label value="email" className={labelClassName(theme)}>
                  Email
                </label>

                <div
                  className={`flex items-center w-full border ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_lightest text-bg_core"
                  }`}
                >
                  <input
                    className={inputClassName(theme)}
                    value={formData?.email}
                    type="email"
                    name="email"
                    placeholder="your.name@example.com"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="bg-transparent">
                <label value="Your password" className={labelClassName(theme)}>
                  Password
                </label>
                <div
                  className={`relative flex items-center w-full border ${
                    theme == "light"
                      ? "text-black bg-gray-200"
                      : "bg-bg_lightest text-bg_core"
                  }`}
                >
                  <input
                    className={inputClassName(theme)}
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
                    className="absolute right-2 px-1 cursor-pointer"
                  >
                    {passwordType == "password" ? (
                      <PiEyeDuotone size={22} />
                    ) : (
                      <PiEyeSlashDuotone size={22} />
                    )}
                  </div>
                </div>
              </div>
              <div
                onClick={() => (
                  dispatch(disableAuthModals()), dispatch(activeSignin())
                )}
                className="my-1 text-[#646464] text-sm cursor-pointer"
              >
                Already have an account? <b>Login</b>
              </div>
              <p className="mb-1 text-[#646464] text-sm">
                By clicking “Sign up with CodingWithYonela” you agree <br /> to
                the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
              </p>
              <button
                className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-boldbg-bg_lightest text-bg_core ${
                  theme == "light"
                    ? "bg-cl_primary text-bg_core"
                    : "bg-clr_alt text-bg_lightest"
                } font-bold`}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Register"
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
    </div>
  );
}
