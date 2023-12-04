import React, { useState } from "react";
import CustomFileUpload from "../buttons/FileUpload";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileChange(selectedFile);
    }
  };

  return (
    <div>
      <CustomFileUpload
        type="file"
        onChange={handleFileChange}
        label="Select File"
        accept=".csv"
        color="primary"
      />
    </div>
  );
};

export default FileUpload;
