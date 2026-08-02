import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
    getStudentById,
    updateStudent,
    type StudentRequest
} from "../../services/studentApi";


const EditStudent = () => {


    const { id } = useParams();

    const navigate = useNavigate();


    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }

    } = useForm<StudentRequest>({
        defaultValues: {
            name: "",
            department: "",
            email: "",
            phone: "",
            address: "",
            gender: "",
            joinDate: "",
            parentContact: ""
        }
    });

    useEffect(() => {

        if (id) {

            getStudentById(Number(id))
                .then((res) => {

                    const student = res.data;

                    reset({
                        name: student.name,
                        department: student.department,
                        email: student.email,
                        phone: student.phone,
                        address: student.address,
                        gender: student.gender,
                        joinDate: student.joinDate?.substring(0, 10),
                        parentContact: student.parentContact
                    });

                })
                .catch((error) => {
                    console.log(error);
                });

        }

    }, [id, reset]);



    const onUpdate = async (data: StudentRequest) => {


        try {


            await updateStudent(
                Number(id),
                data
            );


            alert("Student Updated Successfully");


            navigate("/student");


        }
        catch (error) {

            console.log(error);

            alert("Update Failed");

        }

        reset();

    };





    return (

        <Box component="form"
            onSubmit={handleSubmit(onUpdate)}
        >


            <Box sx={{ boxShadow: 3, p: 4 }}>


                <Typography
                    sx={{
                        fontWeight: "bold",
                        mb: 2
                    }}
                >
                    Edit Student
                </Typography>



                <Stack spacing={2}>


                    <Box sx={{ display: "flex", gap: 3 }}>


                        <TextField
                            label="Name"
                            fullWidth

                            {...register("name", {
                                required: "Name required"
                            })}

                            error={!!errors.name}
                            helperText={errors.name?.message}

                        />


                        <TextField
                            label="Department"
                            fullWidth

                            {...register("department", {
                                required: "Department required"
                            })}

                            error={!!errors.department}
                            helperText={errors.department?.message}

                        />


                    </Box>





                    <Box sx={{ display: "flex", gap: 3 }}>


                        <TextField
                            label="Email"
                            fullWidth

                            {...register("email")}

                        />



                        <TextField
                            label="Phone"
                            fullWidth

                            {...register("phone")}

                        />


                    </Box>






                    <Box sx={{ display: "flex", gap: 3 }}>
                        <FormControl fullWidth>

                            <InputLabel>
                                Gender
                            </InputLabel>


                            <Controller

                                name="gender"

                                control={control}

                                render={({ field }) => (

                                    <Select
                                        {...field}
                                        label="Gender"
                                    >

                                        <MenuItem value="Male">
                                            Male
                                        </MenuItem>

                                        <MenuItem value="Female">
                                            Female
                                        </MenuItem>

                                        <MenuItem value="Other">
                                            Other
                                        </MenuItem>

                                    </Select>

                                )}

                            />

                        </FormControl>





                        <TextField
                            label="Join Date"
                            type="date"
                            fullWidth

                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}

                            {...register("joinDate")}

                        />


                    </Box>





                    <TextField

                        label="Address"

                        multiline

                        rows={3}

                        fullWidth


                        {...register("address")}

                    />





                    <TextField

                        label="Parent Contact"

                        fullWidth


                        {...register("parentContact")}

                    />






                    <Box sx={{ display: "flex", gap: 3 }}>


                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >

                            Update

                        </Button>




                        <Button
                            variant="contained"
                            color="error"
                            fullWidth

                            onClick={() => navigate("/student")}

                        >

                            Cancel

                        </Button>



                    </Box>



                </Stack>



            </Box>


        </Box>


    );


}


export default EditStudent;