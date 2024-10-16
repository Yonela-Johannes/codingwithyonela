import React, { useContext, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { ThemeContext } from "../../../context/ThemeContext";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className={`flex w-full px-3 outline-none border-transparent focus:border-transparent focus:ring-0 ${
            theme == "light"
              ? "text-black bg-gray-200"
              : "bg-bg_card text-bg_grey"
          }`}
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className={` ${
            theme == "light"
              ? "text-black bg-bg_lighter"
              : "bg-bg_core text-bg_lightest"
          } flex p-0 items-center justify-center text-lg  w-11 h-11`}
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
