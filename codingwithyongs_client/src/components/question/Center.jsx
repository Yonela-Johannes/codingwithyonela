import Sender from "../../shared/Sender";
import Headers from "../../shared/Headers";
import Suggestions from "./Questions";

const Center = () => {
  return (
    <div className="flex items-center flex-col w-full">
      <Headers />
      <Suggestions />
      <Sender />
    </div>
  );
};

export default Center;
