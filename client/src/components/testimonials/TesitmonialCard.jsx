import { Link } from "react-router-dom";
import HoverUnderLine from "../HoverUnderLine";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="rounded-md w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
        <div className="flex h-full flex-col space-y-2 px-2 py-4">
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-bold dark:text-gray-400">
                {testimonial?.title}
              </p>
              <p className="text-sm">{testimonial?.author}</p>
            </div>
            <div>
              <img
                src={testimonial?.authorImg}
                alt="cover"
                className="rounded-md object-cover object-center h-[40px] w-[40px]"
              />
            </div>
          </div>
          <h4 className="text-lg">{testimonial?.post}</h4>
          <div className="flex items-start justify-start flex-col text-end">
            <div className="flex gap-2 text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="text-sm md:font-semibold self-end">
              {testimonial?.category}
            </p>
          </div>
        </div>
    </div>
  );
};

export default TestimonialCard;
