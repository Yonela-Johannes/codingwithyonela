import Navbar from "../components/Navbar";
import Footer from "./Footer";
import Header from "./Header";
import NavMenu from "./NavMenu";
import Wrapper from "./Wrapper";

const Layout = ({ children }) => {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center flex-col overflow-x-hidden">
      <div className="absolute mx-auto h-[calc(100vh)] flex flex-col left-0 right-0">
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
        <div className={`h-full overflow-y-hidden border-y-[1px] border-bg_light  w-full md:flex flex-col justify-around`}>
          <div className="md:py-3 w-[80%] mx-auto overflow-y-scroll  h-full">{children}</div>
        </div>
        <Wrapper>
          <Footer />
        </Wrapper>
      </div>
    </div>
  );
};

export default Layout;
