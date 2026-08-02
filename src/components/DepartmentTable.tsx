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

interface Column {
  id:
    | "departmentName"
    | "departmentCode"
    | "hodName"
    | "description"
    | "status"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "departmentName",
    label: "Department Name",
    minWidth: 220,
  },
  {
    id: "departmentCode",
    label: "Department Code",
    minWidth: 150,
  },
  {
    id: "hodName",
    label: "HOD Name",
    minWidth: 180,
  },
  {
    id: "description",
    label: "Description",
    minWidth: 280,
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

interface DepartmentData {
  departmentName: string;
  departmentCode: string;
  hodName: string;
  description: string;
  status: boolean;
}

function createData(
  departmentName: string,
  departmentCode: string,
  hodName: string,
  description: string,
  status: boolean
): DepartmentData {
  return {
    departmentName,
    departmentCode,
    hodName,
    description,
    status,
  };
}

const rows: DepartmentData[] = [
  createData(
    "Computer Science",
    "CSE",
    "Dr. Rajesh Sharma",
    "Handles Computer Science Programs",
    true
  ),
  createData(
    "Information Technology",
    "IT",
    "Dr. Sneha Patil",
    "Information Technology Department",
    true
  ),
  createData(
    "Mechanical Engineering",
    "ME",
    "Dr. Amit Kumar",
    "Mechanical Engineering Department",
    false
  ),
  createData(
    "Civil Engineering",
    "CE",
    "Dr. Vivek Joshi",
    "Civil Engineering Department",
    true
  ),
  createData(
    "Electrical Engineering",
    "EE",
    "Dr. Rakesh Singh",
    "Electrical Engineering Department",
    true
  ),
];

export default function DepartmentTable() {
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

  const handleView = (department: DepartmentData) => {
    console.log("View Department", department);
  };

  const handleEdit = (department: DepartmentData) => {
    console.log("Edit Department", department);
  };

  const handleDelete = (department: DepartmentData) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${department.departmentName}?`
    );

    if (confirmDelete) {
      console.log("Deleted", department);
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
                          label={
                            row.status ? "Active" : "Inactive"
                          }
                          color={
                            row.status ? "success" : "error"
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
                        row[column.id as keyof DepartmentData]
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