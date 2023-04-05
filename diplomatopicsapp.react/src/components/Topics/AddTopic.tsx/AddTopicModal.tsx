import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import BoxForm from "../../common/BoxForm";
import CommonSubmitButton from "../../common/CommonSubmitButton";
import topicsApi from "../../../api/topicsApi";
import NewTopic from "../../../types/Topic/NewTopic";

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

const CustomButton = styled(Button)({
  marginRight: 15,
});

const CharacterCounter = styled(Typography)({
  float: "right",
  flex: "0 0 auto",
});

interface AddTopicModalProps {
  open: boolean;
  onClose: () => void;
}

const AddTopicModal: FC<AddTopicModalProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false);

  const titleChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setTitle(event.target.value);
  };
  const descriptionChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDescription(event.target.value);
  };
  const degreeChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDegree(event.target.value);
  };
  const fieldOfStudyChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFieldOfStudy(event.target.value);
  };
  const authorChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setAuthor(event.target.value);
  };

  const handleOnSubmitForm = (event: FormEvent): void => {
    event.preventDefault();

    setIsMakingRequest(true);
    const requestBody: NewTopic = {
      title: title,
      description: description,
      degree: degree,
      fieldOfStudy: fieldOfStudy,
      author: author,
    };
    topicsApi
      .create(requestBody)
      .then(({ data }) => {})
      .catch(() => {})
      .finally(() => {
        setIsMakingRequest(false);
      });
  };

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
          <BoxForm>
            <TextField
              id="title-input"
              label="Title"
              variant="outlined"
              value={title ?? ""}
              onChange={titleChangeHandler}
              fullWidth
              margin="normal"
            />
            <TextField
              id="description-input"
              label="Description"
              variant="outlined"
              value={description ?? ""}
              onChange={descriptionChangeHandler}
              fullWidth
              margin="normal"
              multiline
              rows={8}
              inputProps={{ maxLength: 500 }}
            />
            <Box style={{ flex: "0 0 auto" }}>
              <CharacterCounter>{description.length}/500</CharacterCounter>
            </Box>
            <TextField
              id="degree-input"
              label="Degree"
              variant="outlined"
              value={degree ?? ""}
              onChange={degreeChangeHandler}
              margin="normal"
              style={{ width: "50%" }}
            />
            <TextField
              id="fieldofstudy-input"
              label="Field of study"
              variant="outlined"
              value={fieldOfStudy ?? ""}
              onChange={fieldOfStudyChangeHandler}
              margin="normal"
              style={{ width: "50%" }}
            />
            <TextField
              id="author-input"
              label="Author"
              variant="outlined"
              value={author ?? ""}
              onChange={authorChangeHandler}
              margin="normal"
              style={{ width: "50%" }}
            />
          </BoxForm>
          <CommonSubmitButton
            onClick={(event) => handleOnSubmitForm(event)}
            loading={isMakingRequest}
            text="Add topic"
          />
          <CustomButton
            type="reset"
            defaultValue="Reset"
            variant="outlined"
            onClick={onClose}
          >
            Cancel
          </CustomButton>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddTopicModal;
