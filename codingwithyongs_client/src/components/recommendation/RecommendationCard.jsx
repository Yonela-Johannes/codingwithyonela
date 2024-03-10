import { FaGithub, FaInstagram, FaLinkedin, FaReact } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import data from '../../assets/data.json'

function RecommendationCard({ item, colors }) {
  let color = Math.floor(Math.random() * colors?.length)
  color = colors[color]
  const country = data.find((country) => country.name == item?.country)
  console.log(country)
  return (
    <div className="relative my-5">
      <div className="rounded-md border border-bg_light">
      <div className="flex justify-between">
        <h2 className="font-bold text-[22px] p-3">{item?.title}</h2>
          <div className="flex gap-1 p-2 font-bold text-bg_grey">
            <p className="hidden md:block text-[14px]">{country?.name} -</p>
            <p className="md:block text-[14px]">{country?.code}</p>
            <p>{country?.emoji}</p>
          </div>
      </div>
        <div className="gap-4 mt-3">
          <div
            className="shadow-md 
                rounded-lg hover:shadow-lg cursor-pointer
                 "
          >
            <img
              src={item?.image}
              alt={item?.name}
              className="h-[150px] md:w-[250px] md:h-[200px]
                    object-cover rounded-lg"
            />
            <div
              className="flex flex-col 
                    items-baseline p-3 gap-1"
            >
              <h2
                className="p-1 bg-purple-200
                        text-primary rounded-full px-2
                         text-[12px]"
              >
                {item?.category?.name}
              </h2>
              <h2 className="font-bold text-lg">{item?.name}</h2>
              <div className="flex items-center text-primary gap-4 my-2 text-bg_opp text-lg">
                {item?.portfolio ? (
                  <Link to={item.portfolio} className="">
                    <FaReact />
                  </Link>
                ) : (
                  ""
                )}
                {item?.github ? (
                  <Link to={`https://github.com/${item.github}`} className="">
                    <FaGithub />
                  </Link>
                ) : (
                  ""
                )}
                {item?.linkedin ? (
                  <Link to={item.linkedin} className="">
                    <FaLinkedin />
                  </Link>
                ) : (
                  ""
                )}
                {item?.instagram ? (
                  <Link to={item.instagram} className="">
                    <FaInstagram />
                  </Link>
                ) : (
                  ""
                )}
                <Tooltip title={item?.about} color={color} key={color}>
                  <IoInformationCircleOutline size={22} color={color} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
