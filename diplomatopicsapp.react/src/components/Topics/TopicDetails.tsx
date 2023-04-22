import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";

const InfoBox = styled(Box)({
  display: "flex",
  backgroundColor: "skyblue",
  border: "2px solid #1976d2",
  width: "50%",
  margin: "0.5rem",
  borderRadius: "5px",
});

const Title = styled(Box)({
  backgroundColor: "skyblue",
  border: "2px solid #1976d2",
  margin: "0.5rem",
  padding: "0.5rem",
});

const Description = styled(Typography)({
  backgroundColor: "skyblue",
  border: "2px solid #1976d2",
  margin: "0.5rem",
  padding: "0.5rem",
  borderRadius: "5px",
  minHeight: "10rem",
  wordWrap: "break-word",
});

const EditTopicButton = styled(Button)({
  margin: "2rem 0 2rem 3.5rem",
});

const TopicDetails: FC = () => {
  const { state } = useLocation();

  console.log(state.description);
  return (
    <Box>
      <EditTopicButton variant="contained">Edit new topic</EditTopicButton>
      <Paper elevation={3} sx={{ margin: "0 3.5rem 0 3.5rem" }}>
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
    </Box>
  );
};

export default TopicDetails;
