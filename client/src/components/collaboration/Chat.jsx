import moment from "moment";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";

const Chat = ({ message }) =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div
      className={`border-b  ${theme == "light" ? "text-black border-bg_light" : "text-white border-bg_core"} min-h-[100px] align-text-top text-start relative`}
    >
      <div
        className={`absolute top-6 z-10
      px-7 w-full`}
      >
        <div className="w-full space-y-2">
          <p className="text-base italic">{message?.message}</p>
          <div className="flex items-center gap-2 justify-end">
            <img className="w-7 h-7 rounded-full" src={message?.profile} />
            <div>
              <p className="text-end text-xs font-semibold">
                {message?.username} {message?.lastname}
              </p>
              <div className="flex gap-1 items-center text-end justify-end">
                <p className="text-xs">
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
