import moment from "moment";
const Chat = ({ message }) => {
  const currentUser = "Yonela Johannes";
  return (
    <div
      className={`${
        message?.user.name == currentUser ? "text-green-900" : "text-red-900"
      } h-[120px] rounded-md align-text-top text-start relative font-bold`}
    >
      <div
        className="absolute top-6 z-10
      px-7 w-full"
      >
        {message?.user.name == currentUser ? (
          <div className="w-full space-y-2">
            <p className="text-xs font-semibold text-bg_core">
              {moment(message?.date).fromNow()}
            </p>
            <p className="text-base font-bold italic">{message?.message}</p>
            <div className="flex items-center gap-2 justify-end">
              <img className="w-9 h-9 rounded-full" src={message?.user.image} />
              <div>
                <p className="text-end text-xs font-semibold">
                  {message?.user?.name}
                </p>
                <div className="flex gap-1 items-center text-end justify-end">
                  <p className="text-xs font-semibold text-bg_core">
                    {message?.user?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full  space-y-2">
            <p className="text-xs font-semibold text-bg_core">
              {moment(message?.date).fromNow()}
            </p>
            <p className="text-base font-bold italic">{message?.message}</p>
            <div className="flex items-center gap-1 justify-start">
              <img className="w-9 h-9 rounded-full" src={message?.user.image} />
              <div>
                <p className="text-end text-xs font-semibold">
                  {message?.user?.name}
                </p>
                <div className="flex gap-1 items-center text-end justify-end">
                  <p className="text-xs font-semibold text-bg_core">
                    {message?.user?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
