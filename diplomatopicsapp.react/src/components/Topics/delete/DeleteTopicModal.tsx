import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  styled,
} from "@mui/material";
import { FC, useState } from "react";
import topicsApi from "../../../api/topicsApi";
import { useNavigate } from "react-router-dom";
import ErrorInfoSnackbar from "../../common/ErrorSnackbar";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#202124",
  color: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
};

const ButtonContainer = styled(Box)({
  display: "flex",
  gap: "2.5rem",
});

interface DeleteTopicModalProps {
  open: boolean;
  itemId: number;
  onClose: () => void;
}

const DeleteTopicModal: FC<DeleteTopicModalProps> = ({
  open,
  itemId,
  onClose,
}) => {
  const [error, setError] = useState<boolean>(false);

  const handleCloseSnackbar = (): void => setError(false);
  const navigate = useNavigate();
  const onDeleteTopicClick = (): void => {
    void topicsApi
      .deleteTopic(itemId)
      .then((response) => {
        if (response.status === 204) {
          navigate("/");
        }
      })
      .catch(() => {
        setError(true);
      });
  };
  return (
    <Box>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="add-topic-modal"
        aria-describedby="add-topic"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
              Delete this topic?
            </Typography>
            <ButtonContainer>
              <Button
                variant="contained"
                color="error"
                onClick={onDeleteTopicClick}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
            </ButtonContainer>
          </Box>
        </Fade>
      </Modal>
      {error && (
        <ErrorInfoSnackbar open={error} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};

export default DeleteTopicModal;
