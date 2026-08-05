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
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
    getFeeById,
    updateFee,
    type StudentFeeRequest,
} from "../../services/feeApi";

import {
    getStudents,
    type Student,
} from "../../services/studentApi";

type FormData = StudentFeeRequest;

const EditFeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [students, setStudents] = useState<Student[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            studentId: 0,
            totalFee: 0,
            paidAmount: 0,
            paymentType: "",
            paidDate: "",
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const totalFee = watch("totalFee") || 0;
    const paidAmount = watch("paidAmount") || 0;

    const remainingFee = Math.max(0, totalFee - paidAmount);

    useEffect(() => {
        const loadData = async () => {
            try {
                const studentsResponse = await getStudents();
                setStudents(studentsResponse.data);

                const feeResponse = await getFeeById(Number(id));

                setValue("studentId", feeResponse.data.studentId);
                setValue("totalFee", feeResponse.data.totalFee);
                setValue("paidAmount", feeResponse.data.paidAmount);
                setValue("paymentType", feeResponse.data.paymentType);
                setValue("paidDate", feeResponse.data.paidDate);
            } catch (error) {
                console.log(error);
            }
        };

        loadData();
    }, [id, setValue]);

    const onSubmit = async (data: FormData) => {
        try {
            await updateFee(Number(id), data);

            alert("Fee Updated Successfully");

            navigate("/fees");
        } catch (error) {
            console.log(error);
        }
        reset();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Box sx={{ boxShadow: 3, p: 4 }}>
                <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                    Edit Student Fee
                </Typography>

                <Stack spacing={2}>
                    <FormControl fullWidth error={!!errors.studentId}>
                        <InputLabel>Student</InputLabel>

                        <FormControl fullWidth error={!!errors.studentId}>
                            <InputLabel>Student</InputLabel>

                            <Controller
                                name="studentId"
                                control={control}
                                rules={{ required: "Student is required" }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Student"
                                        value={field.value ?? ""}
                                    >
                                        {students.map((student) => (
                                            <MenuItem key={student.id} value={student.id}>
                                                {student.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <FormHelperText>
                                {errors.studentId?.message}
                            </FormHelperText>
                        </FormControl>

                        <FormHelperText>
                            {errors.studentId?.message}
                        </FormHelperText>
                    </FormControl>

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
                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>
                        <FormControl fullWidth error={!!errors.paymentType}>
                            <InputLabel>Payment Type</InputLabel>

                            <FormControl fullWidth error={!!errors.paymentType}>
                                <InputLabel>Payment Type</InputLabel>

                                <Controller
                                    name="paymentType"
                                    control={control}
                                    rules={{ required: "Payment Type is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Payment Type"
                                            value={field.value ?? ""}
                                        >
                                            <MenuItem value="Cash">Cash</MenuItem>
                                            <MenuItem value="Online">Online</MenuItem>
                                        </Select>
                                    )}
                                />

                                <FormHelperText>
                                    {errors.paymentType?.message}
                                </FormHelperText>
                            </FormControl>

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
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            Update Fee
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

export default EditFeeDetails;