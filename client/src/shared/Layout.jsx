import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import NavMenu from "./NavMenu";
import Wrapper from "./Wrapper";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SignUp from "../pages/SignUp";

const Layout = ({ children }) =>
{
  const { currentUser, active_signup_modal } = useSelector((state) => state.user)
  const { theme } = useContext(ThemeContext)

  return (
    <div className="relative min-h-screen w-screen flex justify-center items-center flex-col overflow-x-hidden">
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div className={`${theme == "light" ? "bg-white" : "bg-slate-800"} mx-auto overflow-x-hidden h-full flex-1 w-screen flex flex-col left-0 right-0`}>
        <div className={`${theme == "light" ? "bg-white border-bg_light" : "bg-slate-800 border-gray-900"} border-y-[1px] fixed top-0 left-0 right-0 z-50 overflow-x-hidden`}>
          <Wrapper>
            <Navbar currentUser={currentUser} />
            <Header />
            <NavMenu />
          </Wrapper>
        </div>
        <div
          className={`${theme == "light" ? "border-bg_light" : "border-gray-900"} border-b-[1px] h-[calc(100vh-320px)] pt-[160px] lg:pt-[300px] overflow-x-hidden flex-1 flex-grow  w-full md:flex flex-col`}
        >
          <div className={`md:pb-4 flex-1 flex-grow w-[80%] mx-auto overflow-hidden h-full`}>
            {children}
          </div>
        </div>
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
      <div className="hidden lg:block ">{active_signup_modal ? (<SignUp />) : ""}</div>
    </div>
  );
};

export default Layout;
