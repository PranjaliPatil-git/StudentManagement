import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "name" | "department" | "email" | "phone" | "joinDate";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 180 },
  { id: "department", label: "Department", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 250 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "joinDate", label: "Join Date", minWidth: 150 },
];

interface Data {
  name: string;
  department: string;
  email: string;
  phone: string;
  joinDate: string;
}

function createData(
  name: string,
  department: string,
  email: string,
  phone: string,
  joinDate: string
): Data {
  return { name, department, email, phone, joinDate };
}

const rows: Data[] = [
  createData(
    "Pranjali Patil",
    "Electrical",
    "pranjali@gmail.com",
    "9876543210",
    "01-01-2026"
  ),
  createData(
    "Aman Sharma",
    "IT",
    "aman@gmail.com",
    "9876543211",
    "15-02-2026"
  ),
  createData(
    "Raj Verma",
    "Computer Science",
    "raj@gmail.com",
    "9876543212",
    "10-03-2026"
  ),
  createData(
    "Sneha Patil",
    "Engineering",
    "sneha@gmail.com",
    "9876543213",
    "20-04-2026"
  ),
  createData(
    "Rohan Singh",
    "Sales",
    "rohan@gmail.com",
    "9876543214",
    "12-05-2026"
  ),
];

export default function EmployeeTable() {
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

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1976d2",
                    color: "white",
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
              .map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}