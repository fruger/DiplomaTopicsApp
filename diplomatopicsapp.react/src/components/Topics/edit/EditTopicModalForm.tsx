import { FC, FormEvent, useState } from "react";
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
import Topic from "../../../types/Topic/Topic";

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

interface EditTopicModalFormProps {
  item: Topic;
  onClose: () => void;
}

const EditTopicModalForm: FC<EditTopicModalFormProps> = ({ item, onClose }) => {
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false);

  const handleOnSubmitForm = (event: FormEvent): void => {
    event.preventDefault();

    setIsMakingRequest(true);
    const requestBody: NewTopic = {
      title: formik.values.title,
      description: formik.values.description,
      degree: formik.values.degree,
      fieldOfStudy: formik.values.fieldOfStudy,
      author: formik.values.author,
    };
    topicsApi
      .create(requestBody)
      .then(() => {
        onClose();
      })
      .catch(() => {})
      .finally(() => {
        setIsMakingRequest(false);
      });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too short")
      .max(200, "Too long")
      .required("Title is required"),
    degree: Yup.string().required("Degree is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: item.title,
      degree: item.degree,
      fieldOfStudy: item.fieldOfStudy,
      author: item.author,
      description: item.description,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(item);
  return (
    <BoxForm>
      <TextField
        fullWidth
        id="title"
        name="title"
        label="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        id="description"
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
          {formik.values.description?.length}/500
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
          onBlur={formik.handleBlur}
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
        id="fieldOfStudy"
        label="Field of study"
        value={formik.values.fieldOfStudy}
        onChange={formik.handleChange}
        margin="normal"
        style={{ width: "50%" }}
      />
      <TextField
        id="author"
        label="Author"
        value={formik.values.author}
        onChange={formik.handleChange}
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

export default EditTopicModalForm;
