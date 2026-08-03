import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate } from "react-router-dom";

import {
  getSubjects,
  deleteSubject,
  type SubjectResponse,
} from "../../services/subjectApi";

interface Column {
  id:
    | "subjectName"
    | "subjectCode"
    | "courseName"
    | "semester"
    | "credits"
    | "status"
    | "actions";

  label: string;

  minWidth?: number;

  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "subjectName",
    label: "Subject Name",
    minWidth: 220,
  },
  {
    id: "subjectCode",
    label: "Subject Code",
    minWidth: 150,
  },
  {
    id: "courseName",
    label: "Course",
    minWidth: 220,
  },
  {
    id: "semester",
    label: "Semester",
    minWidth: 120,
    align: "center",
  },
  {
    id: "credits",
    label: "Credits",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 120,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 180,
    align: "center",
  },
];

const SubjectTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = React.useState<SubjectResponse[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const loadSubjects = React.useCallback(async () => {
    try {
      const response = await getSubjects();
      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  React.useEffect(() => {
    void loadSubjects();
  }, [loadSubjects]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) {
      return;
    }

    try {
      await deleteSubject(id);
      await loadSubjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 520 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover key={row.subjectId}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.id === "status" ? (
                        <Chip
                          label={row.status ? "Active" : "Inactive"}
                          color={row.status ? "success" : "error"}
                          size="small"
                        />
                      ) : column.id === "actions" ? (
                        <>
                          <Tooltip title="View">
                            <IconButton
                              color="primary"
                              onClick={() =>
                                navigate(`/view-subject/${row.subjectId}`)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <IconButton
                              color="success"
                              onClick={() =>
                                navigate(`/edit-subject/${row.subjectId}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDelete(row.subjectId)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        row[column.id as keyof SubjectResponse]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
      />
    </Paper>
  );
};

export default SubjectTable;