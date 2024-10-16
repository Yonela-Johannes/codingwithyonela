import React, { useState } from "react";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedback } from "../../../features/feedback/feedbackSlice";
import { Modal } from "antd";
import { motion } from "framer-motion";
import { SlideLeft } from "../../../animation/animate";

const Card = ({ element, theme }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const handleStatusChange = (e, id) => {
    e.preventDefault();
    if (id) {
      const data = {
        feedback_id: id,
        user_id: currentUser?.id,
        status: e.target.value,
      };
      dispatch(updateFeedback(data));
    }
  };

  return (
    <motion.div
      variants={SlideLeft(0.2)}
      initial="initial"
      whileInView="animate"
    >
      <div
        onClick={() => (setData(element), setOpen(true))}
        key={element?.id}
        className={`flex flex-col ${
          theme == "light" ? "bg-bg_lightest" : "bg-bg_grey"
        } h-[220px] gap-4 p-2 lg:p-4 text-md font-thin border border-cl_primary shadow-cl_primary shadow-md space-y-4 text-center w-full max-w-[550px] mx-auto mb-8 px-5 cursor-pointer hover:bg-bg_lighter`}
      >
        <div className={`flex flex-col`}>
          <div className="flex flex-row items-center gap-3">
            <img
              src={element?.image}
              alt="cover"
              className="rounded-full object-cover object-center h-[60px] w-[60px]"
            />
            <div className="lg:flex flex-col items-start justify-between">
              <div>
                <h6
                  className={`${
                    theme == "light" ? "text-clr_alt" : "text-cl_primary"
                  } text-sm lg:text-base text-start font-semibold`}
                >
                  {element?.name} {element?.lastname}
                </h6>
                <span
                  className={`w-full block ${
                    theme == "light" ? "text-bg_primary" : "text-bg_lightest"
                  } text-xs font-normal text-start lg:text-sm`}
                >
                  {element.company}
                </span>
              </div>
              <div className="flex flex-row items-center gap-3">
                {[...Array(5)]?.map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`${
                      element?.rating > index
                        ? ""
                        : "fill-muted stroke-muted-foreground"
                    } h-5 w-5 ${
                      theme == "light"
                        ? "fill-cl_primary_alt text-clr_alt"
                        : "fill-clr_alt text-cl_primary"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 border-t-2 border-gray-500/40 pt-5">
            <p className="flex-1 text-sm lg:text-base">
              {element.message?.slice(0, 60)}...
            </p>
            <p className="text-sm">See more</p>
          </div>
        </div>
        {currentUser?.is_staff || currentUser?.is_admin ? (
          <p
            className={`${
              theme == "light"
                ? "text-bg_opp bg-bg_lighter"
                : "bg-bg_core rounded-full"
            } text-sm w-max rounded-full`}
          >
            {element.status}
          </p>
        ) : (
          ""
        )}
      </div>
      <Modal
        title=""
        centered
        open={open}
        onCancel={() => setOpen(false)}
        width={800}
        footer={false}
        height={500}
      >
        {data ? (
          <div
            className={`flex flex-col ${
              theme == "light" ? "bg-bg_lightest shadow-md" : "bg-bg_grey"
            } gap-4 rounded-md p-2 lg:p-4 text-md font-thin h-full w-full px-4 py-2`}
          >
            <div
              className={`flex flex-col ${
                theme == "light" ? "bg-bg_lightest" : "bg-bg_grey"
              } gap-4 rounded-md p-2 lg:p-4 text-md font-thin`}
            >
              <p className="flex-1 text-sm lg:text-base">{element.message}</p>
              <div className="flex flex-row items-center gap-3 mt-3">
                {[...Array(5)]?.map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`${
                      data?.rating > index
                        ? ""
                        : "fill-muted stroke-muted-foreground"
                    } h-5 w-5 ${
                      theme == "light"
                        ? "fill-clr_alt text-clr_alt"
                        : "fill-cl_primary text-cl_primary"
                    }`}
                  />
                ))}
              </div>
              <div className="flex flex-row items-center gap-3">
                <img
                  src={data?.image}
                  alt="cover"
                  className="rounded-full object-cover object-center h-[40px] w-[40px]"
                />
                <div className="lg:flex flex-col items-start justify-between">
                  <div>
                    <h6
                      className={`${
                        theme == "light" ? "text-clr_alt" : "text-cl_primary"
                      } text-sm lg:text-base font-semibold`}
                    >
                      {data?.name} {data?.lastname}
                    </h6>
                    <span
                      className={`w-full block ${
                        theme == "light"
                          ? "text-bg_primary"
                          : "text-bg_lightest"
                      } text-xs font-normal italic lg:text-sm`}
                    >
                      {data.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {currentUser && (currentUser?.is_staff || currentUser?.is_admin) ? (
              <select
                value={data.status}
                onChange={(e) => handleStatusChange(e, data?.id)}
                className={`${
                  theme == "light"
                    ? "text-bg_opp bg-white"
                    : "bg-bg_core rounded-md"
                }`}
              >
                <option value="" disabled selected hidden>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="accepted">Accept</option>
              </select>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </Modal>
    </motion.div>
  );
};

export default Card;
