import { Link } from "react-router-dom";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, Space } from "antd";
const { confirm } = Modal;
import { ExclamationCircleFilled } from "@ant-design/icons";
import
{
  deleteSuggestion,
  getSuggestionResponse,
  getSuggestionComments,
} from "../../features/suggestions/suggestionSlice";
import Comment from "../../shared/Comment";
import { ThemeContext } from "../../context/ThemeContext";

const SuggestionCard = ({
  setSelected,
  setOpen,
  setOpenComments,
  suggestion,
  setEditPost,
  editPost,
  edit,
  setEdit,
}) =>
{
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext)
  const showDeleteConfirm = (params) =>
  {
    setEdit(false);
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
      onOk()
      {
        const data = {
          account_id: params.account_id,
          suggestion_id: params.suggestion_id,
        };
        dispatch(deleteSuggestion(data));
      },
    });
  };

  const handleSelect = (params) =>
  {
    setSelected(params);
    dispatch(getSuggestionResponse(params?.suggestion_id));
    setOpen(true);
  };

  const handleEdit = (params) =>
  {
    if (edit && editPost)
    {
      setOpenComments(false);

      setOpen(false);
      setEdit(false);
      setEditPost("");
    } else
    {
      setOpenComments(false);

      setOpen(false);
      setEdit(true);
      setEditPost(params);
    }
  };

  const handleComments = (params) =>
  {
    setEdit(false);
    setOpen(false);
    setEdit(false);
    setSelected(params);
    dispatch(getSuggestionComments(params?.suggestion_id));
    setOpenComments(true);
  };

  return (
    <div className={`${theme == "light" ? "text-black" : "text-white"} p-2 w-full border-b border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer`}>
      <div className="w-full flex-col flex lg:flex-row items-center justify-between">
        <h4 className="p-2 text-clr_alt font-bold">
          {suggestion?.suggestion_title}
        </h4>
        <div className={`${theme == "light" ? "text-black" : "text-white"} flex justify-center items-end lg:items-center w-full md:w-max h-full flex-col space-y-2 py-4`}>
          <div className="flex w-full justify-end items-end md:justify-between gap-2">
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
                className="rounded-full object-cover object-center h-[30px] w-[30px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4 justify-between w-full ">
        <h4 className="text-sm md:text-base">{suggestion?.post}</h4>
        <div className="w-max">
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => handleSelect(suggestion)}
              className={`${theme == "light" ? "text-bg_core" : "text-gray-400"} text-sm text-bg_core w-[120px] text-center border-none drop-shadow-none shadow-none`}
            >
              5 responses
            </button>
            <button
              onClick={() => handleComments(suggestion)}
              className={`${theme == "light" ? "text-bg_core" : "text-gray-400"} text-sm  w-[130px] text-center border-none drop-shadow-none shadow-none`}
            >
              5 comments
            </button>
            {currentUser && currentUser?.account_id == suggestion?.account_id ? (
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
      </div>
    </div>
  );
};

export default SuggestionCard;
