import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { FC } from "react";
import Topic from "../../types/Topic/Topic";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const StyledDataGrid = styled(DataGrid)({
  margin: "2rem 3.5rem 2rem 3.5rem",
  backgroundColor: "#CCCCCC",
  borderRadius: "8px",
  "--unstable_DataGrid-headWeight": 700,
  "& .MuiDataGrid-columnHeaderTitleContainerContent": {
    fontSize: 20,
  },
  "& .MuiDataGrid-columnHeaders": {
    color: "#ffffff",
    backgroundColor: "#1976d2",
    borderRadius: "8px",
  },
  ":hover": {
    cursor: "pointer",
  },
  '& .MuiDataGrid-cell[aria-colindex="1"]': {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-cellContent": {
    whiteSpace: "normal",
    wordWrap: "break-word",
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
    description: item.description,
  }));

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`details/${params.row.id}`, {
      state: {
        id: params.row.id,
        title: params.row.title,
        degree: params.row.degree,
        fieldOfStudy: params.row.fieldOfStudy,
        author: params.row.author,
        description: params.row.description,
      },
    });
  };

  return (
    <StyledDataGrid
      rows={rows}
      columns={columns}
      showCellVerticalBorder
      showColumnVerticalBorder
      hideFooter
      autoHeight
      onRowClick={handleRowClick}
    />
  );
};

export default TopicsTable;
