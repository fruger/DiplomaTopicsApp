import { FC, FormEvent } from "react";
import LoadingButton from "./LoadingButton";

interface CommonSubmitButtonProps {
  onClick: (event: FormEvent) => void;
  text: string;
  loading: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const CommonSubmitButton: FC<CommonSubmitButtonProps> = ({
  onClick,
  text,
  loading,
  disabled,
  fullWidth,
}) => {
  return (
    <LoadingButton
      onClick={onClick}
      text={text}
      loading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
    />
  );
};

export default CommonSubmitButton;
