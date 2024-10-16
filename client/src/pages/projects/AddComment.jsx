import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProjectFeedback } from "../../features/project/projectSlice";
import toast from "react-hot-toast";

function AddComment({ project, theme }) {
  const { currentUser } = useSelector((state) => state.user);
  const { create_project_feedback } = useSelector(
    (state) => state.project
  );
  const [data, setData] = useState({ comment: "", account: currentUser?.id || '', project_id: project?.project_id});
  const dispatch = useDispatch()

  const createComment = async (e) => {
    e.preventDefault();
    if (!data.comment) return toast("Enter comment text");
    if (!project?.project_id) return toast("Error project");
    if (!currentUser?.id || !data?.account) return toast("Login or sign up to comment");

    dispatch(createProjectFeedback({...data, project_id: project?.project_id}))

  };

  useEffect(() => {
    if(create_project_feedback){
      setData( {comment: "", account: currentUser?.id || '', project_id: project?.project_id })
    }
  }, [create_project_feedback]);

  return (
    <div className="mb-10">
      <h3 className={`{${theme == 'light' ? '' : ''} lg:text-md my-5 `}>
        What do you think about {project?.project_name} ?
      </h3>

      <div className="flex  flex-col  items-start justify-start gap-3">
        <textarea
          name="comment"
          id="comment"
          onChange={(e) => setData({ ...data, comment: e.target.value })}
          value={data.comment}
          className="block p-2.5 w-4/6 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="How can we improve..."
        ></textarea>
        <button
          className="flex items-center bg-clr_alt text-white py-2 justify-center text-md relative rounded px-5"
          onClick={createComment}
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default AddComment;
