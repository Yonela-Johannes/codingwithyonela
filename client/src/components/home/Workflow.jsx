// import { CheckCircle2 } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { checklistItems } from "../../data/data";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import landing from '../../assets/landing.mp4'

const Workflow = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="">
      <h2 className="text-xl sm:text-3xl lg:text-4xl tracking-wide mt-10 lg:mt-20">
        Speed up{" "}
        <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} bg-clip-text`}>
          project tracking.
        </span>
      </h2>
      <div className="mt-3 lg:mt-6 grid lg:grid-cols-2 justify-center items-center">
        <div className="p-2 w-full h-[300px]">
          <video
            muted
            loop
            autoPlay
            className=" h-[300px] mx-auto rounded-md bg-clip-text"
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
