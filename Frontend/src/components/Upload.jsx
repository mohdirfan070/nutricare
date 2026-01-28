import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Button from '@mui/material/Button';
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

export default function InputFileUpload() {
  return (
    <>
      <label
        htmlFor="fileUploadInput"
        className="cursor-pointer px-10 py-2 rounded border shadow-md text-white"
      >
        Upload Image
      </label>
      <input
        id="fileUploadInput"
        type="file"
        accept="image/*"
        // onChange={handleFileUpload}
        className="hidden"
      />
      <button  className="z-20">
        <div className="bg-pvt-color5 border p-1 rounded-full">
          <div className="bg-white rounded-full w-[50px] h-[50px] border" />
        </div>
      </button>
    </>
  );
}
