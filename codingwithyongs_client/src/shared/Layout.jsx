import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import NavMenu from "./NavMenu";
import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-screen flex justify-center items-center flex-col overflow-x-hidden">
      <div className="mx-auto h-full flex-1 w-screen flex flex-col left-0 right-0">
        <div className="border-b border-bg_light ">
          <Wrapper>
            <Navbar />
          </Wrapper>
        </div>
        <Wrapper>
          <Header />
        </Wrapper>
        <Wrapper>
          <NavMenu />
        </Wrapper>
        <div className={`h-full overflow-x-hidden flex-1 flex-grow border-y-[1px] border-bg_light  w-full md:flex flex-col`}>
          <div className="md:py-3 md:pb-10 flex-1 flex-grow w-[80%] mx-auto overflow-x-hidden h-full">{children}</div>
        </div>
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
    </div>
  );
};

export default Layout;
