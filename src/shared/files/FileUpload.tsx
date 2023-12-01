import React from "react";
import CustomFileUpload from "../buttons/FileUpload";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
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
