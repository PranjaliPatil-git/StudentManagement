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

type AttendanceData = {
  student: string;
  department: string;
  subject: string;
  faculty: string;
  attendanceDate: string;
  status: string;
  remarks: string;
};

const students = [
  "Pranjali Patil",
  "Rahul Patil",
  "Sneha Kulkarni",
  "Aman Singh",
];

const departments = [
  "Computer Science",
  "Information Technology",
  "Mechanical",
  "Civil",
];

const subjects = [
  "Java",
  "Spring Boot",
  "React JS",
  "DBMS",
];

const faculties = [
  "Mr. Sharma",
  "Mrs. Joshi",
  "Mr. Patil",
];

const attendanceStatus = [
  "Present",
  "Absent",
  "Late",
  "Half Day",
];

const AddAttendance = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AttendanceData>({
    defaultValues: {
      student: "",
      department: "",
      subject: "",
      faculty: "",
      attendanceDate: "",
      status: "",
      remarks: "",
    },
  });

  const onSubmit = (data: AttendanceData) => {
    console.log(data);

    alert("Attendance Added Successfully");

    reset();

    navigate("/attendance");
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
          Add Attendance
        </Typography>

        <Stack spacing={3}>

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl
              fullWidth
              error={!!errors.student}
            >
              <InputLabel>Student</InputLabel>

              <Select
                label="Student"
                defaultValue=""
                {...register("student", {
                  required: "Student is required",
                })}
              >
                {students.map((student) => (
                  <MenuItem
                    key={student}
                    value={student}
                  >
                    {student}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.student?.message}
              </FormHelperText>

            </FormControl>

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
              error={!!errors.faculty}
            >
              <InputLabel>Faculty</InputLabel>

              <Select
                label="Faculty"
                defaultValue=""
                {...register("faculty", {
                  required: "Faculty is required",
                })}
              >
                {faculties.map((faculty) => (
                  <MenuItem
                    key={faculty}
                    value={faculty}
                  >
                    {faculty}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.faculty?.message}
              </FormHelperText>

            </FormControl>

          </Box>          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Attendance Date"
              type="date"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("attendanceDate", {
                required: "Attendance Date is required",
              })}
              error={!!errors.attendanceDate}
              helperText={errors.attendanceDate?.message}
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
                  required: "Attendance Status is required",
                })}
              >
                {attendanceStatus.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.status?.message}
              </FormHelperText>

            </FormControl>

          </Box>

          <TextField
            label="Remarks"
            multiline
            rows={4}
            fullWidth
            placeholder="Enter Remarks..."
            {...register("remarks")}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "flex-end",
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
              onClick={() => navigate("/attendance")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Attendance
            </Button>

          </Box>

        </Stack>

      </Box>

    </Box>
  );
};

export default AddAttendance;