import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { activeSignin, verifyRegistration } from "../features/user/authSlice";
import Loader from "../shared/Loader";
import toast from "react-hot-toast";

const Verify = () =>
{
  const { message } = useSelector((state) => state.user)
  const { token } = useParams()
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() =>
  {
    dispatch(verifyRegistration(token))
  }, [token])


  useEffect(() =>
  {
    if (message)
    {
      if(message == 'Error: User already exists. Try logging in.'){
        toast('You acount was verified. Login')
      }
      else {
        toast(message)
      }
      dispatch(activeSignin())
    }
  }, [message])


  return (
    <div
      className={`${theme == "light" ? "text-bg_grey" : "text-white"} lg:relative h-full bg-cover bg-center flex flex-col justify-center items-center text-white mb-4`}
    >
      <main className='flex flex-col items-center text-center error-page--content z-10'>
        <h1 className={`${theme == "light" ? "text-bg_grey" : "text-white"} text-xl lg:text-3xl font-semibold mb-4`}>Confirming</h1>
        <p className={`${theme == "light" ? "text-bg_grey" : "text-white"}  mb-6 lg:text-xl`}>
          We are confirming your account
        </p>
        <Loader disable={true} />
      </main>
    </div >
  );
};

export default Verify;
