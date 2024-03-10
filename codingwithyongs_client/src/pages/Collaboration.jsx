import { Watermark } from "antd";
import Left from "../components/collaborations/Left";
import Center from "../components/collaborations/Center";
import Right from "../components/collaborations/Right";
import Header from "../components/blog/Header";

const Collaboration = () => {
  return (
    <div className="flex flex-col h-full overflow-y-hidden">
      <div className="grid grid-cols-3 gap-6 h-full text-center">
        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">
            Currently This Week
          </h2>
          <Left />
        </div>
        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">My Projects</h2>
          <Center />
        </div>

        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">Chat</h2>
            <Right />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
