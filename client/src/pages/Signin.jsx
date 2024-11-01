import { Alert, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activeSignup,
  disableAuthModals,
  login,
} from "../features/user/authSlice";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi";
import { motion } from "framer-motion";
import { IoIosUnlock } from "react-icons/io";
import { AiTwotoneMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { inputClassName, labelClassName } from "../utils/utils";

const Signin = () => {
  const { theme } = useContext(ThemeContext);
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, message, currentUser, token, signin_success } = useSelector(
    (state) => state?.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password)
      return toast("Missing information");
    const data = {
      email: formData.email,
      password: formData.password,
    };

    dispatch(login(data));
    navigate("/recommendation");
  };

  useEffect(() => {
    if (currentUser && token) {
      dispatch(disableAuthModals());
    }
  }, [currentUser, token]);

  useEffect(() => {
    if (signin_success) {
      toast("Sign in successfull");
      dispatch(disableAuthModals());
    }
  }, [message, signin_success]);

  return (
    <div
      className={`${
        theme == "light" ? "" : "border-none"
      } flex flex-col items-center justify-center lg:items-center absolute h-screen lg:h-sceen w-full lg:z-50 overflow-hidden top-0 left-0 right-0 bottom-0`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`${
          theme == "light" ? "" : "border-none"
        } flex flex-col items-center justify-center lg:items-center backdrop-blur-lg absolute h-full w-full px-4`}
      >
        <div
          className={` ${
            theme == "light" ? "bg-white" : "bg-bg_core border-none"
          } w-full lg:relative flex py-8 lg:px-16 mx-auto flex-col md:items-center gap-5 lg:border lg:w-[600px] px-4 rounded-md`}
        >
          <div
            className={`${
              theme == "light" ? "bg-white" : "bg-slate-800 text-white"
            } hidden lg:block lg:absolute top-2 lg:right-2 text-xl lg:text-2xl cursor-pointer`}
            onClick={() => dispatch(disableAuthModals())}
          >
            <MdClose size={24} />
          </div>
          <p
            className={`${theme == "light" ? "bg-white" : "text-white"}
                text-lg lg:text-xl text-center`}
          >
            Signin to your account
          </p>
          <div className="flex-1 w-full">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div>
                <label value="Your email" className={labelClassName(theme)}>
                  Email
                </label>
                <div
                  className={`flex items-center w-full border ${
                    theme == "light" ? "text-black" : "text-white"
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

              <div className="relative">
                <label value="Your password" className={labelClassName(theme)}>
                  Password
                </label>
                <div
                  className={`flex items-center w-full ${
                    theme == "light" ? "text-black" : "text-white"
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
                  dispatch(disableAuthModals()), dispatch(activeSignup())
                )}
                className="my-1 lg:my-2 text-[#646464] text-sm cursor-pointer"
              >
                Don't have an account? <b>Register</b>
              </div>
              <button
                className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold ${
                  theme == "light"
                    ? "bg-cl_primary text-bg_core"
                    : "bg-clr_alt text-bg_lightest"
                } `}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign in"
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
};

export default Signin;
