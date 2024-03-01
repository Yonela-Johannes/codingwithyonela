import Headers from "../../shared/Headers";
import Sender from "../../shared/Sender";
import Questions from "../question/Questions";

const Center = () => {
  return (
    <div className="flex items-center flex-col w-full">
      <Headers />
      <Questions />
      <Sender />
    </div>
  );
};

export default Center;
