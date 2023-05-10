import React, { ChangeEvent, FC } from "react";
import { styled, TextField } from "@mui/material";

const WhiteTextField = styled(TextField)({
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiFormLabel-root": {
    color: "white",
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

interface DataGridSearcherProps {
  onSearch: (searchQuery: string) => void;
}

const DataGridSearcher: FC<DataGridSearcherProps> = ({ onSearch }) => {
  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <WhiteTextField
      label="Search"
      variant="outlined"
      fullWidth
      onChange={handleSearchQueryChange}
    />
  );
};

export default DataGridSearcher;
