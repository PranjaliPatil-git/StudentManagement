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
    | "department"
    | "designation"
    | "subject"
    | "email"
    | "phone"
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
    minWidth: 120,
  },
  {
    id: "facultyName",
    label: "Faculty Name",
    minWidth: 220,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 180,
  },
  {
    id: "designation",
    label: "Designation",
    minWidth: 180,
  },
  {
    id: "subject",
    label: "Subject",
    minWidth: 180,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 220,
  },
  {
    id: "phone",
    label: "Mobile",
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

interface FacultyData {
  employeeId: string;
  facultyName: string;
  department: string;
  designation: string;
  subject: string;
  email: string;
  phone: string;
  status: boolean;
  facultyType: "Teaching" | "Non Teaching";
}

function createData(
  employeeId: string,
  facultyName: string,
  department: string,
  designation: string,
  subject: string,
  email: string,
  phone: string,
  status: boolean,
  facultyType: "Teaching" | "Non Teaching"
): FacultyData {
  return {
    employeeId,
    facultyName,
    department,
    designation,
    subject,
    email,
    phone,
    status,
    facultyType,
  };
}

const rows: FacultyData[] = [
  createData(
    "EMP001",
    "Amit Sharma",
    "Computer Science",
    "Assistant Professor",
    "Java",
    "amit@gmail.com",
    "9876543210",
    true,
    "Teaching"
  ),

  createData(
    "EMP002",
    "Sneha Patil",
    "Information Technology",
    "Professor",
    "React JS",
    "sneha@gmail.com",
    "9876543211",
    true,
    "Teaching"
  ),

  createData(
    "EMP003",
    "Rahul Patil",
    "Administration",
    "Office Clerk",
    "-",
    "rahul@gmail.com",
    "9876543212",
    true,
    "Non Teaching"
  ),

  createData(
    "EMP004",
    "Pooja Deshmukh",
    "Library",
    "Librarian",
    "-",
    "pooja@gmail.com",
    "9876543213",
    false,
    "Non Teaching"
  ),

  createData(
    "EMP005",
    "Rohan Singh",
    "Computer Science",
    "Lecturer",
    "Spring Boot",
    "rohan@gmail.com",
    "9876543214",
    true,
    "Teaching"
  ),
];

interface FacultyTableProps {
  facultyType: "Teaching" | "Non Teaching";
}

export default function FacultyTable({
  facultyType,
}: FacultyTableProps) {

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] =
    React.useState(5);

  const filteredRows = rows.filter(
    (faculty) => faculty.facultyType === facultyType
  );

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

  const handleView = (faculty: FacultyData) => {
    console.log("View", faculty);
  };

  const handleEdit = (faculty: FacultyData) => {
    console.log("Edit", faculty);
  };

  const handleDelete = (faculty: FacultyData) => {
    if (
      window.confirm(
        `Delete ${faculty.facultyName}?`
      )
    ) {
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

            {filteredRows
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
                        row[column.id as keyof FacultyData]
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
        count={filteredRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

    </Paper>
  );
}