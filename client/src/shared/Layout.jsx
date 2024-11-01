import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import NavMenu from "./NavMenu";
import Wrapper from "./Wrapper";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import SignUp from "../pages/SignUp";
import Signin from "../pages/Signin";
import { Widget } from "./Widget";
import MobileNav from "../components/MobileNav";
const Layout = ({ children }) => {
  const { currentUser, active_signup_modal, active_signin_modal } = useSelector(
    (state) => state.user
  );
  const { theme } = useContext(ThemeContext);

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
      <div
        className={`${
          theme == "light" ? "bg-white" : "bg-slate-800"
        } mx-auto overflow-x-hidden h-full flex-1 w-screen flex flex-col left-0 right-0`}
      >
        <div
          className={`${
            theme == "light"
              ? "bg-white border-bg_light"
              : "bg-slate-800 border-gray-900"
          } border-y-[1px] fixed top-0 left-0 right-0 z-50`}
        >
            <MobileNav currentUser={currentUser} />
          <Wrapper>
            <Navbar currentUser={currentUser} />
            <NavMenu />
          </Wrapper>
        </div>
        {!active_signin_modal && !active_signup_modal ? (
          <>
            <div
              className={`${
                theme == "light" ? "border-bg_light" : "border-gray-900"
              } my-5 lg:py-12 border-b-[1px] h-[calc(100vh-160px)] pt-[50px] lg:pt-[150px] overflow-hidden flex-1 flex-grow px-2 lg:px-0 lg:w-[80%] mx-auto md:flex flex-col`}
            >
              {children}
            </div>
            <Widget />
            <Wrapper>
              <Footer />
            </Wrapper>
          </>
        ) : (
          ""
        )}
      </div>
      {active_signup_modal ? <SignUp /> : ""}
      {active_signin_modal ? <Signin /> : ""}
    </div>
  );
};

export default Layout;
