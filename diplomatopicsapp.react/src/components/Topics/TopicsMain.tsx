import { FC, useEffect, useState } from "react";
import topicsApi from "../../api/topicsApi";
import Topic from "../../types/Topic/Topic";
import TopicsTable from "./TopicsTable";
import { Box } from "@mui/material";
import TopicsHeader from "./TopicsHeader";
import ErrorInfoSnackbar from "../common/ErrorSnackbar";
import useDebounce from "../common/useDebounce";

const TopicsMain: FC = () => {
  const [allItems, setAllItems] = useState<Topic[]>([]);
  const [error, setError] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getTopics = () => {
    void topicsApi
      .getAll()
      .then(({ data }) => {
        setAllItems(data);
      })
      .catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    getTopics();
  }, []);

  const handleCloseSnackbar = (): void => setError(false);

  return (
    <Box>
      <TopicsHeader getTopics={getTopics} onSearch={handleSearch} />
      <TopicsTable allItems={allItems} searchQuery={debouncedSearchQuery} />
      {error && (
        <ErrorInfoSnackbar open={error} onClose={handleCloseSnackbar} />
      )}
    </Box>
  );
};

export default TopicsMain;
