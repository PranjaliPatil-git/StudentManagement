import * as React from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Column {
  id:
    | "day"
    | "startTime"
    | "endTime"
    | "department"
    | "semester"
    | "subject"
    | "faculty"
    | "classroom"
    | "status"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "day", label: "Day", minWidth: 120 },
  { id: "startTime", label: "Start Time", minWidth: 120 },
  { id: "endTime", label: "End Time", minWidth: 120 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "semester", label: "Semester", minWidth: 120 },
  { id: "subject", label: "Subject", minWidth: 180 },
  { id: "faculty", label: "Faculty", minWidth: 180 },
  { id: "classroom", label: "Classroom", minWidth: 120 },
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

interface TimetableData {
  day: string;
  startTime: string;
  endTime: string;
  department: string;
  semester: string;
  subject: string;
  faculty: string;
  classroom: string;
  status: boolean;
}

function createData(
  day: string,
  startTime: string,
  endTime: string,
  department: string,
  semester: string,
  subject: string,
  faculty: string,
  classroom: string,
  status: boolean
): TimetableData {
  return {
    day,
    startTime,
    endTime,
    department,
    semester,
    subject,
    faculty,
    classroom,
    status,
  };
}

const rows: TimetableData[] = [
  createData(
    "Monday",
    "09:00 AM",
    "10:00 AM",
    "Computer Science",
    "Semester 5",
    "Java",
    "Amit Sharma",
    "Room 101",
    true
  ),
  createData(
    "Monday",
    "10:00 AM",
    "11:00 AM",
    "Computer Science",
    "Semester 5",
    "Spring Boot",
    "Sneha Patil",
    "Room 102",
    true
  ),
  createData(
    "Tuesday",
    "11:00 AM",
    "12:00 PM",
    "Information Technology",
    "Semester 3",
    "React",
    "Rohan Singh",
    "Lab 1",
    true
  ),
  createData(
    "Wednesday",
    "01:00 PM",
    "02:00 PM",
    "Mechanical",
    "Semester 2",
    "Thermodynamics",
    "Rahul Patil",
    "Room 203",
    false
  ),
  createData(
    "Thursday",
    "02:00 PM",
    "03:00 PM",
    "Civil",
    "Semester 4",
    "Surveying",
    "Pooja Deshmukh",
    "Room 305",
    true
  ),
];

export default function TimetableTable() {

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

  const handleView = (row: TimetableData) => {
    console.log("View", row);
  };

  const handleEdit = (row: TimetableData) => {
    console.log("Edit", row);
  };

  const handleDelete = (row: TimetableData) => {
    const confirmDelete = window.confirm(
      `Delete timetable for ${row.subject}?`
    );

    if (confirmDelete) {
      console.log("Deleted", row);
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
                    fontWeight: "bold",
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
                <TableRow hover key={index}>
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
                        row[column.id as keyof TimetableData]
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