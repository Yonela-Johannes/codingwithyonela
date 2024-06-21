import linkedin from "../assets/linkedInAds.png";
import HoverUnderLine from "../components/HoverUnderLine";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { siteUrl, apiUrl, callback } from "../constants/base_urls";
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

const Signin = () =>
{
  const [formData, setFormData] = useState({});
  const loading = false;
  const errorMessage = ''
  // const { loading, error: errorMessage } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { linkedInLogin } = useLinkedIn({
    clientId: "779t2vntfhhcna",
    scope: "profile email w_member_social",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: async (code) =>
    {
      const response = await axios
        .post("http://localhost:8000/api/auth/linkedin", {
          code: code,
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error.message));
      console.log(response);
    },
    onError: (error) =>
    {
      console.log(error);
    },
  });

  const handleChange = (e) =>
  {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleLoginSuccess = async (credentials) =>
  {
    const response = await axios.post(`${apiUrl}user/login`, {
      oauthCode: credentials.credentials,
    });
    console.log(response);
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (!formData.email || !formData.password)
    {
      // return dispatch(signInFailure('Please fill all the fields'));
    }
    try
    {
      // dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false)
      {
        // dispatch(signInFailure(data.message));
      }

      if (res.ok)
      {
        // dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error)
    {
      // dispatch(signInFailure(error.message));
    }
  };

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
                type='email'
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
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
      <div className=''>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <img src={logo} className="w-9 h-9 object-center object-contain" alt="logo" />
          Blog
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
