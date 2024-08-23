import React from "react";
import { AiTwotoneFileImage } from "react-icons/ai";

const ImageUpload = ({
  selectedFile,
  setSelectedFile,
  setSelectedTab,
  selectFileRef,
  onSelectImage,
}) =>
{
  return (
    <div
      className="flex flex-col items-center justify-center w-full"
    >
      {selectedFile ? (
        <>
          <img
            className="max-w-[400px] max-h-[400px]"
            src={selectedFile}
          />
          <div className="flex gap-3 lg:mt-4">
            <button onClick={() => setSelectedTab("Image / Video")}
              className="p-2 lg:px-4 lg:py-2"
            >
              Back to upload
            </button>
            <button
              className="p-2 lg:px-4 lg:py-2"
              onClick={() => setSelectedFile("")}
            >
              Remove
            </button>
          </div>
        </>
      ) : (
        <div
          className="flex flex-col w-full rounded-md justify-center items-center"
        >
          <button
            title="Upload image"
            className="p-2 lg:px-4 lg:py-2"
            onClick={() => selectFileRef.current?.click()}
          >
            <AiTwotoneFileImage size={20} />
          </button>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
