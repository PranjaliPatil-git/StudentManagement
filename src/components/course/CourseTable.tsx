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
  getCourses,
  deleteCourse,
  type CourseData,
} from "../../services/courseApi";

interface Column {
  id:
    | "courseName"
    | "courseCode"
    | "departmentName"
    | "duration"
    | "totalSemesters"
    | "status"
    | "actions";

  label: string;

  minWidth?: number;

  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "courseName",
    label: "Course Name",
    minWidth: 220,
  },
  {
    id: "courseCode",
    label: "Course Code",
    minWidth: 150,
  },
  {
    id: "departmentName",
    label: "Department",
    minWidth: 220,
  },
  {
    id: "duration",
    label: "Duration (Years)",
    minWidth: 120,
    align: "center",
  },
  {
    id: "totalSemesters",
    label: "Semesters",
    minWidth: 120,
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

const CourseTable = () => {
  const navigate = useNavigate();

  const [rows, setRows] = React.useState<CourseData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const loadCourses = React.useCallback(async () => {
    try {
        const response = await getCourses();
        setRows(response.data);
    } catch (error) {
        console.error(error);
    }
}, []);

React.useEffect(() => {
    void loadCourses();
}, [loadCourses]);

const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
        return;
    }

    try {
        await deleteCourse(id);
        await loadCourses();
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
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((row) => (
                <TableRow hover key={row.courseId}>
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
                                navigate(`/view-course/${row.courseId}`)
                              }
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <IconButton
                              color="success"
                              onClick={() =>
                                navigate(`/edit-course/${row.courseId}`)
                              }
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() =>
                                handleDelete(row.courseId)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        row[column.id as keyof CourseData]
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

export default CourseTable;