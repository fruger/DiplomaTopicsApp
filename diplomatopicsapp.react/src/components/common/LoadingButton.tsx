import { Button, CircularProgress } from "@mui/material";
import { FC, FormEvent } from "react";

interface LoadingButtonProps {
  loading: boolean;
  onClick?: (event: FormEvent) => void;
  text?: string;
  disabled?: boolean;
  color?: "warning";
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  onClick,
  text,
  loading,
  disabled,
  color,
  fullWidth,
  type,
}) => {
  const isButtonDisabled = loading || (disabled ?? false);

  return (
    <Button
      onClick={onClick}
      disabled={isButtonDisabled}
      type={type}
      variant="contained"
      color={color}
      fullWidth={fullWidth}
    >
      {loading && <CircularProgress size={24} />}
      {!loading && text}
    </Button>
  );
};

export default LoadingButton;
