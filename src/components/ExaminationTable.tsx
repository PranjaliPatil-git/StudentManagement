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
    | "examId"
    | "examName"
    | "department"
    | "semester"
    | "subject"
    | "examType"
    | "examDate"
    | "startTime"
    | "endTime"
    | "status"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "examId", label: "Exam ID", minWidth: 120 },
  { id: "examName", label: "Exam Name", minWidth: 180 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "semester", label: "Semester", minWidth: 120 },
  { id: "subject", label: "Subject", minWidth: 170 },
  { id: "examType", label: "Exam Type", minWidth: 130 },
  { id: "examDate", label: "Exam Date", minWidth: 130 },
  { id: "startTime", label: "Start Time", minWidth: 120 },
  { id: "endTime", label: "End Time", minWidth: 120 },
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

interface ExaminationData {
  examId: string;
  examName: string;
  department: string;
  semester: string;
  subject: string;
  examType: string;
  examDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

function createData(
  examId: string,
  examName: string,
  department: string,
  semester: string,
  subject: string,
  examType: string,
  examDate: string,
  startTime: string,
  endTime: string,
  status: string
): ExaminationData {
  return {
    examId,
    examName,
    department,
    semester,
    subject,
    examType,
    examDate,
    startTime,
    endTime,
    status,
  };
}

const rows: ExaminationData[] = [
  createData(
    "EX001",
    "Mid Semester",
    "Computer Science",
    "Semester 5",
    "Java",
    "Internal",
    "15-09-2026",
    "09:00 AM",
    "11:00 AM",
    "Scheduled"
  ),
  createData(
    "EX002",
    "Practical Exam",
    "Computer Science",
    "Semester 5",
    "Spring Boot",
    "Practical",
    "18-09-2026",
    "10:00 AM",
    "12:00 PM",
    "Scheduled"
  ),
  createData(
    "EX003",
    "End Semester",
    "Information Technology",
    "Semester 3",
    "React",
    "Semester",
    "22-09-2026",
    "01:00 PM",
    "04:00 PM",
    "Completed"
  ),
  createData(
    "EX004",
    "Viva",
    "Mechanical",
    "Semester 2",
    "Thermodynamics",
    "Viva",
    "25-09-2026",
    "11:00 AM",
    "12:00 PM",
    "Cancelled"
  ),
  createData(
    "EX005",
    "Internal Test",
    "Civil",
    "Semester 4",
    "Surveying",
    "Internal",
    "28-09-2026",
    "09:30 AM",
    "11:30 AM",
    "Scheduled"
  ),
];

export default function ExaminationTable() {

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

  const handleView = (row: ExaminationData) => {
    console.log("View", row);
  };

  const handleEdit = (row: ExaminationData) => {
    console.log("Edit", row);
  };

  const handleDelete = (row: ExaminationData) => {
    const confirmDelete = window.confirm(
      `Delete ${row.examName}?`
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
                          label={row.status}
                          color={
                            row.status === "Scheduled"
                              ? "primary"
                              : row.status === "Completed"
                              ? "success"
                              : "error"
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
                        row[column.id as keyof ExaminationData]
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