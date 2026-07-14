import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


type StudentData = {
    name: string;
    department: string;
    email: string;
    phone: string;
    address: string;
    gender: string;
    joinDate: string;
    parentContact: string
}

const AddStudent = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<StudentData>({
        defaultValues: {
            name: "",
            department: "",
            email: "",
            phone: "",
            address: "",
            gender: "",
            joinDate: "",
            parentContact: ""
        },
    });

    const navigate = useNavigate();
    // const password = watch("password");

    const onRegister = (data: StudentData) => {
        console.log(data);
        alert("Student Added Successful")
        reset();
        navigate("/studnet");
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onRegister)} noValidate>
            <Box sx={{ boxShadow: 3, p: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>Add Student Form</Typography>

                    <Stack spacing={2}>
                        <Box sx={{ display: "flex", gap: 3 }}>
                            <TextField label="Name" fullWidth
                                {...register("name", {
                                    required: "Name is required",
                                })} error={!!errors.name} helperText={errors.name?.message} />
                            <TextField label="Department" fullWidth
                                {...register("department", {
                                    required: "Department is required",
                                })} error={!!errors.department} helperText={errors.department?.message} />
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