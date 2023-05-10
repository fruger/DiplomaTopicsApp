import { ArrowRight } from "@mui/icons-material";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import ErrorInfoSnackbar from "../common/ErrorSnackbar";
import EditTopic from "./edit/EditTopic";
import DeleteTopic from "./delete/DeleteTopic";
import topicsApi from "../../api/topicsApi";
import TopicDetail from "../../types/Topic/TopicDetail";

const StyledPaper = styled(Paper)({
  margin: "0 3.5rem 0 3.5rem",
  backgroundColor: "#454a4d",
});

const Title = styled(Box)({
  backgroundColor: "#454a4d",
  color: "#ffffff",
  padding: "20px",
  fontSize: "2rem",
  fontWeight: "bold",
  position: "relative",
  marginBottom: "2rem",
  borderTop: "5px solid #181a1b",
  borderBottom: "5px solid #181a1b",
});

const InfoBox = styled(Box)({
  display: "flex",
  color: "#ffffff",
  backgroundColor: "#181a1b",
  width: "50%",
  margin: "0.5rem",
  borderRadius: "5px",
  fontSize: 55,
});

const Description = styled(Typography)({
  color: "#ffffff",
  backgroundColor: "#181a1b",
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

const Hour = styled(Box)({ color: "#ffffff" });

const TopicDetails: FC = () => {
  const [details, setDetails] = useState<TopicDetail | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { state } = useLocation();

  const getTopic = useCallback(() => {
    setIsLoading(true);
    void topicsApi
      .getDetails(state.id)
      .then(({ data }) => {
        setDetails(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [state.id]);

  useEffect(() => {
    getTopic();
  }, [getTopic]);

  const handleCloseSnackbar = (): void => setError(false);

  let date = details?.createdAt.toString();
  date = date?.split("T")[0];

  return (
    <Box>
      <ButtonContainer>
        {details && <EditTopic item={details} getTopic={getTopic} />}
        <DeleteTopic itemId={state.id} />
      </ButtonContainer>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        details !== null && (
          <>
            <Title>{details.title}</Title>
            <StyledPaper elevation={3}>
              <Box sx={{ padding: "1rem" }}>
                <InfoBox>
                  <ArrowRight sx={{ color: "#1976d2" }} />
                  <Typography>
                    <BoldText>Degree: </BoldText>
                    {details.degree}
                  </Typography>
                </InfoBox>
                <InfoBox>
                  <ArrowRight sx={{ color: "#1976d2" }} />
                  <Typography>
                    <BoldText>Field of study: </BoldText>
                    {details.fieldOfStudy}
                  </Typography>
                </InfoBox>
                <InfoBox>
                  <ArrowRight sx={{ color: "#1976d2" }} />
                  <Typography>
                    <BoldText>Author: </BoldText> {details.author}
                  </Typography>
                </InfoBox>
                <Description>{details.description}</Description>
                <Hour>
                  <BoldText>Created: </BoldText>
                  {date}
                </Hour>
              </Box>
            </StyledPaper>
          </>
        )
      )}
      {error && (
        <ErrorInfoSnackbar open={error} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};

export default TopicDetails;
