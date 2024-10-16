import React from "react";
import { FaTags } from "react-icons/fa6";
import { MdCreate, MdDelete, MdOutlinePushPin, MdPushPin } from "react-icons/md";
import moment from "moment";
import { Hash } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../../../shared/Loader";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onPinNote,
  onEdit,
  onDelete,
  image,
  theme,
  username,
}) =>
{
  const { loading } = useSelector((state) => state.note);
  const { currentUser } = useSelector((state) => state.user);
  return loading ? (
    <Loader />
  ) : (
    <div
      className={`flex items-center w-full justify-between mb-1 space-x-2 p-2  border border-cl_primary shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c] ${theme == "light"
          ? "bg-white text-bg_primary"
          : "bg-bg_core text-bg_lightest"
        } ${isPinned ? "border-cl_primary " : "text-slate-300"
        } py-2 border lg:p-4 hover:shadow-xl transition-all ease-in-out`}
    >
      <div
        className={`${theme == "light" ? "bg-white text-bg_primary" : "bg-bg_core"
          } py-2 flex flex-col justify-between`}
      >
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span
            className={`text-xs  ${theme == "light"
                ? "bg-white text-bg_primary"
                : "bg-bg_core text-bg_lightest border border-bg_grey"
              }`}
          >
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <p className="text-xs mt-2">{content?.slice(0, 60)}</p>
        <div className="text-xs mt-2">
          {tags ? tags?.map((item) => `#${item} `) : ""}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col items-center gap-2">
          {isPinned ? (
            <MdPushPin
              className={`cursor-pointer ${isPinned ? "text-cl_primary " : "text-slate-300"
                }`}
              onClick={(currentUser?.is_admin || currentUser?.is_staff) ? onPinNote : ""}
            />
          ) : (
            <MdOutlinePushPin
              className={`cursor-pointer ${isPinned ? "text-cl_primary " : "text-slate-300"
                }`}
              onClick={onPinNote}
            />
          )}
          <div
            className={`flex items-center mb-1 space-x-2 ${theme == "light" ? "" : ""
              } py-2 `}
          >
            <img
              src={image}
              alt={username}
              className="rounded-md object-contain h-[25px] w-[25px]"
            />
          </div>
          {currentUser?.is_admin || currentUser?.is_staff ? (
            <div className="flex items-center gap-2 cursor-pointer">
              <MdCreate
                className="hover:text-bg_core duration-300"
                onClick={onEdit}
              />

              <MdDelete className="hover:text-bg_core duration-300" onClick={onDelete} />
            </div>
          ) : ""}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
