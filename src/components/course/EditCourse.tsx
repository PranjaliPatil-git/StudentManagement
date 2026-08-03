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
    getCourseById,
    updateCourse,
    type CourseRequest,
} from "../../services/courseApi";

import { getDepartments } from "../../services/departmentApi";

type Department = {
    departmentId: number;
    departmentName: string;
};

const EditCourse = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const [departments, setDepartments] = useState<Department[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors },
    } = useForm<CourseRequest>({
        defaultValues: {
            departmentId: 0,
            courseName: "",
            courseCode: "",
            duration: 1,
            totalSemesters: 2,
            description: "",
            status: true,
        },
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const status = watch("status");

    useEffect(() => {
        loadDepartments();
        loadCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCourse = async () => {
        try {
            if (!id) return;

            const response = await getCourseById(Number(id));

            reset({
                departmentId: response.data.departmentId,
                courseName: response.data.courseName,
                courseCode: response.data.courseCode,
                duration: response.data.duration,
                totalSemesters: response.data.totalSemesters,
                description: response.data.description,
                status: response.data.status,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = async (data: CourseRequest) => {
        try {
            if (!id) return;

            await updateCourse(Number(id), data);

            alert("Course Updated Successfully");

            navigate("/course");
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
                    Edit Course
                </Typography>

                <Stack spacing={3}>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <FormControl fullWidth error={!!errors.departmentId}>
                            <InputLabel>Department</InputLabel>

                            <Controller
                                name="departmentId"
                                control={control}
                                rules={{
                                    required: "Department is required",
                                }}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Department"
                                    >
                                        {departments.map((department) => (
                                            <MenuItem
                                                key={department.departmentId}
                                                value={department.departmentId}
                                            >
                                                {department.departmentName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />

                            <FormHelperText>
                                {errors.departmentId?.message}
                            </FormHelperText>

                        </FormControl>

                        <TextField
                            label="Course Name"
                            fullWidth
                            {...register("courseName", {
                                required: "Course Name is required",
                            })}
                            error={!!errors.courseName}
                            helperText={errors.courseName?.message}
                        />

                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <TextField
                            label="Course Code"
                            fullWidth
                            {...register("courseCode", {
                                required: "Course Code is required",
                            })}
                            error={!!errors.courseCode}
                            helperText={errors.courseCode?.message}
                        />

                        <TextField
                            label="Duration"
                            type="number"
                            fullWidth
                            {...register("duration", {
                                valueAsNumber: true,
                            })}
                        />

                    </Box>

                    <Box sx={{ display: "flex", gap: 3 }}>

                        <TextField
                            label="Total Semesters"
                            type="number"
                            fullWidth
                            {...register("totalSemesters", {
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
                            onClick={() => navigate("/course")}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Update Course
                        </Button>

                    </Box>

                </Stack>

            </Box>

        </Box>
    );
};

export default EditCourse;