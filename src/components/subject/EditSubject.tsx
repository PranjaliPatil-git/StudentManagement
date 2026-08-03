import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
    getSubjectById,
    updateSubject,
    type SubjectRequest,
} from "../../services/subjectApi";

import {
    getCourses,
    type CourseData,
} from "../../services/courseApi";

const EditSubject = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [courses, setCourses] = useState<CourseData[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm<SubjectRequest>({
        defaultValues: {
            courseId: 0,
            subjectName: "",
            subjectCode: "",
            semester: 1,
            credits: 4,
            description: "",
            status: true,
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const status = watch("status");

    useEffect(() => {
        void loadCourses();
        void loadSubject();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadCourses = async () => {
        try {
            const response = await getCourses();
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadSubject = async () => {
        try {
            if (!id) return;

            const response = await getSubjectById(Number(id));

            reset({
                courseId: response.data.courseId,
                subjectName: response.data.subjectName,
                subjectCode: response.data.subjectCode,
                semester: response.data.semester,
                credits: response.data.credits,
                description: response.data.description,
                status: response.data.status,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: SubjectRequest) => {
        try {
            if (!id) return;

            await updateSubject(Number(id), data);

            alert("Subject Updated Successfully");

            navigate("/subjects");
        } catch (error) {
            console.error(error);
            alert("Update Failed");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        fontWeight: 700,
                        mb: 3,
                    }}
                >
                    Edit Subject
                </Typography>

                <Stack spacing={3}>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <FormControl fullWidth error={!!errors.courseId}>
                            <InputLabel>Course</InputLabel>

                            <FormControl fullWidth error={!!errors.courseId}>
                                <InputLabel>Course</InputLabel>

                                <Controller
                                    name="courseId"
                                    control={control}
                                    rules={{
                                        required: "Course is required",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Course"
                                        >
                                            {courses.map((course) => (
                                                <MenuItem
                                                    key={course.courseId}
                                                    value={course.courseId}
                                                >
                                                    {course.courseName}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />

                                <FormHelperText>
                                    {errors.courseId?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormHelperText>
                                {errors.courseId?.message}
                            </FormHelperText>

                        </FormControl>

                        <TextField
                            label="Subject Name"
                            fullWidth
                            {...register("subjectName", {
                                required: "Subject Name is required",
                            })}
                            error={!!errors.subjectName}
                            helperText={errors.subjectName?.message}
                        />

                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <TextField
                            label="Subject Code"
                            fullWidth
                            {...register("subjectCode", {
                                required: "Subject Code is required",
                            })}
                            error={!!errors.subjectCode}
                            helperText={errors.subjectCode?.message}
                        />

                        <FormControl fullWidth error={!!errors.semester}>
                            <InputLabel>Semester</InputLabel>

                            <FormControl fullWidth error={!!errors.semester}>
                                <InputLabel>Semester</InputLabel>

                                <Controller
                                    name="semester"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            label="Semester"
                                        >
                                            <MenuItem value={1}>Semester 1</MenuItem>
                                            <MenuItem value={2}>Semester 2</MenuItem>
                                            <MenuItem value={3}>Semester 3</MenuItem>
                                            <MenuItem value={4}>Semester 4</MenuItem>
                                            <MenuItem value={5}>Semester 5</MenuItem>
                                            <MenuItem value={6}>Semester 6</MenuItem>
                                            <MenuItem value={7}>Semester 7</MenuItem>
                                            <MenuItem value={8}>Semester 8</MenuItem>
                                        </Select>
                                    )}
                                />

                                <FormHelperText>
                                    {errors.semester?.message}
                                </FormHelperText>
                            </FormControl>

                            <FormHelperText>
                                {errors.semester?.message}
                            </FormHelperText>

                        </FormControl>

                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <TextField
                            label="Credits"
                            type="number"
                            fullWidth
                            {...register("credits", {
                                valueAsNumber: true,
                            })}
                        />

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={status}
                                    onChange={(e) =>
                                        setValue("status", e.target.checked)
                                    }
                                />
                            }
                            label={status ? "Active" : "Inactive"}
                        />

                    </Box>

                    <TextField
                        label="Description"
                        multiline
                        rows={4}
                        fullWidth
                        {...register("description")}
                    />

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/subjects")}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Update Subject
                        </Button>

                    </Box>

                </Stack>

            </Box>
        </Box>
    );
};

export default EditSubject;