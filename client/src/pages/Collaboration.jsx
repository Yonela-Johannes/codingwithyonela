import Center from "../components/collaboration/Center";
import Right from "../components/collaboration/Right";
import Details from "../components/collaboration/Details";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const Collaboration = ({ id }) =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="flex flex-col h-full overflow-y-hidden my-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-6 h-full text-center overflow-hidden">
        <div className=" h-full">
          <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-xl mb-2 font-normal text-start`}>Project</h2>
          <Center theme={theme} id={id} />
        </div>

        <div className=" h-full">
          <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-xl mb-2 font-normal text-start`}>Chat</h2>
          <Right theme={theme} id={id} />
        </div>
        <div className=" h-full">
          <h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-xl mb-2 font-normal text-start`}>Information</h2>
          <Details theme={theme} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
