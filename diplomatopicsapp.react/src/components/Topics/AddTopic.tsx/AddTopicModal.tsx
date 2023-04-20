import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { FC } from "react";
import AddTopicModalForm from "./AddTopicModalForm";

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
};

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
  return (
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
          <Typography>Add New Topic</Typography>
          <AddTopicModalForm onClose={onClose} getTopics={getTopics} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddTopicModal;
