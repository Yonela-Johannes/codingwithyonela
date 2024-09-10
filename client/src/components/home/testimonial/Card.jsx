import React, { useState } from "react";
import { StarIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateFeedback } from "../../../features/feedback/feedbackSlice";
import { Modal } from "antd";

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
    <>
      <div
        onClick={() => (setData(element), setOpen(true))}
        key={element?.id}
        className="relative h-full w-[300px] px-4 py-2 pt-12 cursor-pointer"
      >
        <div
          className={`flex flex-col ${
            theme == "light" ? "bg-bg_lightest shadow-md" : "bg-bg_grey"
          } h-[200px] gap-4 rounded-md p-2 lg:p-4 text-md font-thin`}
        >
          <p className="flex-1 text-sm lg:text-base">
            {element.message?.slice(0, 60)}...
          </p>
          <p className="text-sm text-bg_core font-semibold">See more</p>
          <div className="flex items-center gap-2">
            {[...Array(5)]?.map((_, index) => (
              <StarIcon
                key={index}
                className={`${
                  element?.rating > index
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
          <div className="flex items-center gap-2">
            <img
              src={element?.image}
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
                  {element?.name} {element?.lastname}
                </h6>
                <span
                  className={`w-full block ${
                    theme == "light" ? "text-bg_primary" : "text-bg_lightest"
                  } text-xs font-normal italic lg:text-sm`}
                >
                  {element.company}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p
          className={`${
            theme == "light" ? "text-bg_opp bg-white" : "bg-bg_core rounded-md"
          } text-sm`}
        >
          {element.status}
        </p>
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
              <div className="flex items-center gap-2 mt-3">
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
              <div className="flex items-center gap-2">
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
    </>
  );
};

export default Card;
