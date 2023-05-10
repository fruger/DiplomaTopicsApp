import { Box, Button } from "@mui/material";
import AddTopicModal from "./AddTopicModal";
import { FC, useState } from "react";

interface AddTopicProps {
  getTopics: () => void;
}

const AddTopic: FC<AddTopicProps> = ({ getTopics }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onAddTopicClick = (): void => {
    setOpen(true);
  };
  const handleCloseModal = (): void => setOpen(false);
  return (
    <Box>
      <Button variant="contained" onClick={onAddTopicClick}>
        Add new topic
      </Button>
      <AddTopicModal
        getTopics={getTopics}
        open={open}
        onClose={handleCloseModal}
      />
    </Box>
  );
};

export default AddTopic;
