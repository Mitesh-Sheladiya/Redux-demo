import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { editItem, getPostData } from "../../store/action";

const columns = [{ id: "title", label: "Title", minWidth: 170 }];

const PostData = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState();
  const [isError, setError] = useState(false);

  const tableData = useSelector((store) => store.tableData);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelectedTitleId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleNewText = (title) => {
    setNewTitle(title);
  };

  const handleEditTitle = () => {
    if (newTitle === "") {
      setError(true);
    } else {
      dispatch(editItem(selectedTitleId, newTitle));
      setOpen(false);
      setNewTitle("");
      setError(false);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostData());
  }, []); // eslint-disable-line

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                      fontSize: "18px",
                      backgroundColor: "#A6E5A9",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundColor: "#A6E5A9",
                  }}
                >
                  Edit
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    backgroundColor: "#A6E5A9",
                  }}
                >
                  Comment
                </TableCell>
              </>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <>
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                          <TableCell key={column.id} align={column.align}>
                            <NavLink onClick={() => handleClickOpen(row.id)}>
                              Edit
                            </NavLink>
                          </TableCell>

                          <TableCell key={column.id} align={column.align}>
                            <NavLink
                              to={`/comments/postId/${row.id}`}
                              // onClick={() => handleComment(row.id)}
                            >
                              comment
                            </NavLink>
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Title</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit the title, please enter your new title here.
          </DialogContentText>
          {isError ? (
            <DialogContentText style={{ color: "red" }}>
              Please enter new title.
            </DialogContentText>
          ) : (
            ""
          )}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => handleNewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ background: "#1976d2", color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleEditTitle()}
            style={{ background: "#1976d2", color: "white" }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PostData;
