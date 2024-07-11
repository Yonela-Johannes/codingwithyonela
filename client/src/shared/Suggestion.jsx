import { useEffect, useState } from "react";
import Header from "../components/blog/Header";
import SuggestionCard from "../components/suggestion/SuggestionCard";
import { useDispatch, useSelector } from "react-redux";
import
{
  commentSuggestion,
  createSuggestionResponse,
  getAllSuggestions,
  getSuggestion,
} from "../features/suggestions/suggestionSlice";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import moment from "moment/moment";
import { Modal } from "antd";
import Comment from "./Comment";
import Loader from "../components/Loader/Loader";

const Suggestion = ({ setEditPost, editPost, edit, setEdit }) =>
{
  const [open, setOpen] = useState(false);
  const [openComments, setOpenComments] = useState(false);
  const [option, setOption] = useState("comment");
  const [response, setResponse] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const {
    suggestions,
    suggestion,
    responses,
    comments,
    loading,
    success,
    deleted,
    updated,
  } = useSelector((state) => state.suggestion);
  const [selected, setSelected] = useState({});

  const fetchSuggestions = () =>
  {
    dispatch(getAllSuggestions());
  };

  useEffect(() =>
  {
    fetchSuggestions();
  }, []);

  // useEffect(() => {
  //   fetchSuggestions();
  // }, [success, responses, updated, deleted]);

  useEffect(() =>
  {
    fetchSuggestions();
  }, []);

  const sendComment = async (params, element) =>
  {
    if (
      response &&
      params &&
      user &&
      user?.id &&
      element &&
      element?.suggestion_id
    )
    {
      const data = {
        account_id: user?.id,
        comment: params,
        suggestion_id: element?.suggestion_id,
      };
      dispatch(commentSuggestion(data));
    }
  };

  const sendResponse = async (params, element) =>
  {
    if (
      response &&
      params &&
      user &&
      user?.id &&
      element &&
      element?.suggestion_id
    )
    {
      const data = {
        account_id: user?.id,
        response: params,
        suggestion_id: element?.suggestion_id,
      };
      dispatch(createSuggestionResponse(data));
    }
  };

  return (
    <div className="w-full">
      {loading ? (
        <Loader />
      ) : suggestions?.length == 0 ? (
        ""
      ) : suggestions?.length > 0 && loading == false ? (
        <div className="flex flex-col gap-8 h-full lg:px-10">
          <div className="grid grid-cols-1 overflow-hidden py-4 gap-6 h-full max-w-[800px]">
            {suggestions?.map((suggestion) => (
              <SuggestionCard
                setSelected={setSelected}
                setOpen={setOpen}
                suggestion={suggestion}
                key={suggestion?.id}
                editPost={editPost}
                setEditPost={setEditPost}
                edit={edit}
                setEdit={setEdit}
                setOpenComments={setOpenComments}
              />
            ))}
          </div>
        </div>
      ) : (
        "No data"
      )}

      <Modal
        title={`${selected?.suggestion_title} - response`}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        okButtonProps={{
          display: false,
        }}
        cancelButtonProps={{}}
      >
        {loading ? (
          <Loader />
        ) : responses?.length < 1 ? (
          ""
        ) : responses?.length > 0 ? (
          <div className="overflow-y-scroll max-h-96 rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
            <div className="w-full">
              <Comment
                suggestion={suggestion}
                handler={sendResponse}
                response={response}
                setResponse={setResponse}
                placeholder="Share your thoughts on this*"
              />
            </div>
            {responses?.map((res) => (
              <div
                key={res?.id}
                className="p-2 flex-col lg:flex-row flex items-start gap-2 md:gap-4 justify-between w-full border-b border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer"
              >
                <div className="flex w-min flex-row md:flex-col md:text-2xl items-center justify-evenly h-full gap-2 text-clr_alt rounded-md p-2">
                  <div className="flex gap-1 items-center">
                    <BiUpvote />
                    <p className="text-sm">5</p>
                  </div>
                  <div className="flex text-black gap-1 items-center">
                    <BiDownvote />
                    <p className="text-sm">10</p>
                  </div>
                </div>
                <h4 className="text-sm md:text-base w-full text-center">
                  {res?.response}
                </h4>
                <div className="flex w-full lg:w-max items-end justify-end">
                  <div className="flex items-end w-full md:w-max h-full flex-col space-y-2 pb-4">
                    <div className="flex  md:flex-col items-end md:justify-between gap-2">
                      <div className="lg:space-y-1">
                        <p className="text-xs dark:text-gray-400">
                          {new Date(res?.sug_re_time).toDateString()}
                        </p>
                        <p className="text-xs">
                          {res?.username} {res?.lastname}
                        </p>
                      </div>
                      <div>
                        <img
                          src={res?.profile}
                          alt="cover"
                          className="rounded-full h-[30px] w-[30px] lg:rounded-md object-cover object-center md:h-[50px] md:w-[50px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </Modal>

      {/* Comments Modal */}
      <Modal
        title={`${selected?.suggestion_title} - comments`}
        centered
        open={openComments}
        onOk={() => setOpenComments(false)}
        onCancel={() => setOpenComments(false)}
        width={1000}
        okButtonProps={{
          display: false,
        }}
        cancelButtonProps={{}}
      >
        {loading ? (
          <Loader />
        ) : comments?.length < 1 ? (
          ""
        ) : comments?.length > 0 ? (
          <div className="overflow-y-scroll max-h-96 rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
            <div className="flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full ">
              <div className="flex gap-1 items-center">
                <div className="flex w-min flex-row md:flex-col md:text-2xl items-center justify-evenly h-full gap-2 text-clr_alt rounded-md p-2">
                  <BiUpvote />
                  <p className="text-sm">{selected?.upvotes}</p>
                </div>
                <div className="flex text-black gap-1 items-center">
                  <BiDownvote />
                  <p className="text-sm">{selected?.downvotes}</p>
                </div>
              </div>
              <h4 className="text-sm md:text-base">{selected?.post}</h4>
              <div>
                <div className="cursor-pointer"></div>
                <div className="flex w-full md:w-max h-full flex-col space-y-2 py-4">
                  <div className="flex w-full md:flex-col items-end md:justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-xs dark:text-gray-400">
                        {new Date(selected?.suggestion_time).toDateString()}
                      </p>
                      <p className="text-xs">
                        {selected?.username} {selected?.lastname}
                      </p>
                    </div>
                    <div>
                      <img
                        src={selected?.profile}
                        alt="cover"
                        className="rounded-md object-cover object-center h-[50px] w-[50px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Comment
                suggestion={suggestion}
                handler={sendComment}
                response={response}
                setResponse={setResponse}
                placeholder="Share your thoughts on this*"
              />
            </div>
            {comments?.map((res) => (
              <div
                key={res?.id}
                className="rounded-md p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer"
              >
                <h4 className="text-sm md:text-base">{res?.comment}</h4>
                <div>
                  <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                    <div className="flex items-center bg-clr_alt text-white rounded-full md:justify-between gap-2">
                      <div className="space-y-1py-1 pl-3">
                        <p className="text-xs">
                          {res?.username} {res?.lastname}
                        </p>
                        <p className="text-xs dark:text-gray-400">
                          {moment(res?.sug_com_time).fromNow()}
                        </p>
                      </div>
                      <div>
                        <img
                          src={res?.profile}
                          alt="cover"
                          className="rounded-full object-cover object-center h-[35px] w-[35px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default Suggestion;
