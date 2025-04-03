import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = "",
  disabled,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        ${className}
        bg-black dark:bg-white text-white dark:text-black
        py-2 px-4 rounded-md
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
      `}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
