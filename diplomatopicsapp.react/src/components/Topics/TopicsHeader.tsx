import { Button, styled } from "@mui/material";
import { FC, useState } from "react";
import AddTopicModal from "./add/AddTopicModal";

const AddTopicButton = styled(Button)({
  margin: "2rem 0 0 3.5rem",
});

interface TopicsHeaderProps {
  getTopics: () => void;
}

const TopicsHeader: FC<TopicsHeaderProps> = ({ getTopics }) => {
  const [open, setOpen] = useState<boolean>(false);
  const onAddTopicClick = (): void => {
    setOpen(true);
  };
  const handleCloseModal = (): void => setOpen(false);
  return (
    <div>
      <AddTopicButton variant="contained" onClick={onAddTopicClick}>
        Add new topic
      </AddTopicButton>
      <AddTopicModal
        getTopics={getTopics}
        open={open}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default TopicsHeader;
