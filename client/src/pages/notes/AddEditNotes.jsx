import React, { useContext, useEffect, useState } from "react";
import TagInput from "../../components/notes/Input/TagInput ";
import { ThemeContext } from "../../context/ThemeContext";
import { RiTaskFill } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { PiTagSimpleDuotone } from "react-icons/pi";
import { Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, updateNote } from "../../features/notes/notesSlice";

const AddEditNotes = ({ onClose, noteData, type }) => {
  const { theme } = useContext(ThemeContext);
  const { loading, created, updated, deleted } = useSelector(
    (state) => state.note
  );
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setTags([]);
  }

  //   Edit Note
  const editNote = async () => {
    dispatch(updateNote({ title, content, tags: JSON.stringify(tags), id: noteData?.id}))
  };

  //   Add Note
  const addNewNote = async () => {
    dispatch(createNote({ title, content, tags: JSON.stringify(tags)}))
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  useEffect(() => {
    if (created) {
      clearInputs()
    } else if (updated) {
      clearInputs()
    } else if (deleted) {
      clearInputs()
    }
  }, [created, updated, deleted]);

  return (
    <div className="relative flex flex-col gap-2 lg:gap-4 mt-2 lg:mt-4">
      <div
        className={`flex items-center w-full border ${
          theme == "light"
            ? "text-black bg-gray-200"
            : "bg-bg_card text-bg_grey"
        }`}
      >
        <RiTaskFill size={24} />
        <input
          type="text"
          className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
            theme == "light"
              ? "text-black bg-gray-200"
              : "bg-bg_card text-bg_grey"
          }`}
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div
        className={`flex items-center w-full border ${
          theme == "light"
            ? "text-black bg-gray-200"
            : "bg-bg_card text-bg_grey"
        }`}
      >
        <GoTasklist size={24} />
        <textarea
          type="text"
          className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
            theme == "light"
              ? "text-black bg-gray-200"
              : "bg-bg_card text-bg_grey"
          }`}
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div
        className={`flex items-center border ${
          theme == "light"
            ? "text-black bg-gray-200"
            : "bg-bg_card text-bg_grey"
        } w-max`}
      >
        <PiTagSimpleDuotone size={24} />
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className={`flex items-center justify-center rounded-none w-full py-2 text-center border-none font-bold ${
          theme == "light"
            ? "bg-cl_primary text-bg_core"
            : "bg-clr_alt text-bg_lightest"
        }`}
        onClick={handleAddNote}
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" />
            <span className="pl-3">Loading...</span>
          </>
        ) : (
          type === "edit" ? "UPDATE" : "ADD"
        )}
      </button>
    </div>
  );
};

export default AddEditNotes;
