import { useDispatch, useSelector } from "react-redux";
import { Watermark } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { Modal } from "antd";
import { getAllTopics } from "../../features/topic/topicSlice";
import { getAllCategories } from "../../features/category/categorySlice";
import toast from "react-hot-toast";
import {
  createQuestion,
  createQuestionComment,
  getAllQuestions,
  getResponses,
} from "../../features/question/questionSlice";
import Card from "./Card";
import moment from "moment";

const Questions = () => {
  const { user } = useSelector((state) => state.user);
  const { questions, created, loading, commented, comments } = useSelector(
    (state) => state.question
  );
  const { categories } = useSelector((state) => state.categories);
  const { topics } = useSelector((state) => state.topic);
  const [openComment, setOpenComment] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(false);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [skill, setSkill] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  useEffect(() => {
    if (created) {
      setQuestion("");
      setCategory("");
      setSkill("");
      setOpen(false);
      toast("Created successful");
    } else if (commented) {
      toast("Comment created successful");
      setComment("");
      dispatch(getResponses(selectedQuestion?.question_id));
    } else if (selectedQuestion) {
      dispatch(getResponses(selectedQuestion?.question_id));
    }
  }, [created, commented, selectedQuestion]);

  const commentHandler = async () => {
    if (comment > 200) {
      toast("Must be less or equal 200 characters");
    } else {
      if ((selectedQuestion && user && user?.id, comment)) {
        const data = {
          account_id: user?.id,
          comment: comment,
          question_id: selectedQuestion?.question_id,
        };
        dispatch(createQuestionComment(data));
      }
    }
  };

  const questionHandler = () => {
    if (user && user?.id) {
      if (question.length > 10) {
        if (category && skill) {
          const data = {
            account_id: user?.id,
            question: question,
            category_id: category,
            topic_id: skill,
          };
          dispatch(createQuestion(data));
        } else {
          toast("Category and Topic required!");
        }
      } else {
        toast("Question too short");
      }
    } else {
      toast("You are not authorized");
    }
  };
  return (
    <div className="h-full my-5 w-full ">
      <div className="flex items-start w-full mb-8 justify-between lg:px-10">
        {topics && topics?.length > 0 ? (
          <div className="grid grid-cols-1 w-max gap-2">
            <select>
              {topics?.map((element) => (
                <option
                  key={element?.id}
                  className="flex items-center cursor-pointer gap-4 rounded-none border-none border-b border-bg_core drop-shadow-none w-full"
                >
                  {element?.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          ""
        )}

        <button
          onClick={() => setOpen(true)}
          title="Add recommendation"
          className="flex p-0 items-center justify-center text-lg bg-clr_alt text-white rounded-full w-11 h-11"
        >
          <MdOutlineAdd size={20} />
        </button>
      </div>
      {loading ? (
        "loading"
      ) : loading == false && questions?.length == 0 ? (
        "No data"
      ) : questions?.length > 0 && loading == false ? (
        <div className="flex flex-col gap-8 h-full lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden py-4 gap-8 h-full w-full">
            {questions?.map((question) => (
              <Card
                key={question?.id}
                setSelectedQuestion={setSelectedQuestion}
                setOpenComments={setOpenComment}
                question={question}
                setEdit={setEdit}
              />
            ))}
          </div>
        </div>
      ) : (
        "No data"
      )}
      <>
        <Modal
          title="Recommend"
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <div className="rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
            <div className="rounded-md pb-2 p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core h-full duration-200 cursor-pointer">
              <div>
                <div className="flex items-start justify-start">
                  <div>
                    <select onChange={(e) => setCategory(e.target.value)}>
                      {categories?.map((elem) => (
                        <option
                          key={elem?.category_id}
                          value={elem?.category_id}
                        >
                          {elem?.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select onChange={(e) => setSkill(e.target.value)}>
                      {topics?.map((elem) => (
                        <option key={elem?.id} value={elem?.id}>
                          {elem?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={2}
                    placeholder="Question*"
                  ></textarea>
                </div>
              </div>
              <div>
                <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                  <div className="flex items-center bg-clr_alt text-white rounded-full md:justify-between gap-2">
                    <div className="space-y-1py-1 pl-3">
                      <p className="text-xs">
                        {user?.username} {user?.lastname}
                      </p>
                    </div>
                    <div>
                      <img
                        src={user?.profile}
                        alt="cover"
                        className="rounded-full object-cover object-center h-[35px] w-[35px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={questionHandler}>Ask</button>
          </div>
        </Modal>
      </>
      <>
        <Modal
          title={`Comments`}
          centered
          open={openComment}
          onOk={() => setOpenComment(false)}
          onCancel={() => setOpenComment(false)}
          width={1000}
        >
          <div className="rounded-md overflow-hidden p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
            <div className="p-2 w-full border-b border-bg_light hover:border-bg_core duration-200 cursor-pointer">
              <div className="flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full ">
                <div className="w-full h-full">
                  <h4 className="text-sm md:text-base">
                    {selectedQuestion?.question}
                  </h4>
                  <div className="flex">
                    <p className="text-xs p-1 font-bold text-bg_core">
                      #{selectedQuestion?.category}
                    </p>
                    <p className="text-xs p-1 font-bold text-bg_core">
                      #{selectedQuestion?.topic_name}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex w-full md:w-max h-full flex-col space-y-2">
                    <div className="flex w-full items-start md:justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-xs">
                          {selectedQuestion?.username}{" "}
                          {selectedQuestion?.lastname}
                        </p>
                        <p className="text-xs dark:text-gray-400">
                          {new Date(
                            selectedQuestion?.question_time
                          ).toDateString()}
                        </p>
                      </div>
                      <div>
                        <img
                          src={selectedQuestion?.profile}
                          alt="cover"
                          className="rounded-full object-cover object-center h-[35px] w-[35px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {user && user?.id ? (
              <div className="rounded-md p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full border border-bg_light hover:border-bg_core duration-200 cursor-pointer">
                <div>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={1}
                    placeholder="Comment*"
                  ></textarea>
                </div>
                <div>
                  <div className="flex w-full md:w-max h-full flex-col space-y-2">
                    <div className="flex items-center text-black rounded-full md:justify-between gap-2">
                      <div>
                        <img
                          src={user?.profile}
                          alt="cover"
                          className="rounded-full object-cover object-center h-[35px] w-[35px]"
                        />
                      </div>
                      <button onClick={commentHandler}>Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            {loading ? (
              "loading"
            ) : loading == false && comments?.length == 0 ? (
              "No data"
            ) : comments?.length > 0 && loading == false ? (
              <div className="overflow-y-scroll max-h-96 rounded-md p-2 flex-col flex items-start gap-2 md:gap-4 justify-between w-full border duration-200 cursor-pointer">
                {comments?.map((res) => (
                  <div
                    key={res?.id}
                    className="rounded-md p-2 flex-col flex md:flex-row items-start gap-2 md:gap-4 justify-between w-full h-full duration-200 cursor-pointer"
                  >
                    <h4 className="text-sm md:text-base">{res?.comment}</h4>
                    <div>
                      <div className="flex w-full md:w-max h-full flex-col space-y-2 pb-4">
                        <div className="flex items-center text-bg_core rounded-full md:justify-between gap-2">
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
                              className="rounded-full object-cover object-center h-[30px] w-[30px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "No data"
            )}
          </div>
        </Modal>
      </>
    </div>
  );
};

export default Questions;
