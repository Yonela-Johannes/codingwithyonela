import Headers from "../../shared/Headers";
import Sender from "../../shared/Sender";
import SugggestionCard from "../../shared/SuggestionCard";

const Center = () => {
  return (
    <div className="flex items-center flex-col w-full">
      <Headers />
      <Sender />
      <SugggestionCard />
    </div>
  );
};

export default Center;
