import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import { blue } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { GridColDef } from "@mui/x-data-grid";
import "./styles.css";
import {
  Avatar,
  Card,
  CardMedia,
  DialogContent,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import { Fragment } from "react";

type Props = {
  handleClose: () => void;
  open: boolean;
  columns: GridColDef[];
  row: { [key: string]: string | number } | null;
  fullScreen: boolean;
};
export const SimpleDialog = ({
  handleClose,
  open,
  row,
  columns,
  fullScreen,
}: Props) => {
  return (
    <Dialog onClose={handleClose} open={open} fullScreen={fullScreen}>
      {!fullScreen && <DialogTitle>More Information</DialogTitle>}
      <DialogContent>
        {fullScreen ? (
          <Fragment>
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Card>
              <CardMedia
                component="img"
                image={row?.image.toString() || ""}
                alt=""
              />
            </Card>
          </Fragment>
        ) : (
          <List classes={{ padding: "20px" }} disablePadding={false}>
            {row &&
              Object.keys(row).map(
                (item) =>
                  item !== "id" && (
                    <ListItem key={item} disableGutters>
                      <ListItemText
                        primary={`
                  ${
                    columns.find((element) => element.field === item)
                      ?.headerName || item
                  }: `}
                      />
                      {item === "image" ? (
                        <Avatar src={row[item].toString()} />
                      ) : (
                        <ListItemText primary={row[item]} />
                      )}
                    </ListItem>
                  )
              )}
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};
