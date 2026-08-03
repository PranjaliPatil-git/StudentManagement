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
    getCourseById,
    type CourseData,
} from "../../services/courseApi";

const ViewCourse = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [course, setCourse] =
        useState<CourseData>();

    const loadCourse = async () => {
        try {
            if (!id) return;

            const response = await getCourseById(
                Number(id)
            );

            setCourse(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                View Course
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Department
                    </Typography>

                    <Typography>
                        {course?.departmentName}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Course Name
                    </Typography>

                    <Typography>
                        {course?.courseName}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Course Code
                    </Typography>

                    <Typography>
                        {course?.courseCode}
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Duration
                    </Typography>

                    <Typography>
                        {course?.duration} Year(s)
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                        }}
                    >
                        Total Semesters
                    </Typography>

                    <Typography>
                        {course?.totalSemesters}
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
                        {course?.description}
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
                        {course?.status
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
                        navigate("/course")
                    }
                >
                    Back
                </Button>
            </Box>
        </Box>
    );
};

export default ViewCourse;