import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import NavMenu from "./NavMenu";
import Wrapper from "./Wrapper";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) =>
{
  const dispatch = useDispatch();
  const user = ''
  return (
    <div className="min-h-screen w-screen flex justify-center items-center flex-col overflow-x-hidden">
      <Toaster
        position="top-center"
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
      <div className="mx-auto overflow-x-hidden h-full flex-1 w-screen flex flex-col left-0 right-0">
        <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-bg_light overflow-x-hidden">
          <Wrapper>
            <Navbar user={user} />
            <Header />
            <NavMenu />
          </Wrapper>
        </div>
        <div
          className={`h-[calc(100vh-320px)] pt-[320px] overflow-x-hidden flex-1 flex-grow border-y-[1px] border-bg_light  w-full md:flex flex-col`}
        >
          <div className="md:py-3 md:pb-10 pb-5 flex-1 flex-grow w-[80%] mx-auto overflow-x-hidden h-full">
            {children}
          </div>
        </div>
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
    </div>
  );
};

export default Layout;
