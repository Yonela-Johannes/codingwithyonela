import Left from "../components/collaborations/Left";
import Center from "../components/collaborations/Center";
import Right from "../components/collaborations/Right";

const Collaboration = () => {
  return (
    <div className="flex flex-col h-full overflow-y-hidden my-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3 xl:gap-6 h-full text-center">
        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">Projects</h2>
          <Center />
        </div>

        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">Chat</h2>
          <Right />
        </div>
        <div className=" h-full">
          <h2 className="text-xl mb-2 font-normal text-start">Details</h2>
          <Left />
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
