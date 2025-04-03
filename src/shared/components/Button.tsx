import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

interface ButtonProps extends Omit<MuiButtonProps, "children"> {
  label: string;
  variant?: "text" | "outlined" | "contained";
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "contained",
  ...props
}) => {
  return (
    <MuiButton
      {...props}
      variant={variant}
      sx={{ textTransform: "none", fontWeight: 600 }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
