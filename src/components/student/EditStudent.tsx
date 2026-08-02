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

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
    getStudentById,
    updateStudent,
    type StudentRequest
} from "../../services/studentApi";
import { getDepartments, type DepartmentData } from "../../services/departmentApi";


const EditStudent = () => {


    const { id } = useParams();

    const navigate = useNavigate();

    const [departments, setDepartments] =
        useState<DepartmentData[]>([]);

    useEffect(() => {


        const fetchDepartments = async () => {


            try {

                const data = await getDepartments();

                setDepartments(data);


            }
            catch (error) {

                console.log(error);

            }


        };


        fetchDepartments();


    }, []);

    const {
        register,
        handleSubmit,
        reset,
        control,
        watch,
        formState: { errors }

    } = useForm<StudentRequest>({
        defaultValues: {
            name: "",
            departmentId: 0,
            email: "",
            phone: "",
            address: "",
            gender: "",
            joinDate: "",
            parentContact: ""
        }
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const values = watch();

    console.log(values);

    useEffect(() => {
        if (id) {
            getStudentById(Number(id))
                .then((res) => {

                    console.log("API Response:", res.data);

                    const student = res.data;

                    const formData = {
                        name: student.name,
                        departmentId: student.department.departmentId,
                        email: student.email,
                        phone: student.phone,
                        address: student.address,
                        gender: student.gender,
                        joinDate: student.joinDate.substring(0, 10),
                        parentContact: student.parentContact
                    };

                    console.log("Form Data:", formData);

                    reset(formData);

                })
                .catch(console.error);
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


                        <FormControl fullWidth>

                            <InputLabel>
                                Department
                            </InputLabel>


                            <Controller

                                name="departmentId"

                                control={control}

                                rules={{
                                    required: "Department required"
                                }}

                                render={({ field }) => (

                                    <Select
                                        {...field}
                                        label="Department"
                                    >


                                        {
                                            departments.map((dept) => (
                                                <MenuItem
                                                    key={dept.departmentId}
                                                    value={dept.departmentId}
                                                >
                                                    {dept.departmentName}

                                                </MenuItem>
                                            ))
                                        }


                                    </Select>

                                )}

                            />


                        </FormControl>


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