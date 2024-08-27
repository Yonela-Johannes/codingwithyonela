import { useContext } from "react";
import { features } from "../../data/data";
import { ThemeContext } from "../../context/ThemeContext";

const FeatureSection = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="relative mt-20 border-b border-neutral-800 min-h-[800px]">
      <div className="text-start">
        <span className="bg-bg_grey text-cl_primary rounded-full h-6 text-sm font-medium px-2 py-1">
          Feature
        </span>
        <h2 className="text-xl sm:text-3xl lg:text-4xl mt-10 lg:mt-20 tracking-wide">
          Easily track{" "}
          <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} bg-clip-text`}>
            project progress
          </span>
        </h2>
      </div>
      <div className="flex flex-wrap mt-10 lg:mt-20">
        {features.map((feature, index) =>
        {
          const Icon = feature?.icon
          return (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
              <div className="lg:flex mb-10">
                <div className="flex text-xl lg:mx-6 h-10 w-10 p-1 lg:p-2 bg-bg_grey text-cl_primary justify-center items-center rounded-full">
                  <Icon size={20} />
                </div>
                <div>
                  <h5 className={`${theme !== "light" ? "text-clr_alt" : "text-cl_primary"} mt-1 mb-2 lg:mb-6 lg-text-xl font-normal`}>{feature.text}</h5>
                  <p className={`text-sm lg:text-base ${theme == "light" ? "text-bg_primary" : "text-bg_lightest"} max-w-2xl`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default FeatureSection;
