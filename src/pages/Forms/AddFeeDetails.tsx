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
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getStudents } from "../../services/studentApi";
import { addFee } from "../../services/feeApi";

type Student = {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: {
        departmentId: number;
        departmentName: string;
        departmentCode: string;
    };
};

type StudentFeeData = {
    studentId: number;
    totalFee: number;
    paidAmount: number;
    paidDate: string;
    paymentType: string;
};

const AddFeeDetails = () => {
    const navigate = useNavigate();

    const [students, setStudents] = useState<Student[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<StudentFeeData>({
        defaultValues: {
            studentId: 0,
            totalFee: 0,
            paidAmount: 0,
            paidDate: "",
            paymentType: "",
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const totalFee = watch("totalFee") || 0;
    const paidAmount = watch("paidAmount") || 0;

    const remainingFee = Math.max(0, totalFee - paidAmount);

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            const response = await getStudents();
           setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (data: StudentFeeData) => {
        try {
            await addFee(data);

            alert("Student Fee Added Successfully");

            reset();

            navigate("/fees");
        } catch (error) {
            console.log(error);
            alert("Failed to add fee");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ boxShadow: 3, p: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                    Add Student Fee
                </Typography>

                <Stack spacing={2}>
                    <FormControl fullWidth error={!!errors.studentId}>
                        <InputLabel>Student</InputLabel>

                        <Select
                            label="Student"
                            defaultValue=""
                            {...register("studentId", {
                                required: "Student is required",
                                valueAsNumber: true,
                            })}
                        >
                            {students.map((student) => (
                                <MenuItem key={student.id} value={student.id}>
                                    {student.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <FormHelperText>
                            {errors.studentId?.message}
                        </FormHelperText>
                    </FormControl>

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
                                <MenuItem value="Cash">Cash</MenuItem>
                                <MenuItem value="Online">Online</MenuItem>
                            </Select>

                            <FormHelperText>
                                {errors.paymentType?.message}
                            </FormHelperText>
                        </FormControl>

                        <TextField
                            label="Paid Date"
                            type="date"
                            fullWidth
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            {...register("paidDate", {
                                required: "Paid Date is required",
                            })}
                            error={!!errors.paidDate}
                            helperText={errors.paidDate?.message}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <TextField
                            label="Total Fee"
                            type="number"
                            fullWidth
                            {...register("totalFee", {
                                required: "Total Fee is required",
                                valueAsNumber: true,
                            })}
                            error={!!errors.totalFee}
                            helperText={errors.totalFee?.message}
                        />

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
                                    value <= totalFee ||
                                    "Paid Amount cannot exceed Total Fee",
                            })}
                            error={!!errors.paidAmount}
                            helperText={errors.paidAmount?.message}
                        />
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <Button type="submit" variant="contained" fullWidth>
                            Add Fee
                        </Button>

                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            onClick={() => navigate("/fees")}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default AddFeeDetails;