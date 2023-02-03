import React from "react";
import {
  QuickSearchToolbar,
  StyledDataGrid,
} from "../customtable/CustomDataGrid.jsx";
import { GridLinkOperator } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { Box, LinearProgress, IconButton } from "@mui/material";

const Table = ({ rows, loadingState, handleUpdateBook }) => {
  const renderDetailsButton = (params) => {
    return (
      <Box display="flex" justifyContent="space-between">
        <IconButton
          variant="contained"
          color="#FF7F50"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            handleUpdateBook(params.row.id);
          }}
        >
          <EditIcon></EditIcon>
        </IconButton>
      </Box>
    );
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, hide: true },
    {
      field: "title",
      headerName: "Book Title",
      flex: 2,
    },
    {
      field: "author",
      headerName: "Author",
      flex: 1,
    },
    {
      field: "noOfPages",
      headerName: "Number of Pages",
      flex: 1,
    },
    {
      field: "publishedDate",
      headerName: "Date Published",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.4,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ];
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
      }}
    >
      <StyledDataGrid
        rows={rows}
        columns={columns}
        autoPageSize={true}
        rowsPerPageOptions={[5]}
        loading={loadingState}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLinkOperator.Or,
            },
          },
        }}
        components={{
          Toolbar: QuickSearchToolbar,
          LoadingOverlay: LinearProgress,
        }}
      />
    </Box>
  );
};

export default Table;
