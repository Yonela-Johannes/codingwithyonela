import HoverUnderLine from "../components/HoverUnderLine";
import { GoogleLogin } from "@react-oauth/google";
import { siteUrl, callback } from "../constants/base_urls";
import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'
import { login } from "../features/user/authSlice";
import { useEffect } from "react";

const Signin = () =>
{
  const [formData, setFormData] = useState({
    "email": "",
    "password": ""
  });

  const { loading, error,
    message, currentUser, token } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleChange = (e) =>
  {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLoginSuccess = async (credentials) =>
  {
    dispatch(login(credentials.credentials));
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!formData.email || !formData.password)
    {

    }
    dispatch(login(formData));

  }

  useEffect(() =>
  {
    if (currentUser && token)
    {
      navigate(-1);
    }
  }, [currentUser, token])

  return (
    <div className="grid lg:grid-cols-3 items-start">
      <div className="flex items-start space-y-4 h-full">
        <div className="flex flex-col gap-4 rounded-sm shrink-0 items-start justify-center fill-fill backdrop-opacity-[17px]">
          <h1 className="text-center text-base lg:text-2xl lg:font-bold tracking-tight mb-8">
            Continue with CodingWithYonela
          </h1>
          <div className="flex flex-col shrink-0 bg-table_bg items-start w-[250px] rounded-[12px] duration-300 cursor-pointer">
            <HoverUnderLine>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() =>
                {
                  console.log("Login Failed");
                }}
                login_uri={siteUrl}
                redirect_uri={callback}
                cancel_on_tap_outside
                useOneTap
                size="large"
                theme="filled_black"
                text="continue_with"
                shape="pill"
                width="100%"
              />
            </HoverUnderLine>
          </div>
          <p className="my-5 text-[#646464] text-sm">
            By clicking “Continue your account with Google”, you agree <br /> to
            the CodingWithYonela <b>TOS</b> and <b>Privacy Policy</b>.
          </p>
        </div>
      </div>

      <div className='flex-1 flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your email' />
              <TextInput
                type='text'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <button
              className="md:mt-4 text-center flex justify-center gap-1 md:gap-4 items-center"
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button >
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {message && (
            <Alert className='mt-5' color='failure'>
              {message}
            </Alert>
          )}
        </div>
      </div>
      <div className=''>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <img src={logo} className="w-9 h-9 object-center object-contain" alt="logo" />
          CodingWithYonela
        </Link>
        <p className='text-sm mt-5'>
          You can sign in with your email and password
          or with Google.
        </p>
      </div>
    </div>
  );
};


export default Signin;
