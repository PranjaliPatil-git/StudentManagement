import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
    addStudent,
    type StudentRequest
} from "../../services/studentApi";
import { useState, useEffect } from "react";
import { type DepartmentData, getDepartments } from "../../services/departmentApi";


const AddStudent = () => {

    const [departments, setDepartments] =
        useState<DepartmentData[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
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

    useEffect(() => {

        const fetchDepartments = async () => {

            try {

                const data = await getDepartments();

                setDepartments(data);

            }
            catch (error) {

                console.log(
                    "Department loading failed",
                    error
                );

            }

        };


        fetchDepartments();


    }, []);



    const navigate = useNavigate();



    const onAddStud = async (data: StudentRequest) => {


        try {

            await addStudent(data);


            alert("Student Added Successfully");


            reset();


            navigate("/student");


        }
        catch (error) {

            console.log(error);

            alert("Failed to add student");

        }


    }


    return (
        <Box component="form" onSubmit={handleSubmit(onAddStud)} noValidate>
            <Box sx={{ boxShadow: 3, p: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>Add Student Form</Typography>

                <Stack spacing={2}>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField label="Name" fullWidth
                            {...register("name", {
                                required: "Name is required",
                            })} error={!!errors.name} helperText={errors.name?.message} />
                        <FormControl
                            fullWidth
                            error={!!errors.departmentId}
                        >

                            <InputLabel>
                                Department
                            </InputLabel>

                            <Select
                                label="Department"
                                defaultValue={0}
                                {...register("departmentId", {
                                    required: "Department is required",
                                    valueAsNumber: true
                                })}
                            >

                                <MenuItem value={0}>
                                    Select Department
                                </MenuItem>


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


                            <FormHelperText>
                                {errors.departmentId?.message}
                            </FormHelperText>


                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField label="Email" type="email" fullWidth
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email",
                                },
                            })} error={!!errors.email} helperText={errors.email?.message} />
                        <TextField label="Phone Number" fullWidth
                            {...register("phone", {
                                required: "Mobile number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit mobile number",
                                },
                            })} error={!!errors.phone} helperText={errors.phone?.message} />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <FormControl fullWidth error={!!errors.gender}>
                            <InputLabel>Gender</InputLabel>

                            <Select
                                label="Gender"
                                defaultValue=""
                                {...register("gender", {
                                    required: "Gender is required",
                                })}
                            >
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>

                            <FormHelperText>{errors.gender?.message}</FormHelperText>
                        </FormControl>

                        <TextField
                            label="Joining Date"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register("joinDate", {
                                required: "Joining date is required",
                            })}
                            error={!!errors.joinDate}
                            helperText={errors.joinDate?.message}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            label="Address"
                            fullWidth
                            multiline
                            rows={3}
                            {...register("address", {
                                required: "Address is required",
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />

                        <TextField label="Parent Phone Number" fullWidth
                            {...register("parentContact", {
                                required: "Parent Mobile number is required",
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit mobile number",
                                },
                            })} error={!!errors.parentContact} helperText={errors.parentContact?.message} />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Add Student
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ background: "red" }}
                            onClick={() => navigate("/student")}
                        >
                            Cancel
                        </Button>
                    </Box>

                </Stack>
            </Box>
        </Box>
    )
}

export default AddStudent