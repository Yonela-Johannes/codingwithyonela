import { FaGithub, FaLinkedin, FaReact } from "react-icons/fa";

function RecommendationCard({ item, colors })
{
  let color = Math.floor(Math.random() * colors?.length)
  color = colors[color]
  console.log(item)
  return (
    <div className="relative">
      <div className="rounded-md">
        <div className="flex gap-1 items-center px-2 font-bold justify-end text-black">
          <p className={`md:block text-xs bg-${color}-600 rounded-md`}>{item?.country_name.slice(0, 15)} - {item?.country_code}</p>
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
              className="h-[150px] w-full rounded-lg md:h-[220px]
                    object-cover mt-3 m-auto"
            />
            <div
              className="flex flex-col 
                    items-baseline p-3 gap-1"
            >
              <p
                className="p-1 bg-purple-200
                        text-primary rounded-sm xl:rounded-full px-2
                         text-sm"
              >
                {item?.category?.name}
              </p>
              <h2 className="font-bold text-sm text-bg_core lg:text-lg">{item?.username} {item?.lastname}</h2>
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
  );
}

export default RecommendationCard;
