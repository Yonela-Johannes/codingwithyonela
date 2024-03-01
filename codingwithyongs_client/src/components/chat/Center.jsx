import Sender from "./Sender";
import ChatHeader from "./ChatHeader";
import Chats from "./Chats";

const Center = () => {
  return (
    <div className="flex items-center flex-col w-full">
      <ChatHeader />
      <Chats />
      <Sender />
    </div>
  );
};

export default Center;
