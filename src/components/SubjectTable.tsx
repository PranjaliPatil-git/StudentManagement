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
    | "subjectName"
    | "subjectCode"
    | "department"
    | "semester"
    | "credits"
    | "status"
    | "actions";

  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
}

const columns: readonly Column[] = [
  {
    id: "subjectName",
    label: "Subject Name",
    minWidth: 220,
  },
  {
    id: "subjectCode",
    label: "Subject Code",
    minWidth: 150,
  },
  {
    id: "department",
    label: "Department",
    minWidth: 220,
  },
  {
    id: "semester",
    label: "Semester",
    minWidth: 120,
    align: "center",
  },
  {
    id: "credits",
    label: "Credits",
    minWidth: 100,
    align: "center",
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
    minWidth: 160,
    align: "center",
  },
];

interface SubjectData {
  subjectName: string;
  subjectCode: string;
  department: string;
  semester: number;
  credits: number;
  status: boolean;
}

function createData(
  subjectName: string,
  subjectCode: string,
  department: string,
  semester: number,
  credits: number,
  status: boolean
): SubjectData {
  return {
    subjectName,
    subjectCode,
    department,
    semester,
    credits,
    status,
  };
}

const rows: SubjectData[] = [
  createData(
    "Java Programming",
    "CS301",
    "Computer Science",
    3,
    4,
    true
  ),

  createData(
    "Spring Boot",
    "CS401",
    "Computer Science",
    4,
    4,
    true
  ),

  createData(
    "React JS",
    "IT402",
    "Information Technology",
    4,
    3,
    true
  ),

  createData(
    "Operating System",
    "CS302",
    "Computer Science",
    3,
    4,
    true
  ),

  createData(
    "Machine Learning",
    "AI501",
    "Artificial Intelligence",
    5,
    4,
    false
  ),

  createData(
    "Cloud Computing",
    "IT503",
    "Information Technology",
    5,
    4,
    true
  ),

  createData(
    "DBMS",
    "CS205",
    "Computer Science",
    2,
    4,
    true
  ),
];

export default function SubjectTable() {

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

  const handleView = (subject: SubjectData) => {
    console.log(subject);
  };

  const handleEdit = (subject: SubjectData) => {
    console.log(subject);
  };

  const handleDelete = (subject: SubjectData) => {
    if (
      window.confirm(
        `Delete ${subject.subjectName}?`
      )
    ) {
      console.log(subject);
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
                        row[column.id as keyof SubjectData]
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