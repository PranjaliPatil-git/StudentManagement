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

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteFee,
  getFees,
  type StudentFee,
} from "../../services/feeApi";



interface Column {
  id:
  | "studentName"
  | "departmentName"
  | "email"
  | "phone"
  | "totalFee"
  | "paidAmount"
  | "paidDate"
  | "paymentType"
  | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  { id: "studentName", label: "Name", minWidth: 180 },
  { id: "departmentName", label: "Department", minWidth: 150 },
  { id: "email", label: "Email", minWidth: 250 },
  { id: "phone", label: "Phone", minWidth: 150 },
  { id: "totalFee", label: "Total Fee", minWidth: 150 },
  { id: "paidAmount", label: "Paid Amount", minWidth: 150 },
  { id: "paidDate", label: "Paid Date", minWidth: 150 },
  { id: "paymentType", label: "Payment Type", minWidth: 150 },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];


export default function StudentFeeTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState<StudentFee[]>([]);

  const navigate = useNavigate();

  const handleChangePage = (
    _event: unknown,
    newPage: number
  ) => {
    setPage(newPage);
  };

   const loadFees = async () => {
    try {
      const response = await getFees();
      setRows(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFees();
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleView = (student: StudentFee) => {
    navigate(`/view-fee/${student.id}`);
  };

  const handleEdit = (student: StudentFee) => {
    navigate(`/edit-fee/${student.id}`);
  };

  const handleDelete = async (student: StudentFee) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${student.studentName}?`
    );

    if (!confirmDelete) return;

    try {
      await deleteFee(student.id);
      loadFees();
    } catch (error) {
      console.log(error);
    }
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
              .map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "actions" ? (
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
                        row[column.id as keyof StudentFee]
                      )}
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