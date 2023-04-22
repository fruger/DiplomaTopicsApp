import { ChangeEvent, FC, FormEvent, useState } from "react";
import BoxForm from "../../common/BoxForm";
import NewTopic from "../../../types/Topic/NewTopic";
import topicsApi from "../../../api/topicsApi";
import { Box, Button, TextField, Typography, styled } from "@mui/material";
import CommonSubmitButton from "../../common/CommonSubmitButton";

const CharacterCounter = styled(Typography)({
  float: "right",
  flex: "0 0 auto",
});

const ButtonGroup = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: "10px",
  marginTop: 15,
});

interface AddTopicModalFormProps {
  onClose: () => void;
  getTopics: () => void;
}

const AddTopicModalForm: FC<AddTopicModalFormProps> = ({
  onClose,
  getTopics,
}) => {
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
      .then(() => {
        getTopics();
      })
      .then(() => {
        onClose();
      })
      .catch(() => {})
      .finally(() => {
        setIsMakingRequest(false);
      });
  };

  return (
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
        rows={9}
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
      <ButtonGroup>
        <CommonSubmitButton
          onClick={(event) => handleOnSubmitForm(event)}
          loading={isMakingRequest}
          text="Add topic"
        />
        <Button
          type="reset"
          defaultValue="Reset"
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </BoxForm>
  );
};

export default AddTopicModalForm;
