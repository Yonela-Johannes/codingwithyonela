import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import Loader from "../../shared/Loader";
import { useSelector } from "react-redux";
import { PiShareFatDuotone, PiLinkedinLogoDuotone, PiGithubLogoDuotone } from "react-icons/pi";
import Status from "../collaboration/Status";

function RecommendationCard({ item, theme })
{
  const { currentUser } = useSelector((state) => state.user);
  const { setOpenSuggestion, setSelectedSuggestion } = useContext(ModalContext)
  const { loading } = useSelector((state) => state.recommendation);

  return (
    loading ? (
      <Loader />
    ) : (

      <div className={`relative ${theme == "light" ? "text-cl_alt bg-bg_lightest" : "text-white bg-bg_core"} relative`}>
        <div onClick={() => (setSelectedSuggestion(item), setOpenSuggestion(true))} className="rounded-md">
          <div className="flex gap-1 items-center px-2 font-bold justify-end">
            <p className={`${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} md:block text-xs rounded-md px-2 py-1`}>{item?.country_name.slice(0, 15)} - {item?.country_code}</p>
            <img
              src={item?.image}
              alt={item?.username}
              className="h-[24px] md:h-[24px]
                    object-cover rounded-full"
            />
          </div>
          <div className="flex w-full gap-4 mt-3">
            <div
              className="shadow-md w-full
                rounded-lg hover:shadow-lg cursor-pointer"
            >
              <img
                src={item?.portfolio}
                alt={item?.username}
                className="h-[150px] w-[150px] rounded-full lg:w-[200px] lg:h-[200px]
                    object-cover mt-3 m-auto"
              />
              <div
                className="flex flex-col 
                      items-baseline p-3 gap-1 border-t-[1px] border-bg_primary mt-2"
              >
                <h2 className={`${theme == "light" ? "text-bg_primary" : "text-bg_lighter"} font-bold text-base lg:text-lg`}>{item?.username} {item?.lastname}</h2>
                <p className="text-base w-max">{item?.user_title}</p>
                <div className="flex items-center text-primary gap-4 my-2 text-bg_opp text-lg">
                  {item?.website ? (
                    <a href={item.website} className="" target="_blank">
                      <PiShareFatDuotone size={22} />
                    </a>
                  ) : (
                    ""
                  )}
                  {item?.github ? (
                    <a href={`https://github.com/${item.github}`} className="" target="_blank">
                      <PiGithubLogoDuotone size={22} />
                    </a>
                  ) : (
                    ""
                  )}
                  {item?.linkedin ? (
                    <a href={`https://www.linkedin.com/in/${item.linkedin}`} className="" target="_blank">
                      <PiLinkedinLogoDuotone size={22} />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {currentUser?.is_admin || currentUser?.is_staff ? (
          <div className="absolute bottom-1 right-2 z-40 cursor-pointer">
            <Status post={item} />
          </div>
        ) : ""}
      </div>
    )
  );
}

export default RecommendationCard;
