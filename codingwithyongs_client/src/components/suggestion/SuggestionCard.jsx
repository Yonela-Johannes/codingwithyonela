import { Link } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Space } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import { deleteSuggestion, commentSuggestion, createSuggestionResponse, getSuggestion, getSuggestionResponse, getSuggestionComments } from "../../features/suggestions/suggestionSlice";
import Comment from "../../shared/Comment";

const SuggestionCard = ({
  setSelected,
  setOpen,
  setOpenComments,
  suggestion,
  setEditPost,
  editPost,
  edit,
  setEdit,
}) => {
  const { user } = useSelector((state) => state.user);
  const [option, setOption] = useState('comment');
  const [response, setResponse] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const showDeleteConfirm = (params) => {
    setEdit(false);
    setActive(false);
    setOpen(false);
    setEdit(false);
    setOpenComments(false);
    confirm({
      title: `Are you sure delete, ${params.suggestion_title}`,
      icon: <ExclamationCircleFilled />,
      content: "Your suggestion with all its data will be removed",
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
    setSelected(params);
    dispatch(getSuggestionResponse(params?.suggestion_id))
    setOpen(true);
  };

  const handleEdit = (params) => {
    if (edit && editPost) {
      setOpenComments(false);
      setActive(false);
      setOpen(false);
      setEdit(false);
      setEditPost("");
    } else {
      setOpenComments(false);
      setActive(false);
      setOpen(false);
      setEdit(true);
      setEditPost(params);
    }
  };

  const handleComments = (params) => {
    setEdit(false);
    setActive(false);
    setOpen(false);
    setEdit(false);
    setSelected(params);
    dispatch(getSuggestionComments(params?.suggestion_id))
    setOpenComments(true);
  };

  const sendMessageHander = async (params, element) => {
    if (option == "comment" && response && params && user && user?.id && element && element?.suggestion_id) {
      const data = {
        account_id: user?.id,
        comment: params,
        suggestion_id: element?.suggestion_id
      };
      dispatch(commentSuggestion(data));
    } else if (response && option == "respond" && params && user && user?.id && element && element?.suggestion_id) {
      const data = {
        account_id: user?.id,
        response: params,
        suggestion_id: element?.suggestion_id
      };
      dispatch(createSuggestionResponse(data));
    }
  };
  return (
    <div className="rounded-md p-2 w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
      <h4 className="p-2 text-clr_alt font-bold">
        {suggestion?.suggestion_title}
      </h4>
      <div className="flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full ">
        <div className="flex gap-1 items-center">
          <div className="flex w-min flex-row md:flex-col md:text-2xl items-center justify-evenly h-full gap-2 text-clr_alt rounded-md p-2">
            <BiUpvote />
            <p className="text-sm">{suggestion?.upvotes}</p>
          </div>
          <div className="flex text-black gap-1 items-center">
            <BiDownvote />
            <p className="text-sm">{suggestion?.downvotes}</p>
          </div>
        </div>
        <h4 className="text-sm md:text-base">{suggestion?.post}</h4>
        <div>
          <div className="cursor-pointer"></div>
          <div className="flex w-full md:w-max h-full flex-col space-y-2 py-4">
            <div className="flex w-full md:flex-col items-end md:justify-between gap-2">
              <div className="space-y-1">
                <p className="text-xs dark:text-gray-400">
                  {new Date(suggestion?.suggestion_time).toDateString()}
                </p>
                <p className="text-xs">
                  {suggestion?.username} {suggestion?.lastname}
                </p>
              </div>
              <div>
                <img
                  src={suggestion?.profile}
                  alt="cover"
                  className="rounded-md object-cover object-center h-[50px] w-[50px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-4">
        <div className="flex gap-4 text-sm text-center items-center justify-center">
          <button
            onClick={() => handleSelect(suggestion)}
            className="text-sm text-bg_core w-[120px] text-center"
          >
            5 reactions
          </button>
          <button
            onClick={() => setActive(!active)}
            className="text-sm text-bg_core w-[90px] text-center"
          >
            {active ? "close" : "respond"}
          </button>
          <button
            onClick={() => handleComments(suggestion)}
            className="text-sm text-bg_core w-[130px] text-center"
          >
            5 comments
          </button>
          {user && user?.id && user?.id == suggestion?.account_id ? (
            <>
              <button
                onClick={() => handleEdit(suggestion)}
                className="text-sm text-bg_core w-[70px] text-center"
              >
                {edit ? "Clear" : "Edit"}
              </button>
              <Space wrap>
                <Button
                  onClick={() => showDeleteConfirm(suggestion)}
                  type="dashed"
                >
                  Delete
                </Button>
              </Space>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      {active ? (
        <Comment
          suggestion={suggestion}
          handler={sendMessageHander}
          response={response}
          setResponse={setResponse}
          setActive={setActive}
          options={["comment", "respond"]}
          name="suggestion_response"
          placeholder="Share your thoughts on this*"
          setOption={setOption}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SuggestionCard;
