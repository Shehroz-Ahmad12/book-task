import { Box, Divider, Grid, Tooltip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { withStyles } from "@mui/styles";

export const QuickSearchToolbar = ({
  setColumnsButtonE1,
  setColumnsButtonE2,
  setColumnsButtonE3,
}) => {
  return (
    <Box sx={{}}>
      <GridToolbarContainer>
        <Grid container>
          <Grid item sm={6}>
            <GridToolbarColumnsButton
              sx={{
                color: "#FF7F50",
                textTransform: "none",
                fontSize: 12,
              }}
              ref={setColumnsButtonE1}
            />
            <GridToolbarFilterButton
              sx={{
                color: "#FF7F50",
                textTransform: "none",
                fontSize: 12,
              }}
              ref={setColumnsButtonE2}
            />
            <GridToolbarExport
              sx={{
                color: "#FF7F50",
                textTransform: "none",
                fontSize: 12,
              }}
              ref={setColumnsButtonE3}
            />
          </Grid>
          <Grid item sm={6} align="right">
            <Tooltip
              arrow
              placement="top"
              title="Search in multiple Columns seperated by comma ','. Example: 'Title, Author, Pages' "
            >
              <GridToolbarQuickFilter
                size="small"
                quickFilterParser={(searchInput) =>
                  searchInput
                    .split(",")
                    .map((value) => value.trim())
                    .filter((value) => value !== "")
                }
              />
            </Tooltip>
          </Grid>
        </Grid>
      </GridToolbarContainer>
      <Divider />
    </Box>
  );
};

export const StyledDataGrid = withStyles({
  root: {
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#FF7F50",
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    "& .MuiDataGrid-renderingZone": {
      maxHeight: "none !important",
    },
    "& .MuiDataGrid-cell": {
      lineHeight: "unset !important",
      maxHeight: "none !important",
      whiteSpace: "normal",
      border: "none",
    },
    "& .MuiDataGrid-row": {
      maxHeight: "none !important",
    },
  },
})(DataGrid);
