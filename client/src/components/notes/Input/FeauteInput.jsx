import React, { useContext, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { ThemeContext } from "../../../context/ThemeContext";
import { inputClassName } from "../../../utils/utils";

const FeatureInput = ({ features, setFeatures }) => {
  const [inputValue, setInputValue] = useState("");
  const { theme } = useContext(ThemeContext);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setFeatures([...features, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFeatures(features.filter((tag) => tag !== tagToRemove));
  };
  return (
    <div>
      {features?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {features.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
              type="button"
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
          className={inputClassName(theme)}
          placeholder="Add feature"
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

export default FeatureInput;
