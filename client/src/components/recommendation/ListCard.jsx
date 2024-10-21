import { Hash } from "lucide-react";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import { ThemeContext } from "../../context/ThemeContext";

export default function ListCard({ item })
{
  const { theme } = useContext(ThemeContext);
  const { setOpenSuggestion, setSelectedSuggestion } = useContext(ModalContext);
  return (
    <div onClick={() => (setSelectedSuggestion(item), setOpenSuggestion(true))}>
      <div
        className={`${theme == "light"
          ? "bg-white text-bg_primary"
          : "bg-bg_core border-bg_core text-slate-300"
          } text-sm lg:text-base shadow flex flex-col gap-2 border p-2 lg:p-4 mb-3 cursor-pointer`}
      >
        <div
          className={`flex items-center mb-1 space-x-2 ${theme == "light"
            ? "bg-white text-bg_primary border-b-2"
            : "bg-bg_core  border-b-2 border-bg_grey"
            } py-2 `}
        >
          <Hash className="text-primary w-5" />
          <div className="grid grid-cols-2 justify-between items-center w-full">
            <strong>
              {item?.username} {item?.re_lastname}
            </strong>
          </div>
        </div>
        <div className="grid lg:grid-cols-2  h-full w-full">
          <div className="flex items-center justify-center w-full h-full">
            <img
              src={item?.portfolio}
              alt={item?.username}
              className="rounded-md object-contain h-full"
            />
          </div>
          <div className="space-y-1">
            <p>
              <strong>Full name:</strong> {item?.username} {item?.re_lastname}
            </p>
            <p>
              <strong>Title:</strong> {item?.user_title}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {item?.description || "No description provided"}
            </p>
            <p className="flex items-center">
              <strong>Country:</strong>
              <div className="flex gap-1 items-center justify-start">
                <p
                  className={`${theme == "light" ? "text-bg_primary" : "text-bg_lightest"
                    } md:block text-sm lg:text-base px-2 `}
                >
                  {item?.country_name?.slice(0, 15)} - {item?.country_code}
                </p>
                <img
                  src={item?.image}
                  alt={item?.username}
                  className="h-[24px] md:h-[24px]
                      object-cover"
                />
              </div>
            </p>
            <p className="text-sm lg:text-base">
              <strong>Skills:</strong>{" "}
              {item?.skills
                ?.replaceAll("{", "")
                ?.replaceAll("}", "")
                ?.replaceAll('"', "")
                ?.replaceAll(",", " | ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
