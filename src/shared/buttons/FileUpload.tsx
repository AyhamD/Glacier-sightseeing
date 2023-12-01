import React from "react";
import "./button.css";

interface FileUploadProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  color?: string;
  type: string;
  accept: string;
}

const CustomFileUpload = ({
  onChange,
  label,
  type,
  accept,
  color = "button-primary",
}: FileUploadProps) => {
  return (
    <>
      <div>
        <label className={`button ${color}`} htmlFor="file">
          {label}
        </label>
        <input
          id="file"
          type={type}
          accept={accept}
          hidden={true}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default CustomFileUpload;
