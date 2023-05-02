import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import { FC } from "react";
import EditTopicModalForm from "./EditTopicModalForm";
import Topic from "../../../types/Topic/Topic";

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

interface EditTopicModalProps {
  open: boolean;
  item: Topic;
  onClose: () => void;
}

const EditTopicModal: FC<EditTopicModalProps> = ({ open, item, onClose }) => {
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
          <Typography>Edit Topic</Typography>
          <EditTopicModalForm onClose={onClose} item={item} />
        </Box>
      </Fade>
    </Modal>
  );
};

export default EditTopicModal;
