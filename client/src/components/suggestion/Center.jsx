import { useDispatch, useSelector } from "react-redux";
import Headers from "../../shared/Headers";
import Sender from "../../shared/Sender";
import Suggestion from "../../shared/Suggestion";
import { useState, useEffect } from "react";
import {
  createSuggestion,
  updateSuggestion,
} from "../../features/suggestions/suggestionSlice";
import { getAllCategories } from "../../features/category/categorySlice";
import toast from "react-hot-toast";

const Center = ({ user }) => {
  const { success, deleted, updated } = useSelector(
    (state) => state.suggestion
  );
  const { categories } = useSelector((state) => state?.categories);
  const [edit, setEdit] = useState(false);
  const [category, setCategory] = useState("");
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [editPost, setEditPost] = useState({});
  const [option, setOption] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (edit && editPost) {
      setResponse(editPost?.post);
      setTitle(editPost?.suggestion_title);

      setOption(["edit"]);
    } else {
      setResponse("");
      setTitle("");
      setOption([]);
    }
  }, [edit, editPost]);

  const sendMessageHander = async (params) => {
    if (title?.length >= 50) {
      toast("Title should not be more than 50 characters");
    } else if (!category) {
      toast("Select category");
    } else if (
      (params,
      edit == true &&
        editPost &&
        option == "edit" &&
        title &&
        category &&
        user &&
        user?.id)
    ) {
      console.log(editPost);
      const data = {
        account_id: user?.id,
        post: params,
        status_id: null,
        category_id: category,
        suggestion_title: title,
        suggestion_id: editPost?.suggestion_id,
      };
      dispatch(updateSuggestion(data));
    } else if (response && params && title && category && user && user?.id) {
      const data = {
        account_id: user?.id,
        post: params,
        status_id: null,
        category_id: category,
        suggestion_title: title,
      };
      dispatch(createSuggestion(data));
    } else {
      toast("Error something went wrong");
    }
  };

  useEffect(() => {
    if (success) {
      setResponse("");
      setTitle("");
      setEditPost("");
      toast("Create successful");
    } else if (deleted) {
      toast("Deleted successful");
    } else if (updated) {
      setResponse("");
      setTitle("");
      setEditPost("");
      toast("Update successful");
    }
  }, [success, deleted, updated]);

  return (
    <div className={`${user && user?.id ? "relative pt-40" : " "} flex  items-center flex-col w-full`}>
      {user && user?.id ? (
        <div className="absolute top-0 w-full">
          <Sender
            handler={sendMessageHander}
            response={response}
            setResponse={setResponse}
            options={option}
            name="suggestion_response"
            placeholder="Share idea*"
            setEdit={setEdit}
            text_placeholder="Title*"
            title={title}
            setTitle={setTitle}
            setCategory={setCategory}
            categories={categories}
          />
        </div>
      ) : (
        ""
      )}
      <Suggestion
        editPost={editPost}
        setEditPost={setEditPost}
        edit={edit}
        setEdit={setEdit}
      />
    </div>
  );
};

export default Center;
