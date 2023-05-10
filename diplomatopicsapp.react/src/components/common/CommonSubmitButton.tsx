import { FC, FormEvent } from "react";
import LoadingButton from "./LoadingButton";

interface CommonSubmitButtonProps {
  loading: boolean;
  onClick?: (event: FormEvent) => void;
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}

const CommonSubmitButton: FC<CommonSubmitButtonProps> = ({
  loading,
  onClick,
  text,
  disabled,
  fullWidth,
  type,
}) => {
  return (
    <LoadingButton
      onClick={onClick}
      text={text}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      type={type}
    />
  );
};

export default CommonSubmitButton;
