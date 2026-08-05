import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFeeById, type StudentFee } from "../../services/feeApi";

const ViewFeeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [fee, setFee] = useState<StudentFee | null>(null);

    useEffect(() => {
        const loadFee = async () => {
            try {
                const response = await getFeeById(Number(id));
                setFee(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        loadFee();
    }, [id]);



    return (
        <Box sx={{ boxShadow: 3, p: 4 }}>
            <Typography sx={{ mb: 3, fontWeight: "bold" }}>
                View Student Fee Details
            </Typography>

            <Stack spacing={2}>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <TextField
                        label="Student Name"
                        fullWidth
                        value={fee?.studentName ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    <TextField
                        label="Department"
                        fullWidth
                        value={fee?.departmentName ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={fee?.email ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    <TextField
                        label="Phone"
                        fullWidth
                        value={fee?.phone ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <TextField
                        label="Total Fee"
                        fullWidth
                        value={fee?.totalFee ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    <TextField
                        label="Paid Amount"
                        fullWidth
                        value={fee?.paidAmount ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    <TextField
                        label="Remaining Fee"
                        fullWidth
                        value={fee?.remainingFee ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", gap: 3 }}>
                    <TextField
                        label="Payment Type"
                        fullWidth
                        value={fee?.paymentType ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />

                    <TextField
                        label="Paid Date"
                        fullWidth
                        value={fee?.paidDate ?? ""}
                        slotProps={{
                            input: {
                                readOnly: true,
                            },
                        }}
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={() => navigate("/fees")}
                >
                    Back
                </Button>
            </Stack>
        </Box>
    );
};

export default ViewFeeDetails;