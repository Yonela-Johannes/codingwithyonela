import { FaGithub, FaInstagram, FaLinkedin, FaReact } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import data from '../../assets/data.json'

function RecommendationCard({ item, colors })
{
  let color = Math.floor(Math.random() * colors?.length)
  color = colors[color]
  return (
    <div className="relative">
      <div className="rounded-md border border-bg_light">
        <div className="flex justify-between">
          <h2 className="font-bold  text-base p-3 w-max">{item?.user_title}</h2>
          <div className="flex gap-1 items-center p-2 font-bold text-black">
            <p className={`md:block text-xs bg-${color}-600 rounded-md`}>{item?.country_name.slice(0, 15)} - {item?.country_code}</p>
            <p className="text-xl">{item?.country_flag}</p>
          </div>
        </div>
        <div className="flex w-full gap-4 mt-3 items-center justify-center">
          <div
            className="shadow-md w-full
                rounded-lg hover:shadow-lg cursor-pointer"
          >
            <img
              src={item?.re_image}
              alt={item?.username}
              className="h-[150px] w-[150px] md:w-[220px] md:h-[220px]
                    object-cover rounded-full m-auto mt-3"
            />
            <div
              className="flex flex-col 
                    items-baseline p-3 gap-1"
            >
              <h2
                className="p-1 bg-purple-200
                        text-primary rounded-sm xl:rounded-full px-2
                         text-sm"
              >
                {item?.category?.name}
              </h2>
              <h2 className="font-bold text-sm text-bg_core lg:text-lg">{item?.username} {item?.lastname}</h2>
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
  );
}

export default RecommendationCard;
