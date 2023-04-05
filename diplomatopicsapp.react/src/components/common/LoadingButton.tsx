import { Button, CircularProgress } from "@mui/material";
import { FC, FormEvent } from "react";

interface LoadingButtonProps {
  onClick: (event: FormEvent) => void;
  text: string;
  loading: boolean;
  disabled?: boolean;
  color?: "warning";
  fullWidth?: boolean;
}

const LoadingButton: FC<LoadingButtonProps> = ({
  onClick,
  text,
  loading,
  disabled,
  color,
  fullWidth,
}) => {
  const isButtonDisabled = loading || (disabled ?? false);

  return (
    <Button
      onClick={onClick}
      disabled={isButtonDisabled}
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
