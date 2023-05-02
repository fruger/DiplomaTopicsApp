import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import EditTopicModal from "./edit/EditTopicModal";
import topicsApi from "../../api/topicsApi";
import ErrorInfoSnackbar from "../common/ErrorSnackbar";

const InfoBox = styled(Box)({
  display: "flex",
  backgroundColor: "white",
  border: "2px solid #1976d2",
  width: "50%",
  margin: "0.5rem",
  borderRadius: "5px",
});

const Title = styled(Box)({
  backgroundColor: "white",
  border: "2px solid #1976d2",
  margin: "0.5rem",
  padding: "0.5rem",
});

const Description = styled(Typography)({
  backgroundColor: "white",
  border: "2px solid #1976d2",
  margin: "0.5rem",
  padding: "0.5rem",
  borderRadius: "5px",
  minHeight: "10rem",
  wordWrap: "break-word",
});

const ButtonContainer = styled(Box)({
  margin: "2rem 0 2rem 3.5rem",
  display: "flex",
  gap: "3rem",
});

const TopicDetails: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const navigate = useNavigate();
  const { state } = useLocation();

  const onEditTopicClick = (): void => {
    setOpen(true);
  };
  const onDeleteTopicClick = (): void => {
    void topicsApi
      .deleteTopic(state.id)
      .then((response) => {
        if (response.status === 204) {
          navigate("/");
        }
      })
      .catch(() => {
        setError(true);
      });
  };

  const handleCloseModal = (): void => setOpen(false);
  const handleCloseSnackbar = (): void => setError(false);

  return (
    <Box>
      <ButtonContainer>
        <Button variant="contained" onClick={onEditTopicClick}>
          Edit topic
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={onDeleteTopicClick}
        >
          Delete topic
        </Button>
      </ButtonContainer>
      <EditTopicModal open={open} onClose={handleCloseModal} item={state} />
      <Paper
        elevation={3}
        sx={{ margin: "0 3.5rem 0 3.5rem", backgroundColor: "#808080" }}
      >
        <Box sx={{ padding: "1rem" }}>
          <Title>
            <Typography>{state.title}</Typography>
          </Title>
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>{state.degree}</Typography>
          </InfoBox>
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>{state.fieldOfStudy}</Typography>
          </InfoBox>
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>{state.author}</Typography>
          </InfoBox>
          <Description>{state.description}</Description>
        </Box>
      </Paper>
      {error && (
        <ErrorInfoSnackbar open={error} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};

export default TopicDetails;
