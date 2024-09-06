import { Alert, Spinner } from 'flowbite-react';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { disableAuthModals, login, logout } from "../features/user/authSlice";
import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";
import toast from "react-hot-toast";
import { PiEyeDuotone } from 'react-icons/pi';
import { motion } from "framer-motion";

const Signin = () =>
{
  const { theme } = useContext(ThemeContext)
  const [passwordType, setPasswordType] = useState('password')
  const [formData, setFormData] = useState({
    "email": "",
    "password": ""
  });

  const { loading, message, currentUser, token, signin_success } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) =>
  {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!formData.email || !formData.password) return toast("Missing information")
    const data = {
      email: formData.email,
      password: formData.password,
    }

    dispatch(login(data));
  }

  useEffect(() =>
  {
    if (currentUser && token)
    {
      dispatch(disableAuthModals())
      navigate(0);
    }
  }, [currentUser, token])

  useEffect(() =>
  {
    if (signin_success)
    {
      toast("Sign in successfull")
      dispatch(disableAuthModals())
      navigate('/')
    }
  }, [message, signin_success])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }} className={`${theme == 'light' ? '' : 'border-none'} flex flex-col lg:flex-row items-center justify-center lg:items-center absolute h-screen lg:h-sceen w-full lg:z-50 backdrop-blur-xl overflow-hidden top-0 left-0 right-0 bottom-0`}>
      <div className={`${theme == "light" ? "bg-white" : "bg-bg_card border-none"} w-full lg:relative flex py-8 lg:px-16 mx-auto flex-col md:flex-row md:items-center gap-5 lg:border lg:rounded-lg lg:w-[700px]`}>
        <div className={`${theme == "light" ? "bg-white" : "bg-slate-800 text-white"} rounded-full hidden lg:block lg:absolute top-2 lg:right-2 text-xl lg:text-2xl cursor-pointer`} onClick={() => dispatch(disableAuthModals())}>
          <MdClose />
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label value='Your email' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>Email</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                value={formData?.email}
                type='email'
                name="email"
                placeholder='your.name@example.com'
                id='email'
                onChange={handleChange}
              />
            </div>

            <div>
              <label value='Your password' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>Password</label>
              <div className={`flex items-center h-full w-full border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}>
                <input
                  className={`w-full border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                  value={formData.password}
                  type={passwordType}
                  placeholder='Password'
                  name="password"
                  id='password'
                  onChange={handleChange}
                />
                <div onClick={() => setPasswordType(currenState => currenState == 'password' ? 'text' : 'password')} className="px-1 lg:px-2 cursor-pointer h-full">
                  <PiEyeDuotone size={22} />
                </div>
              </div>
            </div>
            <button
              className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold text-white ${theme == "light" ? "bg-clr_alt" : "bg-clr_alt"}`}
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          {message && (
            <Alert className='mt-5' color='failure'>
              {message}
            </Alert>
          )}
        </div>
      </div>
    </motion.div>
  );
};


export default Signin;
