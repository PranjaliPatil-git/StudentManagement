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
    | "employeeId"
    | "facultyName"
    | "department"
    | "salaryMonth"
    | "basicSalary"
    | "netSalary"
    | "paymentDate"
    | "status"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "employeeId", label: "Employee ID", minWidth: 120 },
  { id: "facultyName", label: "Faculty Name", minWidth: 200 },
  { id: "department", label: "Department", minWidth: 180 },
  { id: "salaryMonth", label: "Salary Month", minWidth: 130 },
  {
    id: "basicSalary",
    label: "Basic Salary",
    minWidth: 130,
    align: "right",
  },
  {
    id: "netSalary",
    label: "Net Salary",
    minWidth: 130,
    align: "right",
  },
  { id: "paymentDate", label: "Payment Date", minWidth: 150 },
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

interface SalaryData {
  employeeId: string;
  facultyName: string;
  department: string;
  salaryMonth: string;
  basicSalary: number;
  netSalary: number;
  paymentDate: string;
  status: string;
}

function createData(
  employeeId: string,
  facultyName: string,
  department: string,
  salaryMonth: string,
  basicSalary: number,
  netSalary: number,
  paymentDate: string,
  status: string
): SalaryData {
  return {
    employeeId,
    facultyName,
    department,
    salaryMonth,
    basicSalary,
    netSalary,
    paymentDate,
    status,
  };
}

const rows: SalaryData[] = [
  createData(
    "EMP001",
    "Amit Sharma",
    "Computer Science",
    "July 2026",
    45000,
    42500,
    "31-07-2026",
    "Paid"
  ),
  createData(
    "EMP002",
    "Sneha Patil",
    "Information Technology",
    "July 2026",
    50000,
    47200,
    "31-07-2026",
    "Paid"
  ),
  createData(
    "EMP003",
    "Rahul Patil",
    "Administration",
    "July 2026",
    30000,
    28500,
    "",
    "Pending"
  ),
  createData(
    "EMP004",
    "Pooja Deshmukh",
    "Library",
    "July 2026",
    35000,
    33200,
    "30-07-2026",
    "Paid"
  ),
  createData(
    "EMP005",
    "Rohan Singh",
    "Computer Science",
    "July 2026",
    48000,
    45500,
    "",
    "Pending"
  ),
];

export default function SalaryTable() {
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

  const handleView = (salary: SalaryData) => {
    console.log("View:", salary);
  };

  const handleEdit = (salary: SalaryData) => {
    console.log("Edit:", salary);
  };

  const handleDelete = (salary: SalaryData) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete salary record of ${salary.facultyName}?`
    );

    if (confirmDelete) {
      console.log("Deleted:", salary);
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
                            row.status === "Paid"
                              ? "success"
                              : "warning"
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
                        row[column.id as keyof SalaryData]
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