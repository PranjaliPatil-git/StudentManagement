import {
    Box,
    Typography,
    Paper
} from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getStudentById,
    type Student
} from "../../services/studentApi";


const StudentView = () => {


    const { id } = useParams();


    const [student, setStudent] = useState<Student>();



    useEffect(() => {


        if (id) {

            getStudentById(Number(id))
                .then(res => {

                    setStudent(res.data);

                })
                .catch(err => console.log(err));

        }


    }, [id]);



    return (

        <Paper sx={{ p: 4, boxShadow: 3 }}>


            <Typography
                variant="h5"
                sx={{ mb: 3 }}
            >
                Student Details
            </Typography>


            {
                student &&

                <Box>


                    <Typography>
                        Name : {student.name}
                    </Typography>


                    <Typography>
                        Department : {student.department}
                    </Typography>


                    <Typography>
                        Email : {student.email}
                    </Typography>


                    <Typography>
                        Phone : {student.phone}
                    </Typography>


                    <Typography>
                        Gender : {student.gender}
                    </Typography>


                    <Typography>
                        Joining Date : {student.joinDate}
                    </Typography>


                    <Typography>
                        Address : {student.address}
                    </Typography>


                    <Typography>
                        Parent Contact : {student.parentContact}
                    </Typography>


                </Box>

            }


        </Paper>

    )

}


export default StudentView;