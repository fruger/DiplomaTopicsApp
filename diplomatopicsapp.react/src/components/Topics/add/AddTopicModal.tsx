import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import AddTopicModalForm from "./AddTopicModalForm";
import ErrorInfoSnackbar from "../../common/ErrorSnackbar";

interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
  getTopics: () => void;
}

const AddTopicModal: FC<AddTopicModalProps> = ({
  open,
  onClose,
  getTopics,
}) => {
  const [error, setError] = useState<boolean>(false);

  const handleCloseSnackbar = (): void => setError(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const ModalContent = styled(Box)({
    position: "absolute",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#202124",
    color: "white",
    boxShadow: "0 0 30px black",
    borderRadius: 1,
    width: isSmallScreen ? "90%" : "50%",
    height: "76vh",
    padding: isSmallScreen ? "20px" : "50px",
    margin: isSmallScreen ? "10px" : "50px",
    overflowY: "auto",
  });

  const Header = styled(Typography)({
    fontSize: "2rem",
    fontWeight: "bold",
  });

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
          <ModalContent>
            <Header>Add New Topic</Header>
            <AddTopicModalForm
              onClose={onClose}
              getTopics={getTopics}
              setError={setError}
            />
          </ModalContent>
        </Fade>
      </Modal>
      {error && (
        <ErrorInfoSnackbar open={error} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};

export default AddTopicModal;
