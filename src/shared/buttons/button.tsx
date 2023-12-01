import React from "react";
import "./button.css";

interface CustomButtonProps {
  onClick: () => void;
  label: string;
  color?: string;
}

const CustomButton = ({
  onClick,
  label,
  color = "primary",
}: CustomButtonProps) => {
  return (
    <button className={`button ${color}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default CustomButton;
