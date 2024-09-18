import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

const StackInput = ({ tags, setTags, stack }) => {

  const addNewTag = (element) => {
    if (element.trim() !== "") {
      setTags([...tags, element.trim()]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  
  
  useEffect(() => {
    
    if(stack){
        addNewTag(stack)
    }
  }, [stack]);
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

    </div>
  );
};

export default StackInput;
