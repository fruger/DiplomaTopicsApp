import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import EditTopicModal from "./edit/EditTopicModal";
import ErrorInfoSnackbar from "../common/ErrorSnackbar";

const Title = styled(Box)({
  backgroundColor: "white",
  color: "#262626",
  padding: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
  position: "relative",
  marginBottom: "2rem",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "9px",
    backgroundColor: "#808080",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "70%",
    height: "9px",
    backgroundColor: "#808080",
  },
});

const InfoBox = styled(Box)({
  display: "flex",
  backgroundColor: "white",
  width: "50%",
  margin: "0.5rem",
  borderRadius: "5px",
  fontSize: 55,
});

const Description = styled(Typography)({
  backgroundColor: "white",
  margin: "0.5rem",
  padding: "0.5rem",
  borderRadius: "5px",
  minHeight: "10rem",
  wordWrap: "break-word",
});

const ButtonContainer = styled(Box)({
  margin: "2rem 3.5rem 2rem",
  display: "flex",
  gap: "3rem",
  justifyContent: "flex-end",
});

const BoldText = styled("span")({
  fontWeight: "bold",
});

const TopicDetails: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // const navigate = useNavigate();
  const { state } = useLocation();

  const onEditTopicClick = (): void => {
    setOpen(true);
  };
  const onDeleteTopicClick = (): void => {
    // void topicsApi
    //   .deleteTopic(state.id)
    //   .then((response) => {
    //     if (response.status === 204) {
    //       navigate("/");
    //     }
    //   })
    //   .catch(() => {
    //     setError(true);
    //   });
  };

  const handleCloseModal = (): void => setOpen(false);
  const handleCloseSnackbar = (): void => setError(false);

  return (
    <Box>
      <ButtonContainer>
        <Button
          variant="contained"
          sx={{ backgroundColor: "green" }}
          onClick={onEditTopicClick}
        >
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
      <Title>{state.title}</Title>
      <Paper
        elevation={3}
        sx={{ margin: "0 3.5rem 0 3.5rem", backgroundColor: "#808080" }}
      >
        <Box sx={{ padding: "1rem" }}>
          {/* <Title>
            <Typography>{state.title}</Typography>
          </Title> */}
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>
              <BoldText>Degree: </BoldText>
              {state.degree}
            </Typography>
          </InfoBox>
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>
              <BoldText>Field of study: </BoldText>
              {state.fieldOfStudy}
            </Typography>
          </InfoBox>
          <InfoBox>
            <ArrowRight sx={{ color: "#1976d2" }} />
            <Typography>
              <BoldText>Author: </BoldText> {state.author}
            </Typography>
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
