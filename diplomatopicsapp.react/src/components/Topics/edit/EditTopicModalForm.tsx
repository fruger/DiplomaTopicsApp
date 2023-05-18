import { FC, useState } from "react";
import BoxForm from "../../common/BoxForm";
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
import EditTopic from "../../../types/Topic/EditTopic";
import TopicDetail from "../../../types/Topic/TopicDetail";

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
  item: TopicDetail;
  onClose: () => void;
  getTopic: () => void;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditTopicModalForm: FC<EditTopicModalFormProps> = ({
  item,
  onClose,
  getTopic,
  setError,
}) => {
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false);

  const handleOnSubmitForm = (values: EditTopic): void => {
    setIsMakingRequest(true);

    topicsApi
      .edit(item.id, values)
      .then(() => {
        onClose();
        getTopic();
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
      title: item?.title,
      degree: item?.degree,
      fieldOfStudy: item?.fieldOfStudy,
      author: item?.author,
      description: item?.description,
      availability: item?.status,
    },
    validationSchema,
    onSubmit: () => handleOnSubmitForm(requestBody),
  });

  const requestBody: EditTopic = {
    id: item.id,
    title: formik.values.title,
    description: formik.values.description,
    degree: formik.values.degree,
    fieldOfStudy: formik.values.fieldOfStudy,
    author: formik.values.author,
    status: true,
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
            style={{ width: "60%" }}
          >
            <MenuItem value="">Select a degree</MenuItem>
            <MenuItem value="Bachelor's">Bachelor's</MenuItem>
            <MenuItem value="Engineer's">Engineer's</MenuItem>
            <MenuItem value="Master's">Master's</MenuItem>
            <MenuItem value="Doctorate">Doctorate</MenuItem>
            <MenuItem value="Bachelor's / Master's">
              Bachelor's / Master's
            </MenuItem>
            <MenuItem value="Engineer's / Master's">
              Engineer's / Master's
            </MenuItem>
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
        <FormControl
          fullWidth
          error={
            formik.touched.availability && Boolean(formik.errors.availability)
          }
          sx={{ marginTop: "1rem" }}
        >
          <InputLabel id="availability-label">Availability</InputLabel>
          <Select
            labelId="availability-label"
            id="availability"
            name="availability"
            label="availability"
            value={formik.values.availability}
            onChange={formik.handleChange}
          >
            <MenuItem value={true as any}>Available</MenuItem>
            <MenuItem value={false as any}>Not Available</MenuItem>
          </Select>
          <FormHelperText>
            {formik.touched.availability && formik.errors.availability}
          </FormHelperText>
        </FormControl>
        <ButtonGroup>
          <CommonSubmitButton
            type="submit"
            loading={isMakingRequest}
            text="Edit topic"
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

export default EditTopicModalForm;
