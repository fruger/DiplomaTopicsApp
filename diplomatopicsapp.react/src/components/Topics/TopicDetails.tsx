import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const TopicDetails: FC = () => {
  const { state } = useLocation();

  return (
    <Paper elevation={3} sx={{ margin: "3.5rem" }}>
      <Box sx={{ padding: "1rem" }}>
        <Typography>{state.title}</Typography>
        <Typography>{state.degree}</Typography>
        <Typography>{state.fieldOfStudy}</Typography>
      </Box>
    </Paper>
  );
};

export default TopicDetails;
