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
import { useNavigate } from "react-router-dom";
import { getStudents, deleteStudent } from "../services/studentApi";
import type { Student } from "../services/studentApi";



interface Column {
  id: "name" | "department" | "email" | "phone" | "joinDate" | "actions";
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
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];




export default function StudentTable() {


  const navigate = useNavigate();

  const [rows, setRows] = React.useState<Student[]>([]);

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);



  React.useEffect(() => {


    getStudents()
      .then((response) => {

        setRows(response.data);

      })
      .catch((error) => {

        console.log(error);

      });


  }, []);




  const handleDelete = async (id: number) => {


    try {

      await deleteStudent(id);


      setRows(prev =>
        prev.filter(student => student.id !== id)
      );


    }
    catch (error) {

      console.log(error);

    }

  };





  const handleChangePage = (
    _event: unknown,
    newPage: number
  ) => {

    setPage(newPage);

  };



  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    setRowsPerPage(
      Number(event.target.value)
    );

    setPage(0);

  };




  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {
                columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#1976d2",
                      color: "white"
                    }}>
                    {column.label}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              rows
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => (
                  <TableRow hover key={row.id}>
                    {
                      columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                        >
                          {
                            column.id === "actions"
                              ?
                              <>
                                <Tooltip title="View">
                                  <IconButton
                                    color="primary"
                                    onClick={() => navigate(`/student-view/${row.id}`)}
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Edit">
                                  <IconButton
                                    color="success"
                                    onClick={() =>
                                      navigate(`/student-edit/${row.id}`)
                                    }
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">

                                  <IconButton
                                    color="error"
                                    onClick={() => handleDelete(row.id!)}
                                  >

                                    <DeleteIcon />

                                  </IconButton>


                                </Tooltip>



                              </>


                              :

                              row[column.id]

                          }



                        </TableCell>


                      ))
                    }



                  </TableRow>


                ))
            }



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