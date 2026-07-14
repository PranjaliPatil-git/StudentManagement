import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


type StudentData = {
    name: string;
    department: string;
    email: string;
    phone: string;
    totalFee: number;
    paidAmount: number;
    paidDate: string;
    paymentType: string
}

const AddFeeDetails = () => {

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<StudentData>({
        defaultValues: {
            name: "",
            department: "",
            email: "",
            phone: "",
            totalFee: 0,
            paidAmount: 0,
            paidDate: "",
            paymentType: ""
        },
    });

    const totalFee = watch("totalFee") || 0;
    const paidAmount = watch("paidAmount") || 0;

    const remainingFee = Math.max(0, totalFee - paidAmount);

    const navigate = useNavigate();

    const onRegister = (data: StudentData) => {
        console.log(data);
        alert("Student Fee Added Successful")
        reset();
        navigate("/fees");
    }


    return (
        <Box component="form" onSubmit={handleSubmit(onRegister)} noValidate>
            <Box sx={{ boxShadow: 3, p: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>Add Student Fee</Typography>

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
                        <FormControl fullWidth error={!!errors.paymentType}>
                            <InputLabel>Payment Type</InputLabel>

                            <Select
                                label="Payment Type"
                                defaultValue=""
                                {...register("paymentType", {
                                    required: "Payment Type is required",
                                })}
                            >
                                <MenuItem value="Online">Online</MenuItem>
                                <MenuItem value="Cash">Cash</MenuItem>
                            </Select>

                            <FormHelperText>{errors.paymentType?.message}</FormHelperText>
                        </FormControl>

                        <TextField
                            label="Payment Paid Date"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register("paidDate", {
                                required: "Joining date is required",
                            })}
                            error={!!errors.paidDate}
                            helperText={errors.paidDate?.message}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField label="Total Fees" type="number" fullWidth
                            {...register("totalFee", {
                                required: "Total Fee is required",
                                valueAsNumber: true,
                            })} error={!!errors.totalFee} helperText={errors.totalFee?.message} />

                        <TextField
                            label="Remaining Fee"
                            fullWidth
                            value={remainingFee}
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        />

                        <TextField
                            label="Paid Amount"
                            type="number"
                            fullWidth
                            {...register("paidAmount", {
                                required: "Paid Amount is required",
                                valueAsNumber: true,
                                validate: (value) =>
                                    value <= totalFee || "Paid Amount cannot exceed Total Fee"
                            })}
                            error={!!errors.paidAmount}
                            helperText={errors.paidAmount?.message}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Add Fee
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ background: "red" }}
                            onClick={() => navigate("/fees")}
                        >
                            Cancel
                        </Button>
                    </Box>

                </Stack>
            </Box>
        </Box>
    )
}

export default AddFeeDetails