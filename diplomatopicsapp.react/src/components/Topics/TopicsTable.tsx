import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { FC } from "react";
import Topic from "../../types/Topic/Topic";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  ":hover": {
    cursor: "pointer",
  },
});

interface TopicsTableProps {
  allItems: Topic[];
}

const TopicsTable: FC<TopicsTableProps> = ({ allItems }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.6,
    },
    { field: "degree", headerName: "Degree", flex: 0.1 },
    { field: "fieldOfStudy", headerName: "Field of study", flex: 0.15 },
    { field: "author", headerName: "Author", flex: 0.15 },
  ];

  const rows = allItems.map((item) => ({
    id: item.id,
    title: item.title,
    degree: item.degree,
    fieldOfStudy: item.fieldOfStudy,
    author: item.author,
  }));

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`details/${params.row.id}`, {
      state: {
        id: params.row.id,
        title: params.row.title,
        degree: params.row.degree,
        fieldOfStudy: params.row.fieldOfStudy,
        author: params.row.author,
      },
    });
  };

  return (
    <TableContainer>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        hideFooter
        autoHeight
        onRowClick={handleRowClick}
      />
    </TableContainer>
  );
};

export default TopicsTable;
