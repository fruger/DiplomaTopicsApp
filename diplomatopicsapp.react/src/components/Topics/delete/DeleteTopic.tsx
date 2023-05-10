import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import DeleteTopicModal from "./DeleteTopicModal";

interface DeleteTopicProp {
  itemId: number;
}

const DeleteTopic: FC<DeleteTopicProp> = ({ itemId }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onEditTopicClick = (): void => {
    setOpen(true);
  };

  const handleCloseModal = (): void => setOpen(false);
  return (
    <Box>
      <Button variant="contained" color="error" onClick={onEditTopicClick}>
        Delete topic
      </Button>
      <DeleteTopicModal
        open={open}
        onClose={handleCloseModal}
        itemId={itemId}
      />
    </Box>
  );
};

export default DeleteTopic;
