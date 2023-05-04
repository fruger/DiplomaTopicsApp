import { ChangeEvent, FC, FormEvent, useState } from "react";
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
  // const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // const [degree, setDegree] = useState<string>("");
  const [fieldOfStudy, setFieldOfStudy] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false);

  // const titleChangeHandler = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ): void => {
  //   setTitle(event.target.value);
  // };
  const descriptionChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setDescription(event.target.value);
  };
  // const degreeChangeHandler = (
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ): void => {
  //   setDegree(event.target.value);
  // };
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
      title: formik.values.title,
      description: description,
      degree: formik.values.degree,
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
      .catch(() => {
        setError(true);
      })
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
      title: "",
      degree: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
          id="description-input"
          label="Description"
          value={description ?? ""}
          onChange={descriptionChangeHandler}
          fullWidth
          margin="normal"
          multiline
          rows={9}
          inputProps={{ maxLength: 500 }}
        />
        <Box sx={{ flex: "0 0 auto", marginBottom: "0.75rem" }}>
          <CharacterCounter>{description.length}/500</CharacterCounter>
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
        {/* <TextField
          id="degree"
          label="Degree"
          select
          value={formik.values.degree}
          onChange={formik.handleChange}
          margin="normal"
          style={{ width: "50%" }}
          error={formik.touched.degree && Boolean(formik.errors.degree)}
          helperText={formik.touched.degree && formik.errors.degree}
        >
          <MenuItem value={"inz"}>inż</MenuItem>
          <MenuItem value={"mgr"}>mgr</MenuItem>
        </TextField> */}
        <TextField
          id="fieldofstudy-input"
          label="Field of study"
          value={fieldOfStudy ?? ""}
          onChange={fieldOfStudyChangeHandler}
          margin="normal"
          style={{ width: "50%" }}
        />
        <TextField
          id="author-input"
          label="Author"
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
    </form>
  );
};

export default AddTopicModalForm;
