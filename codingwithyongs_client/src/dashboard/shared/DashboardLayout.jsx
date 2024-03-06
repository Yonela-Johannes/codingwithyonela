import Navbar from "../../components/Navbar";
import Footer from "../../shared/Footer";
import DashboardNavMenu from "../components/DashboardNavMenu";
import DashboardWrapper from "./DashboardWrapper";

const DashboardLayout = ({ children }) => {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center flex-col overflow-x-hidden">
      <div className="absolute mx-auto h-[calc(100vh)] flex flex-col left-0 right-0">
        <div className="border-b border-bg_light ">
          <DashboardWrapper>
            <Navbar />
          </DashboardWrapper>
        </div>

        <DashboardWrapper>
          <DashboardNavMenu />
        </DashboardWrapper>
        <div className={`h-full overflow-y-hidden border-y-[1px] border-bg_light  w-full md:flex flex-col justify-around`}>
          <div className="md:py-3 w-[80%] mx-auto overflow-y-scroll  h-full">{children}</div>
        </div>
        <DashboardWrapper>
          <Footer />
        </DashboardWrapper>
      </div>
    </div>
  );
};

export default DashboardLayout;
