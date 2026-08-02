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
    | "employeeId"
    | "facultyName"
    | "facultyType"
    | "department"
    | "date"
    | "checkIn"
    | "checkOut"
    | "status"
    | "actions";

  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "employeeId",
    label: "Employee ID",
    minWidth: 130,
  },
  {
    id: "facultyName",
    label: "Faculty Name",
    minWidth: 220,
  },
  {
    id: "facultyType",
    label: "Faculty Type",
    minWidth: 170,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 180,
  },
  {
    id: "date",
    label: "Attendance Date",
    minWidth: 150,
  },
  {
    id: "checkIn",
    label: "Check In",
    minWidth: 120,
  },
  {
    id: "checkOut",
    label: "Check Out",
    minWidth: 120,
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

interface FacultyAttendanceData {
  employeeId: string;
  facultyName: string;
  facultyType: "Teaching" | "Non Teaching";
  department: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

function createData(
  employeeId: string,
  facultyName: string,
  facultyType: "Teaching" | "Non Teaching",
  department: string,
  date: string,
  checkIn: string,
  checkOut: string,
  status: string
): FacultyAttendanceData {
  return {
    employeeId,
    facultyName,
    facultyType,
    department,
    date,
    checkIn,
    checkOut,
    status,
  };
}

const rows: FacultyAttendanceData[] = [
  createData(
    "EMP001",
    "Amit Sharma",
    "Teaching",
    "Computer Science",
    "01-08-2026",
    "09:00 AM",
    "04:00 PM",
    "Present"
  ),

  createData(
    "EMP002",
    "Sneha Patil",
    "Teaching",
    "Information Technology",
    "01-08-2026",
    "09:15 AM",
    "04:00 PM",
    "Late"
  ),

  createData(
    "EMP003",
    "Rahul Patil",
    "Non Teaching",
    "Administration",
    "01-08-2026",
    "-",
    "-",
    "Absent"
  ),

  createData(
    "EMP004",
    "Pooja Deshmukh",
    "Non Teaching",
    "Library",
    "01-08-2026",
    "09:05 AM",
    "01:00 PM",
    "Half Day"
  ),

  createData(
    "EMP005",
    "Rohan Singh",
    "Teaching",
    "Computer Science",
    "01-08-2026",
    "-",
    "-",
    "Leave"
  ),
];

export default function FacultyAttendanceTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  const handleView = (faculty: FacultyAttendanceData) => {
    console.log("View", faculty);
  };

  const handleEdit = (faculty: FacultyAttendanceData) => {
    console.log("Edit", faculty);
  };

  const handleDelete = (faculty: FacultyAttendanceData) => {
    const confirmDelete = window.confirm(
      `Delete attendance of ${faculty.facultyName}?`
    );

    if (confirmDelete) {
      console.log("Deleted", faculty);
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
                              : row.status === "Half Day"
                              ? "info"
                              : "secondary"
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
                        row[column.id as keyof FacultyAttendanceData]
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