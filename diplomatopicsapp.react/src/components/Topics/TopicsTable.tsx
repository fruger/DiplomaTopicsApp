import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import { FC } from "react";
import Topic from "../../types/Topic/Topic";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Tooltip } from "@mui/material";

const StyledDataGrid = styled(DataGrid)({
  margin: "0 3.5rem 2rem 3.5rem",
  backgroundColor: "#454a4d",
  borderRadius: "8px",
  borderColor: "#393d40",
  color: "white",
  "& .wrap-cell-text": {
    whiteSpace: "normal",
    lineHeight: "normal",
    padding: 5,
    height: "auto",
  },
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
  "& .MuiDataGrid-withBorderColor": {
    borderColor: "#393d40",
  },
  '& .MuiDataGrid-cell[aria-colindex="1"]': {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-cellContent": {
    whiteSpace: "normal",
    wordWrap: "break-word",
  },
  "& .MuiDataGrid-columnHeader": {
    borderColor: "#393d40",
    borderStyle: "solid",
    borderWidth: "0 0.5px",
  },
});

const CenteredGridCell = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const GreenDoneIcon = styled(DoneIcon)({
  color: "#00FF00",
});
const RedCloseIcon = styled(CloseIcon)({
  color: "#FF0000",
});

interface TopicsTableProps {
  allItems: Topic[];
  searchQuery: string;
}

const TopicsTable: FC<TopicsTableProps> = ({ allItems, searchQuery }) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      flex: 0.5,
      cellClassName: "wrap-cell-text",
    },
    {
      field: "degree",
      headerName: "Degree",
      flex: 0.1,
      cellClassName: "wrap-cell-text",
    },
    {
      field: "fieldOfStudy",
      headerName: "Field of study",
      flex: 0.15,
      cellClassName: "wrap-cell-text",
    },
    {
      field: "author",
      headerName: "Author",
      flex: 0.15,
      cellClassName: "wrap-cell-text",
    },
    {
      field: "available",
      headerName: "Available",
      flex: 0.1,
      renderCell: (params) => {
        return (
          <CenteredGridCell>
            {params.value ? (
              <Tooltip title="Available" disableInteractive>
                <GreenDoneIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Not Available" disableInteractive>
                <RedCloseIcon />
              </Tooltip>
            )}
          </CenteredGridCell>
        );
      },
    },
  ];

  const rows = allItems.map((item) => ({
    id: item.id,
    title: item.title,
    degree: item.degree,
    fieldOfStudy: item.fieldOfStudy,
    author: item.author,
    available: item.status,
  }));

  const filteredRows = rows.filter((row) =>
    Object.entries(row).some(
      ([key, value]) =>
        key !== "id" &&
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`details/${params.row.id}`, {
      state: params.row,
    });
  };

  return (
    <StyledDataGrid
      columns={columns}
      rows={filteredRows}
      showCellVerticalBorder
      showColumnVerticalBorder
      hideFooter
      autoHeight
      onRowClick={handleRowClick}
    />
  );
};

export default TopicsTable;
