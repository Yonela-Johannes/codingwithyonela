import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SlideLeft, SlideUp } from "../../animation/animate";
import okuhle from "../../assets/okuhle.png";
import yonela from "../../assets/yonela.png";
import { ThemeContext } from "../../context/ThemeContext";

const TestimonialData = [
  {
    id: 1,
    name: "Okuhle Tapuko",
    designation: "Quality Assurance Engineer",
    img: okuhle,
    text: "You should never feel afraid to become a piece of art. It's exhilarating.",
    author: "Miguel de Cervantes",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Yonela Johannes",
    designation: "Full Stack Developer",
    img: yonela,
    text: "It's up to brave hearts, sir, to be patient when things are going badly, as well as being happy when they're going well.",
    author: "Nicki Minaj",
    delay: 0.4,
  },
];
const Testimonial = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="mt-10 lg:mt-20">
      {/* heading title */}
      <div className="space-y-4 max-w-[550px] mb-8">
        <motion.h1
          variants={SlideUp(0.2)}
          initial="initial"
          whileInView="animate"
          className="text-xl lg:text-4xl font-bold"
        >
          Our Team
        </motion.h1>
        <motion.p
          variants={SlideUp(0.4)}
          initial="initial"
          whileInView="animate"
          className="text-gray-500 text-sm max-w-[350px]"
        >
          Bring your dream home to life with one-on-one design help & hand
          picked products
        </motion.p>
      </div>
      {/* tesitomonial cards */}
      <div className="">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-6">
          {TestimonialData?.map((card) => {
            return (
              <motion.div
                variants={SlideLeft(card.delay)}
                initial="initial"
                whileInView="animate"
                key={card.id}
                className={`flex flex-col ${
                  theme == "light" ? "bg-bg_lightest" : "bg-bg_grey"
                } h-[220px] gap-4 p-2 lg:p-4 text-md font-thin border border-cl_primary shadow-md shadow-cl_primary space-y-4 text-center w-full max-w-[550px] mx-auto mb-8 px-5 py-10 cursor-pointer hover:bg-bg_lighter`}
              >
                {/* Upper section */}
                <div className="flex flex-row items-center gap-3 ">
                  <img
                    src={card.img}
                    alt="cover"
                    className="rounded-full object-cover object-center h-[60px] w-[60px]"
                  />
                  <div>
                    <p
                      className={`${
                        theme == "light" ? "text-clr_alt" : "text-cl_primary"
                      } text-sm lg:text-base text-start font-semibold`}
                    >
                      {card.name}
                    </p>
                    <p
                      className={`w-full block ${
                        theme == "light"
                          ? "text-bg_primary"
                          : "text-bg_lightest"
                      } text-xs font-normal text-start lg:text-sm`}
                    >
                      {card.designation}
                    </p>
                  </div>
                </div>
                {/* Bottom section */}
                <div className="mt-5 border-t-2 border-gray-500/40 pt-5">
                  <p className="text-sm group-hover:text-black duration-300">
                    {card.text}
                  </p>
                  <p className="text-xs italic group-hover:text-black duration-300 mt-1">
                    - {card.author}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
