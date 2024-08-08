import { Alert, Spinner } from 'flowbite-react';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { disableAuthModals, register } from "../features/user/authSlice";
import { useEffect } from "react";
import { toast } from 'react-hot-toast'
import { MdClose } from "react-icons/md";
import { ThemeContext } from "../context/ThemeContext";

export default function SignUp()
{
  const { message, loading, signup_success } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(null)
  const [formData, setFormData] = useState({
    "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
    "password": ""
  });

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext)

  const handleChange = (e) =>
  {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.firstname || !formData.lastname || !profile) return toast("Missing information")
    const newFormData = new FormData();
    newFormData.append('username', formData.username);
    newFormData.append('firstname', formData.firstname);
    newFormData.append('lastname', formData.lastname);
    newFormData.append('email', formData.email);
    newFormData.append('password', formData.password);
    newFormData.append('profile', profile);
    dispatch(register(newFormData));
  }

  useEffect(() =>
  {
    if (signup_success)
    {
      toast("Check you email for verification link")
      dispatch(disableAuthModals())
      navigate('/')
    }
  }, [message, signup_success])

  useEffect(() =>
  {
    if (message)
    {
      toast(message)
    }
  }, [message, signup_success])

  return (
    <div className={`${theme == 'light' ? '' : 'border-none'} flex flex-col lg:flex-row items-center justify-center lg:items-center lg:absolute min-h-screen lg:h-sceen w-full lg:z-50 backdrop-blur-xl overflow-hidden top-0 left-0 right-0 bottom-0`}>
      <div className={`${theme == "light" ? "bg-white" : "bg-bg_card border-none"} w-full lg:relative flex py-8 lg:px-16 mx-auto flex-col md:flex-row md:items-center gap-5 lg:border lg:rounded-lg lg:w-[700px]`}>
        <div className={`${theme == "light" ? "bg-white" : "bg-slate-800 text-white"} rounded-full hidden lg:block lg:absolute top-2 lg:right-2 text-xl lg:text-2xl cursor-pointer`} onClick={() => dispatch(disableAuthModals())}>
          <MdClose />
        </div>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label value='Username'>Profile image</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}

                type='file'
                placeholder='your avatar'
                name="profile"
                id='profile'
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
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
              <label value='Username' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>Username</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                type='text'
                value={formData.username}
                placeholder='your username'
                name="username"
                id='username'
                onChange={handleChange}
              />
            </div>
            <div>
              <label value='firstname' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>First name</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                type='text'
                value={formData.firstname}
                placeholder='your firstname'
                name="firstname"
                id='firstname'
                onChange={handleChange}
              />
            </div>
            <div>
              <label value='lastname' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>Last name</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                type='text'
                value={formData.lastname}
                placeholder='your username'
                name="lastname"
                id='lastname'
                onChange={handleChange}
              />
            </div>
            <div>
              <label value='Your password' className={`${theme == "light" ? "text-black" : "bg-bg_card text-white"}`}>Password</label>
              <input
                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}
                value={formData.password}
                type='password'
                placeholder='Password'
                name="password"
                id='password'
                onChange={handleChange}
              />
            </div>
            <p className="my-1 lg:my-2 text-[#646464] text-sm">
              By clicking “Sign up with CodingWithYonela”, you agree <br /> to
              the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
            </p>
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
                'Sign Up'
              )}
            </button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span className={`${theme == "light" ? "text-black bg-gray-200" : "bg-bg_card text-white"}`}>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {message && (
            <Alert className='mt-5' color='failure'>
              {message}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}