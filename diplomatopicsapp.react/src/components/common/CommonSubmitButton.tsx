import { Box, styled } from "@mui/material";
import { FC, FormEvent } from "react";
import LoadingButton from "./LoadingButton";

const SubmitBox = styled(Box)({
  marginTop: "1.5rem",
});

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
    <SubmitBox>
      <LoadingButton
        onClick={onClick}
        text={text}
        loading={loading}
        disabled={disabled}
        fullWidth={fullWidth}
      />
    </SubmitBox>
  );
};

export default CommonSubmitButton;
