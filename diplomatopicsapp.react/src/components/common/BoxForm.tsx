import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface BoxFormProps {
  children: ReactNode;
}

const BoxForm: FC<BoxFormProps> = ({ children }) => {
  return (
    <Box
      component="form"
      sx={{
        mb: 1.5,
        mt: 1.5,
        "& .MuiInput-underline": {
          "&:before": { borderBottomColor: "white" },
          "&:hover:not(.Mui-disabled):before": { borderBottomColor: "white" },
          "&:after": { borderBottomColor: "white" },
        },
        "& .MuiInputLabel-root, & .MuiInputBase-root": {
          color: "white",
          "&.Mui-focused": { color: "white" },
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Box>
  );
};

export default BoxForm;
