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

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type ResultData = {
  rollNo: string;
  studentName: string;
  department: string;
  semester: string;
  subject: string;
  marks: number;
  grade: string;
  result: string;
};

const departments = [
  "Computer Science",
  "Information Technology",
  "Mechanical",
  "Civil",
];

const semesters = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
];

const subjects = [
  "Java",
  "Spring Boot",
  "React",
  "DBMS",
  "Operating System",
];

const AddResult = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ResultData>({
    defaultValues: {
      rollNo: "",
      studentName: "",
      department: "",
      semester: "",
      subject: "",
      marks: 0,
      grade: "",
      result: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const marks = watch("marks");

  const calculateGrade = (marks: number) => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  const calculateResult = (marks: number) => {
    return marks >= 40 ? "Pass" : "Fail";
  };

  const onSubmit = (data: ResultData) => {
    data.grade = calculateGrade(data.marks);
    data.result = calculateResult(data.marks);

    console.log(data);

    alert("Result Added Successfully");

    reset();

    navigate("/result");
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
          Add Student Result
        </Typography>

        <Stack spacing={3}>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Roll Number"
              fullWidth
              {...register("rollNo", {
                required: "Roll Number is required",
              })}
              error={!!errors.rollNo}
              helperText={errors.rollNo?.message}
            />

            <TextField
              label="Student Name"
              fullWidth
              {...register("studentName", {
                required: "Student Name is required",
              })}
              error={!!errors.studentName}
              helperText={errors.studentName?.message}
            />

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl fullWidth error={!!errors.department}>
              <InputLabel>Department</InputLabel>

              <Select
                label="Department"
                defaultValue=""
                {...register("department", {
                  required: "Department is required",
                })}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department}
                    value={department}
                  >
                    {department}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.department?.message}
              </FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.semester}>
              <InputLabel>Semester</InputLabel>

              <Select
                label="Semester"
                defaultValue=""
                {...register("semester", {
                  required: "Semester is required",
                })}
              >
                {semesters.map((semester) => (
                  <MenuItem
                    key={semester}
                    value={semester}
                  >
                    {semester}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.semester?.message}
              </FormHelperText>
            </FormControl>

          </Box>

          <FormControl fullWidth error={!!errors.subject}>
            <InputLabel>Subject</InputLabel>

            <Select
              label="Subject"
              defaultValue=""
              {...register("subject", {
                required: "Subject is required",
              })}
            >
              {subjects.map((subject) => (
                <MenuItem
                  key={subject}
                  value={subject}
                >
                  {subject}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {errors.subject?.message}
            </FormHelperText>
          </FormControl>          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Marks"
              type="number"
              fullWidth
              {...register("marks", {
                required: "Marks are required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Marks cannot be less than 0",
                },
                max: {
                  value: 100,
                  message: "Marks cannot exceed 100",
                },
                onChange: (e) => {
                  const value = Number(e.target.value);

                  setValue("grade", calculateGrade(value));
                  setValue("result", calculateResult(value));
                },
              })}
              error={!!errors.marks}
              helperText={errors.marks?.message}
            />

            <TextField
              label="Grade"
              fullWidth
              value={calculateGrade(marks || 0)}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

            <TextField
              label="Result"
              fullWidth
              value={calculateResult(marks || 0)}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

          </Box>

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
              onClick={() => navigate("/result")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Result
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddResult;