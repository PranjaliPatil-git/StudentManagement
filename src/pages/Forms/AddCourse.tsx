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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  addCourse,
  type CourseRequest,
} from "../../services/courseApi";

import {
  getDepartments,
} from "../../services/departmentApi";

type Department = {
  departmentId: number;
  departmentName: string;
};

const AddCourse = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState<Department[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
    const loadDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadDepartments();
  }, []);

  const onSubmit = async (data: CourseRequest) => {
    try {
      await addCourse(data);

      alert("Course Added Successfully");

      reset();

      navigate("/course");
    } catch (error) {
      console.error(error);
      alert("Failed to Add Course");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
          Add Course
        </Typography>

        <Stack spacing={3}>

          {/* Department + Course Name */}

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <FormControl
              fullWidth
              error={!!errors.departmentId}
            >
              <InputLabel>
                Department
              </InputLabel>

              <Select
                label="Department"
                defaultValue=""
                {...register("departmentId", {
                  required: "Department is required",
                  valueAsNumber: true,
                })}
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

          {/* Course Code + Duration */}

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
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
              label="Duration (Years)"
              type="number"
              fullWidth
              {...register("duration", {
                required: "Duration is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Minimum duration is 1",
                },
              })}
              error={!!errors.duration}
              helperText={errors.duration?.message}
            />
          </Box>

          {/* Total Semesters + Status */}

          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "center",
            }}
          >
            <TextField
              label="Total Semesters"
              type="number"
              fullWidth
              {...register("totalSemesters", {
                required: "Total Semesters is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Minimum semester is 1",
                },
              })}
              error={!!errors.totalSemesters}
              helperText={errors.totalSemesters?.message}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={(e) =>
                    setValue(
                      "status",
                      e.target.checked
                    )
                  }
                />
              }
              label={status ? "Active" : "Inactive"}
            />
          </Box>

          {/* Description */}

          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* Buttons */}

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => navigate("/course")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Course
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddCourse;