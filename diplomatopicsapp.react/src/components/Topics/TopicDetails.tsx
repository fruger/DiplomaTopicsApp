import { Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useLocation } from "react-router-dom";

const TopicDetails: FC = () => {
  const { state } = useLocation();

  return (
    <Paper elevation={3} sx={{ width: "90%", margin: "auto" }}>
      <Typography>{state.title}</Typography>
    </Paper>
  );
};

export default TopicDetails;
