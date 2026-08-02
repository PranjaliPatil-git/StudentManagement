import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id:
    | "studentName"
    | "rollNo"
    | "department"
    | "subject"
    | "faculty"
    | "date"
    | "status"
    | "actions";

  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "studentName",
    label: "Student Name",
    minWidth: 220,
  },
  {
    id: "rollNo",
    label: "Roll No",
    minWidth: 120,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 200,
  },
  {
    id: "subject",
    label: "Subject",
    minWidth: 180,
  },
  {
    id: "faculty",
    label: "Faculty",
    minWidth: 180,
  },
  {
    id: "date",
    label: "Attendance Date",
    minWidth: 150,
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
    minWidth: 150,
    align: "center",
  },
];

interface AttendanceData {
  studentName: string;
  rollNo: string;
  department: string;
  subject: string;
  faculty: string;
  date: string;
  status: string;
}

function createData(
  studentName: string,
  rollNo: string,
  department: string,
  subject: string,
  faculty: string,
  date: string,
  status: string
): AttendanceData {
  return {
    studentName,
    rollNo,
    department,
    subject,
    faculty,
    date,
    status,
  };
}

const rows: AttendanceData[] = [
  createData(
    "Pranjali Patil",
    "CS101",
    "Computer Science",
    "Java",
    "Mr. Sharma",
    "01-08-2026",
    "Present"
  ),

  createData(
    "Rahul Patil",
    "CS102",
    "Computer Science",
    "Spring Boot",
    "Mr. Sharma",
    "01-08-2026",
    "Absent"
  ),

  createData(
    "Sneha Kulkarni",
    "IT201",
    "Information Technology",
    "React JS",
    "Mrs. Joshi",
    "01-08-2026",
    "Late"
  ),

  createData(
    "Aman Singh",
    "ME301",
    "Mechanical",
    "CAD",
    "Mr. Patil",
    "01-08-2026",
    "Present"
  ),

  createData(
    "Rohan Sharma",
    "CE401",
    "Civil",
    "Surveying",
    "Mr. Deshmukh",
    "01-08-2026",
    "Half Day"
  ),
];

export default function AttendanceTable() {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(5);

  const handleChangePage = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (attendance: AttendanceData) => {
    console.log("View", attendance);
  };

  const handleEdit = (attendance: AttendanceData) => {
    console.log("Edit", attendance);
  };

  const handleDelete = (attendance: AttendanceData) => {
    const confirmDelete = window.confirm(
      `Delete attendance of ${attendance.studentName}?`
    );

    if (confirmDelete) {
      console.log("Deleted", attendance);
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
              .map((row, index) => (
                <TableRow hover key={index}>                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                    >
                      {column.id === "status" ? (
                        <Chip
                          label={row.status}
                          color={
                            row.status === "Present"
                              ? "success"
                              : row.status === "Absent"
                              ? "error"
                              : row.status === "Late"
                              ? "warning"
                              : "info"
                          }
                          size="small"
                        />
                      ) : column.id === "actions" ? (
                        <>
                          <Tooltip title="View">
                            <IconButton
                              color="primary"
                              onClick={() => handleView(row)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Edit">
                            <IconButton
                              color="success"
                              onClick={() => handleEdit(row)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(row)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        row[column.id as keyof AttendanceData]
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
        rowsPerPageOptions={[5, 10, 25]}
        count={rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper>
  );
}