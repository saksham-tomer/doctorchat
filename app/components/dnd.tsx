
"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

const FileUpload = ({onFileUpload}) => {

  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState("");
  const inref = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  /*
To set the dropped image inside an <img> tag on the drop event, you can use the FileReader API to read the dropped file and convert it to a data URL, which can then be set as the src attribute of the <img> tag */
  const handleFiles = (files) => {
    // Handle file upload logic here
    const file = files[0];

    const reader = new FileReader();
    //performs asynchronous conversion to b64
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile((prev) => (prev = reader.result));

      onFileUpload(reader.result)
    };
  };

  return (
    <div
      onClick={() => inref.current.click()}
      className={`p-6 border-dashed relative border-2 shadow-xl border-gray-400 rounded-full ${
        dragging ? "bg-gray-300 text-gray-500" : "bg-white"
      } hover:bg-gray-50`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="flex  bg-transparent backdrop-blur-md flex-col items-center justify-center space-y-2">
        {file ? (
          <Image
            className="rounded-full w-full"
            src={file}
            alt="file"
            height={55}
            width={55}
          />
        ) : (
          <Image
            className=""
            src={"/person.svg"}
            alt="person"
            width={55}
            height={55}
          />
        )}
        <input
          type="file"
          ref={inref}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          multiple
        />
      </div>
    </div>
  );
};

export default FileUpload;
