import { FC, useEffect, useState } from "react";
import topicsApi from "../../api/topicsApi";
import Topic from "../../types/Topic/Topic";
import TopicsTable from "./TopicsTable";
import { Box } from "@mui/material";
import TopicsHeader from "./TopicsHeader";

const TopicsMain: FC = () => {
  const [allItems, setAllItems] = useState<Topic[]>([]);

  const getTopics = () => {
    void topicsApi
      .getAll()
      .then(({ data }) => {
        setAllItems(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    getTopics();
  }, []);

  return (
    <Box>
      <TopicsHeader getTopics={getTopics} />
      <TopicsTable allItems={allItems} />
    </Box>
  );
};

export default TopicsMain;
