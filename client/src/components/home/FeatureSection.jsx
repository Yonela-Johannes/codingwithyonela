import { useContext } from "react";
import { features } from "../../data/data";
import { ThemeContext } from "../../context/ThemeContext";
import { Head } from "../../shared/Head";

const FeatureSection = () =>
{
  const { theme } = useContext(ThemeContext)
  return (
    <div className="relative mt-10 lg:mt-20">
      <div className="space-y-4 max-w-[550px] mb-8">
        <Head title='Project Progress' desc='Stay updated on the latest advancements and milestones in our ongoing projects.' theme={theme} />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) =>
        {
          const Icon = feature?.icon
          return (
            <div key={index} className={`flex items-start justify-center ${theme == 'light' ? 'bg-bg_lightest' : 'bg-bg_primary'} border border-cl_primary shadow-cl_primary shadow-[5px_5px_0px_0px_#6c6c6c] w-full p-2`}>
              <div className="lg:flex flex-col">
                <div className="flex text-xl lg:mx-6 h-10 w-10 p-1 lg:p-2 bg-bg_grey text-cl_primary justify-center items-center rounded-full">
                  <Icon size={20} />
                </div>
                <div>
                  <h5 className={`${theme !== "light" ? "text-clr_alt" : "text-clr_alt"} mt-1 mb-2 lg:mb-6 lg-text-xl font-normal`}>{feature.text}</h5>
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
