import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Fragment, useEffect, useMemo, useState } from "react";
import { fetchBooksJSON } from "../../../api/getBooksData";
import { CircularProgress, Typography } from "@mui/material";
import {
  BookDataType,
  ResponseFetchApiType,
} from "../../../api/BooksDataTypes";
import { RowDataType } from "./DataTableTypes";
import { Avatar } from "@mui/material";
import { SimpleDialog } from "../simpleDialog/SimpleDialog";
import "./styles.css";
import { log } from "util";
import { GridSortDirection } from "@mui/x-data-grid/models/gridSortModel";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Name",
    width: 90,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            typography: "subtitle1",
            fontWeight: 500,
            fontSize: 14,
            fontStyle: "normal",
            fontFamily: "Monospace",
            color: "text.primary",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
  {
    field: "image",
    headerName: "Preview",
    width: 200,
    editable: true,
    renderCell: (params) => {
      return <Avatar src={params.value} />;
    },
  },
  {
    field: "subtitle",
    headerName: "Subtitle",
    width: 300,
    editable: true,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            typography: "subtitle2",
            fontWeight: "light",
            fontSize: 18,
            color: "secondary.main",
            fontStyle: "italic",
            fontFamily: "Monospace",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 150,
    editable: true,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            typography: "body1",
            fontWeight: "bold",
            fontSize: 18,
            color: "success.main",

            fontStyle: "oblique",
            fontFamily: "Monospace",
          }}
        >
          {`$${params.value}`}
        </Box>
      );
    },
  },
  {
    field: "date",
    headerName: "Date created",
    sortable: false,
    width: 150,
    renderCell: (params) => {
      return (
        <Box
          sx={{
            typography: "body2",
            fontWeight: "regular",
            fontSize: 16,
            color: "primary.main",

            fontStyle: "normal",
            fontFamily: "Monospace",
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
];

export const DataTable = () => {
  const [books, setBooks] = useState<null | BookDataType[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSimpleDialog, setShowSimpleDialog] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<RowDataType | null>(null);

  const initialSortModel: { field: string; sort: GridSortDirection }[] =
    useMemo(() => {
      // @ts-ignore
      return JSON.parse(localStorage.getItem("initialSortModel")) || undefined;
    }, []);

  useEffect(() => {
    fetchBooksJSON().then((data: ResponseFetchApiType) => {
      if (data.books && data.books.length > 0) {
        setBooks(data.books);
        setIsLoading(false);
      } else {
        setBooks(null);
        setIsLoading(false);
      }
    });
  }, []);

  const rows: RowDataType[] = useMemo(() => {
    if (books && books.length > 0) {
      return books.map((item) => {
        return {
          title: item.title,
          subtitle: item.subtitle,
          image: item.image,
          price: Number(item.price.slice(1)),
          date: new Date().toDateString(),
          id: item.isbn13,
        };
      });
    } else {
      return [
        {
          title: "Hahaha",
          subtitle: "haha3",
          image: "",
          price: 12,
          date: new Date().toDateString(),
          id: "1",
        },
      ];
    }
  }, [books]);

  if (isLoading) {
    return (
      <div className="preloader">
        <CircularProgress />
      </div>
    );
  }

  return (
    <Fragment>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          autoHeight={true}
          columns={columns}
          onSortModelChange={(e) =>
            localStorage.setItem("initialSortModel", JSON.stringify(e))
          }
          sortModel={initialSortModel}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cellContent": { minHeight: 100, maxHeight: 300 },
          }}
          pageSizeOptions={[5]}
          onCellClick={(e) => {
            e.field === "image" ? setFullScreen(true) : setFullScreen(false);
            setSelectedRow(e.row);
            setShowSimpleDialog(true);
          }}
        />
      </Box>
      <SimpleDialog
        open={showSimpleDialog}
        handleClose={() => setShowSimpleDialog(false)}
        fullScreen={fullScreen}
        columns={columns}
        row={selectedRow}
      />
    </Fragment>
  );
};
