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

type ExaminationData = {
  examName: string;
  department: string;
  semester: string;
  subject: string;
  examType: string;
  examDate: string;
  startTime: string;
  endTime: string;
  totalMarks: number;
  passingMarks: number;
  examHall: string;
  status: string;
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

const AddExamination = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExaminationData>({
    defaultValues: {
      examName: "",
      department: "",
      semester: "",
      subject: "",
      examType: "",
      examDate: "",
      startTime: "",
      endTime: "",
      totalMarks: 100,
      passingMarks: 40,
      examHall: "",
      status: "",
    },
  });

  const onSubmit = (data: ExaminationData) => {
    console.log(data);

    alert("Examination Added Successfully");

    reset();

    navigate("/examination");
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
          Add Examination
        </Typography>

        <Stack spacing={3}>

          <TextField
            label="Exam Name"
            fullWidth
            {...register("examName", {
              required: "Exam Name is required",
            })}
            error={!!errors.examName}
            helperText={errors.examName?.message}
          />

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl
              fullWidth
              error={!!errors.department}
            >
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

            <FormControl
              fullWidth
              error={!!errors.semester}
            >
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

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl
              fullWidth
              error={!!errors.subject}
            >
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
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.examType}
            >
              <InputLabel>Exam Type</InputLabel>

              <Select
                label="Exam Type"
                defaultValue=""
                {...register("examType", {
                  required: "Exam Type is required",
                })}
              >
                <MenuItem value="Internal">Internal</MenuItem>
                <MenuItem value="Practical">Practical</MenuItem>
                <MenuItem value="Semester">Semester</MenuItem>
                <MenuItem value="Viva">Viva</MenuItem>
              </Select>

              <FormHelperText>
                {errors.examType?.message}
              </FormHelperText>
            </FormControl>

          </Box>          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="Exam Date"
              type="date"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("examDate", {
                required: "Exam Date is required",
              })}
              error={!!errors.examDate}
              helperText={errors.examDate?.message}
            />

            <TextField
              label="Start Time"
              type="time"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("startTime", {
                required: "Start Time is required",
              })}
              error={!!errors.startTime}
              helperText={errors.startTime?.message}
            />

            <TextField
              label="End Time"
              type="time"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("endTime", {
                required: "End Time is required",
              })}
              error={!!errors.endTime}
              helperText={errors.endTime?.message}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="Total Marks"
              type="number"
              fullWidth
              {...register("totalMarks", {
                required: "Total Marks is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Total Marks must be greater than 0",
                },
              })}
              error={!!errors.totalMarks}
              helperText={errors.totalMarks?.message}
            />

            <TextField
              label="Passing Marks"
              type="number"
              fullWidth
              {...register("passingMarks", {
                required: "Passing Marks is required",
                valueAsNumber: true,
                validate: (value, formValues) =>
                  value <= formValues.totalMarks ||
                  "Passing Marks cannot exceed Total Marks",
              })}
              error={!!errors.passingMarks}
              helperText={errors.passingMarks?.message}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <TextField
              label="Exam Hall / Classroom"
              fullWidth
              {...register("examHall", {
                required: "Exam Hall is required",
              })}
              error={!!errors.examHall}
              helperText={errors.examHall?.message}
            />

            <FormControl
              fullWidth
              error={!!errors.status}
            >
              <InputLabel>Status</InputLabel>

              <Select
                label="Status"
                defaultValue=""
                {...register("status", {
                  required: "Status is required",
                })}
              >
                <MenuItem value="Scheduled">
                  Scheduled
                </MenuItem>

                <MenuItem value="Completed">
                  Completed
                </MenuItem>

                <MenuItem value="Cancelled">
                  Cancelled
                </MenuItem>
              </Select>

              <FormHelperText>
                {errors.status?.message}
              </FormHelperText>
            </FormControl>
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
              onClick={() => navigate("/examination")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Examination
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddExamination;