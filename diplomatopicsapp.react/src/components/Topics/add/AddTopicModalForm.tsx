import { FC, useState } from "react";
import BoxForm from "../../common/BoxForm";
import NewTopic from "../../../types/Topic/NewTopic";
import topicsApi from "../../../api/topicsApi";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import CommonSubmitButton from "../../common/CommonSubmitButton";
import * as Yup from "yup";
import { useFormik } from "formik";

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
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTopicModalForm: FC<AddTopicModalFormProps> = ({
  onClose,
  getTopics,
  setError,
}) => {
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false);

  const handleOnSubmitForm = (values: NewTopic): void => {
    setIsMakingRequest(true);

    topicsApi
      .create(values)
      .then(() => {
        getTopics();
      })
      .then(() => {
        onClose();
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsMakingRequest(false);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "This title is too short")
      .required("Title is required"),
    degree: Yup.string().required("Degree is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      degree: "",
      fieldOfStudy: "",
      author: "",
    },
    validationSchema,
    onSubmit: () => handleOnSubmitForm(requestBody),
  });

  const requestBody: NewTopic = {
    title: formik.values.title,
    description: formik.values.description,
    degree: formik.values.degree,
    fieldOfStudy: formik.values.fieldOfStudy,
    author: formik.values.author,
    status: true,
    createdAt: new Date(),
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <BoxForm>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          inputProps={{ maxLength: 200 }}
          multiline
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          id="description-input"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={9}
          inputProps={{ maxLength: 500 }}
        />
        <Box sx={{ flex: "0 0 auto", marginBottom: "0.75rem" }}>
          <CharacterCounter>
            {formik.values.description.length}/500
          </CharacterCounter>
        </Box>
        <FormControl
          fullWidth
          error={formik.touched.degree && Boolean(formik.errors.degree)}
        >
          <InputLabel id="degree-label">Degree</InputLabel>
          <Select
            labelId="degree-label"
            id="degree"
            name="degree"
            label="Degree"
            value={formik.values.degree}
            onChange={formik.handleChange}
            style={{ width: "60%" }}
          >
            <MenuItem value="">Select a degree</MenuItem>
            <MenuItem value="Bachelor's">Bachelor's</MenuItem>
            <MenuItem value="Engineer's">Engineer's</MenuItem>
            <MenuItem value="Master's">Master's</MenuItem>
            <MenuItem value="Doctorate">Doctorate</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.degree && formik.errors.degree}
          </FormHelperText>
        </FormControl>
        <TextField
          id="fieldofstudy-input"
          name="fieldofstudy"
          label="Field of study"
          inputProps={{ maxLength: 50 }}
          multiline
          value={formik.values.fieldOfStudy}
          onChange={formik.handleChange}
          margin="normal"
          style={{ width: "60%" }}
        />
        <TextField
          id="author-input"
          name="author"
          label="Author"
          inputProps={{ maxLength: 50 }}
          multiline
          value={formik.values.author}
          onChange={formik.handleChange}
          margin="normal"
          style={{ width: "60%" }}
        />
        <ButtonGroup>
          <CommonSubmitButton
            type="submit"
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
    </form>
  );
};

export default AddTopicModalForm;
