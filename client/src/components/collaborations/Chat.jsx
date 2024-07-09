import moment from "moment";
import { useSelector } from "react-redux";
const Chat = ({ message }) => {
  const { user } = useSelector((state) => state.user);
  console.log(message);
  return (
    <div
      className={`${
        message?.account_id == user?.id ? "text-green-900" : "text-red-900"
      } h-[120px] rounded-md align-text-top text-start relative font-bold`}
    >
      <div
        className="absolute top-6 z-10
      px-7 w-full"
      >
        <div className="w-full space-y-2">
          <p className="text-xs font-semibold text-bg_core">
            {moment(message?.mes_com_time).fromNow()}
          </p>
          <p className="text-base font-bold italic">{message?.message}</p>
          <div className="flex items-center gap-2 justify-end">
            <img className="w-7 h-7 rounded-full" src={message?.profile} />
            <div>
              <p className="text-end text-xs font-semibold">
                {message?.username} {message?.lastname}
              </p>
              <div className="flex gap-1 items-center text-end justify-end">
                <p className="text-xs font-semibold text-bg_core">
                  {message?.user_title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
