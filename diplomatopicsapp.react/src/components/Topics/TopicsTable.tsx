import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FC } from "react";
import Topic from "../../types/Topic";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

const TableContainer = styled(Box)({
  margin: "auto",
  backgroundColor: "#CCCCCC",
  width: "90%",
});

const StyledDataGrid = styled(DataGrid)({
  "--unstable_DataGrid-headWeight": 700,
  "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    fontSize: 20,
  },
});

interface TopicsTableProps {
  allItems: Topic[];
}

const TopicsTable: FC<TopicsTableProps> = ({ allItems }) => {
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.6,
    },
    { field: "degree", headerName: "Degree", flex: 0.1 },
    { field: "field", headerName: "Field of study", flex: 0.15 },
    { field: "author", headerName: "Author", flex: 0.15 },
  ];

  const rows = allItems.map((item) => ({
    id: item.id,
    title: item.title,
    degree: item.degree,
    field: item.fieldOfStudy,
    author: item.author,
  }));

  return (
    <TableContainer>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        hideFooter
        autoHeight
      />
    </TableContainer>
  );
};

export default TopicsTable;
