import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { checklistItems } from "../../data/data";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import landing from '../../assets/landing.mp4'
import { Head } from "../../shared/Head";

const Workflow = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="mt-10 lg:mt-20">
      <div className="space-y-4 max-w-[550px] mb-8">
        <Head title='Project Tracking' desc='Easily monitor the status of your projects with real-time tracking and detailed updates' theme={theme} />
      </div>
      <div className="mt-3 lg:mt-6 grid lg:grid-cols-2 gap-8 justify-center items-center">
        <div className="p-2 w-full h-[300px] ">
          <video
            muted
            loop
            autoPlay
            className="h-[300px] mx-auto bg-clip-text border border-cl_primary shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c]"
          >
            <source src={landing} type="video/mp4"></source>
          </video>
        </div>
        <div className="grid lg:grid-cols-2 w-full">
          {checklistItems.map((item, index) => (
            <div key={index} className="lg:flex items-center mb-12">
              <div className={`lg:mx-6 ${theme !== "light" ? "bg-clr_alt" : "bg-cl_primary"} p-1 lg:p-2 justify-center items-center rounded-full w-min h-min`}>
                <AiTwotoneCheckCircle size={22} />
              </div>
              <div>
                <h5 className={`${theme !== "light" ? "text-clr_alt" : "text-cl_primary"} lg:text-xl font-normal`}>{item.title}</h5>
                <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-xl`}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
