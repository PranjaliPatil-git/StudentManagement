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
    | "rollNo"
    | "studentName"
    | "department"
    | "semester"
    | "subject"
    | "marks"
    | "grade"
    | "result"
    | "actions";

  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "rollNo", label: "Roll No", minWidth: 120 },
  { id: "studentName", label: "Student Name", minWidth: 180 },
  { id: "department", label: "Department", minWidth: 170 },
  { id: "semester", label: "Semester", minWidth: 120 },
  { id: "subject", label: "Subject", minWidth: 170 },
  {
    id: "marks",
    label: "Marks",
    minWidth: 100,
    align: "center",
  },
  {
    id: "grade",
    label: "Grade",
    minWidth: 100,
    align: "center",
  },
  {
    id: "result",
    label: "Result",
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

interface ResultData {
  rollNo: string;
  studentName: string;
  department: string;
  semester: string;
  subject: string;
  marks: number;
  grade: string;
  result: string;
}

function createData(
  rollNo: string,
  studentName: string,
  department: string,
  semester: string,
  subject: string,
  marks: number,
  grade: string,
  result: string
): ResultData {
  return {
    rollNo,
    studentName,
    department,
    semester,
    subject,
    marks,
    grade,
    result,
  };
}

const rows: ResultData[] = [
  createData(
    "CS001",
    "Pranjali Patil",
    "Computer Science",
    "Semester 5",
    "Java",
    92,
    "A+",
    "Pass"
  ),

  createData(
    "CS002",
    "Aman Sharma",
    "Computer Science",
    "Semester 5",
    "Spring Boot",
    81,
    "A",
    "Pass"
  ),

  createData(
    "IT015",
    "Sneha Patil",
    "Information Technology",
    "Semester 3",
    "React",
    74,
    "B+",
    "Pass"
  ),

  createData(
    "ME008",
    "Rahul Patil",
    "Mechanical",
    "Semester 2",
    "Thermodynamics",
    34,
    "F",
    "Fail"
  ),

  createData(
    "CV012",
    "Pooja Deshmukh",
    "Civil",
    "Semester 4",
    "Surveying",
    67,
    "B",
    "Pass"
  ),
];

export default function ResultTable() {

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

  const handleView = (row: ResultData) => {
    console.log("View", row);
  };

  const handleEdit = (row: ResultData) => {
    console.log("Edit", row);
  };

  const handleDelete = (row: ResultData) => {
    const confirmDelete = window.confirm(
      `Delete result of ${row.studentName}?`
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
                      {column.id === "result" ? (
                        <Chip
                          label={row.result}
                          color={
                            row.result === "Pass"
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
                        row[column.id as keyof ResultData]
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