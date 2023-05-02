import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

interface ErrorInfoSnackbarProps {
  open: boolean;
  onClose: () => void;
}

const ErrorInfoSnackbar: FC<ErrorInfoSnackbarProps> = ({ open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert onClose={onClose} severity="error">
        Error: Something went wrong / Bad connection
      </Alert>
    </Snackbar>
  );
};

export default ErrorInfoSnackbar;
