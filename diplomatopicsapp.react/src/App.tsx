import React from "react";
import TopicsMain from "./components/Topics/TopicsMain";
import { Route, Routes } from "react-router-dom";
import TopicDetails from "./components/Topics/TopicDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopicsMain />} />
      <Route path="/details/:id" element={<TopicDetails />} />
    </Routes>
  );
}

export default App;
