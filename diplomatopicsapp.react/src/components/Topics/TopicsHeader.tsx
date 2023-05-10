import { Box, styled } from "@mui/material";
import { FC } from "react";
import DataGridSearcher from "../common/DataGridSearcher";
import AddTopic from "./add/AddTopic";

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  margin: "3.5rem",
});

const SearcherContainer = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "end",
  alignItems: "start",
});

interface TopicsHeaderProps {
  getTopics: () => void;
  onSearch: (query: string) => void;
}

const TopicsHeader: FC<TopicsHeaderProps> = ({ getTopics, onSearch }) => {
  return (
    <Header>
      <AddTopic getTopics={getTopics} />
      <SearcherContainer>
        <DataGridSearcher onSearch={onSearch} />
      </SearcherContainer>
    </Header>
  );
};

export default TopicsHeader;
