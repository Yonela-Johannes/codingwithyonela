import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../assets/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { verifyRegistration } from "../features/user/authSlice";
import Loader from "../components/Loader/Loader";
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
      toast(message)
      navigate('/edit-account')
    }

  }, [message])


  return (
    <div
      className={`${theme == "light" ? "text-bg_opp" : "text-white"} lg:relative h-full bg-cover bg-center flex flex-col justify-center items-center text-white mb-4`}
    >
      <header className={`${theme == "light" ? "text-bg_opp" : "text-white"} lg:absolute top-0 left-0 p-4 w-full`}>
        <img src={logo} alt='CodingWithYonela' className='h-8 w-8 lg:w-12 lg:h-12 object-contain object-center' />
      </header>
      <main className='flex flex-col items-center text-center error-page--content z-10'>
        <h1 className={`${theme == "light" ? "text-bg_opp" : "text-white"} text-2xl lg:text-7xl font-semibold mb-4`}>Confirming</h1>
        <p className={`${theme == "light" ? "text-bg_opp" : "text-white"}  mb-6 lg:text-xl`}>
          We are confirming your account
        </p>
        <Loader />
      </main>
    </div >
  );
};

export default Verify;
