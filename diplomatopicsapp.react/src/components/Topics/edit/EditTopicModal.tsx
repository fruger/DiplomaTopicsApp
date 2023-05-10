import {
  Backdrop,
  Box,
  Fade,
  Modal,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FC, useState } from "react";
import EditTopicModalForm from "./EditTopicModalForm";
import ErrorInfoSnackbar from "../../common/ErrorSnackbar";
import TopicDetail from "../../../types/Topic/TopicDetail";

interface EditTopicModalProps {
  open: boolean;
  item: TopicDetail;
  onClose: () => void;
  getTopic: () => void;
}

const EditTopicModal: FC<EditTopicModalProps> = ({
  open,
  item,
  onClose,
  getTopic,
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
    height: "85vh",
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
        aria-labelledby="edit-topic-modal"
        aria-describedby="edit-topic"
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
            <Header>Edit Topic</Header>
            <EditTopicModalForm
              onClose={onClose}
              item={item}
              setError={setError}
              getTopic={getTopic}
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

export default EditTopicModal;
