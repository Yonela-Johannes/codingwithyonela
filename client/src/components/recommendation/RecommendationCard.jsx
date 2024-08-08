import { useContext } from "react";
import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa";
import { ModalContext } from "../../context/ModalContext";
import Loader from "../../shared/Loader";
import { useSelector } from "react-redux";

function RecommendationCard({ item, colors, theme })
{
  const { setOpenSuggestion, setSelectedSuggestion } = useContext(ModalContext)
  const { loading } = useSelector((state) => state.recommendation);
  let color = Math.floor(Math.random() * colors?.length)
  color = colors[color]

  return (
    loading ? (
      <Loader />
    ) : (

      <div onClick={() => (setSelectedSuggestion(item), setOpenSuggestion(true))} className={`${theme == "light" ? "text-cl_alt bg-bg_lightest" : "text-white bg-bg_core"} relative`}>
        <div className="rounded-md">
          <div className="flex gap-1 items-center px-2 font-bold justify-end">
            <p className={`${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} md:block text-xs rounded-md px-2 py-1`}>{item?.country_name.slice(0, 15)} - {item?.country_code}</p>
            <img
              src={item?.image}
              alt={item?.username}
              className="h-[24px] md:h-[24px]
                    object-contain"
            />
          </div>
          <div className="flex w-full gap-4 mt-3">
            <div
              className="shadow-md w-full
                rounded-lg hover:shadow-lg cursor-pointer"
            >
              <img
                src={item?.re_image}
                alt={item?.username}
                className="h-[150px] w-full rounded-lg lg:h-[200px]
                    object-cover mt-3 m-auto"
              />
              <div
                className="flex flex-col 
                    items-baseline p-3 gap-1 border-t-[1px] border-bg_primary mt-2"
              >
                <h2 className={`${theme == "light" ? "text-bg_primary" : "text-bg_lighter"} font-bold text-base lg:text-lg`}>{item?.username} {item?.lastname}</h2>
                <div className="flex justify-between">
                  <p className="text-base w-max">{item?.user_title}</p>
                </div>
                <div className="flex items-center text-primary gap-4 my-2 text-bg_opp text-lg">
                  {item?.portfolio ? (
                    <a href={item.portfolio} className="" target="_blank">
                      <FaReact />
                    </a>
                  ) : (
                    ""
                  )}
                  {item?.github ? (
                    <a href={`https://github.com/${item.github}`} className="" target="_blank">
                      <FaGithub />
                    </a>
                  ) : (
                    ""
                  )}
                  {item?.linkedin ? (
                    <a href={`https://www.linkedin.com/in/${item.github}`} className="" target="_blank">
                      <FaLinkedin />
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default RecommendationCard;
