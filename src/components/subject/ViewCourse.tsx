import {
    Box,
    Button,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getSubjectById,
    type SubjectResponse,
} from "../../services/subjectApi";
import React from "react";

const ViewSubject = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [subject, setSubject] =
        useState<SubjectResponse>();

    const loadSubject = React.useCallback(async () => {
    try {
        if (!id) return;

        const response = await getSubjectById(Number(id));

        setSubject(response.data);

    } catch (error) {
        console.error(error);
    }
}, [id]);

    useEffect(() => {

        void loadSubject();

    }, [loadSubject]);

    return (

        <Box
            sx={{
                boxShadow: 3,
                p: 4,
                borderRadius: 2,
            }}
        >

            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    mb: 3,
                }}
            >
                View Subject
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Course
                    </Typography>

                    <Typography>
                        {subject?.courseName}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Subject Name
                    </Typography>

                    <Typography>
                        {subject?.subjectName}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Subject Code
                    </Typography>

                    <Typography>
                        {subject?.subjectCode}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Semester
                    </Typography>

                    <Typography>
                        {subject?.semester}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Credits
                    </Typography>

                    <Typography>
                        {subject?.credits}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                   <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Description
                    </Typography>

                    <Typography>
                        {subject?.description}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                   <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Status
                    </Typography>

                    <Typography>
                        {subject?.status
                            ? "Active"
                            : "Inactive"}
                    </Typography>
                </Grid>

            </Grid>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: 4,
                }}
            >
                <Button
                    variant="contained"
                    onClick={() =>
                        navigate("/subjects")
                    }
                >
                    Back
                </Button>
            </Box>

        </Box>

    );

};

export default ViewSubject;