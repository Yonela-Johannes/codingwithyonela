import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  deleteSuggestion,
  commentSuggestion,
  createSuggestionResponse,
  getSuggestionResponse,
  getSuggestionComments,
} from "../../features/suggestions/suggestionSlice";
import Comment from "../../shared/Comment";

const Card = ({ setSelectedQuestion, setOpenComments, question, setEdit }) => {
  const { user } = useSelector((state) => state.user);
  const [option, setOption] = useState("comment");
  const [response, setResponse] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const showDeleteConfirm = (params) => {
    setEdit(false);
    setActive(false);
    setOpenComments(false);
    confirm({
      title: `Are you sure delete, ${params.suggestion_title}`,
      icon: <ExclamationCircleFilled />,
      content: "Your  with all its data will be removed",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        const data = {
          account_id: params.account_id,
          suggestion_id: params.suggestion_id,
        };
        dispatch(deleteSuggestion(data));
      },
    });
  };

  const handleSelect = (params) => {
    setActive(false);
    setSelectedQuestion(params);
    dispatch(getSuggestionResponse(params?.suggestion_id));
    setOpenComments(true);
  };

  return (
    <div className="p-2 w-full border rounded-md lg:border-r border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
      <div className="flex w-full flex-col space-y-2 my-2">
        <div className="flex w-full items-start md:justify-end gap-2">
          <div className="space-y-1">
            <p className="text-xs">
              {question?.username} {question?.lastname}
            </p>
            <p className="text-xs dark:text-gray-400">
              {new Date(question?.question_time).toDateString()}
            </p>
          </div>
          <div>
            <img
              src={question?.profile}
              alt="cover"
              className="rounded-full object-cover object-center h-[35px] w-[35px]"
            />
          </div>
        </div>
      </div>
      <div className="flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full ">
        <div className="w-full h-full">
          <h4 className="text-base md:text-xl">{question?.question}</h4>
          <div className="flex">
            <p className="text-xs p-1 font-bold text-bg_core">
              #{question?.category}
            </p>
            <p className="text-xs p-1 font-bold text-bg_core">
              #{question?.topic_name}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full my-4 self-end">
        <div className="flex gap-2 ml-4 text-sm text-center items-center">
          <div
            onClick={() => handleSelect(question)}
            className="text-xs text-bg_core text-center"
          >
            5 likes
          </div>
          <div
            onClick={() => handleSelect(question)}
            className="text-xs text-bg_core w-[130px] text-center"
          >
            5 comments
          </div>
          {/* {user && user?.id && user?.id == question?.account_id ? (
            <>
              <button
                onClick={() => handleEdit(question)}
                className="text-sm text-bg_core w-[70px] text-center"
              >
                {edit ? "Clear" : "Edit"}
              </button>
              <Space wrap>
                <Button
                  onClick={() => showDeleteConfirm(question)}
                  type="dashed"
                >
                  Delete
                </Button>
              </Space>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Card;
