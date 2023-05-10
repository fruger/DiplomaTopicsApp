import { Box, Button } from "@mui/material";
import { FC, useState } from "react";
import EditTopicModal from "./EditTopicModal";
import TopicDetail from "../../../types/Topic/TopicDetail";

interface EditTopicProps {
  item: TopicDetail;
  getTopic: () => void;
}

const EditTopic: FC<EditTopicProps> = ({ item, getTopic }) => {
  const [open, setOpen] = useState<boolean>(false);

  const onEditTopicClick = (): void => {
    setOpen(true);
  };

  const handleCloseModal = (): void => setOpen(false);
  return (
    <Box>
      <Button variant="contained" onClick={onEditTopicClick}>
        Edit topic
      </Button>
      <EditTopicModal
        open={open}
        onClose={handleCloseModal}
        item={item}
        getTopic={getTopic}
      />
    </Box>
  );
};

export default EditTopic;
