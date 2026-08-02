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

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type TimetableData = {
  department: string;
  semester: string;
  academicYear: string;
  day: string;
  subject: string;
  faculty: string;
  classroom: string;
  startTime: string;
  endTime: string;
  status: boolean;
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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const subjects = [
  "Java",
  "Spring Boot",
  "React",
  "DBMS",
  "Operating System",
];

const faculties = [
  "Amit Sharma",
  "Sneha Patil",
  "Rahul Patil",
  "Pooja Deshmukh",
];

const classrooms = [
  "Room 101",
  "Room 102",
  "Room 201",
  "Lab 1",
  "Lab 2",
];

const AddTimetable = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TimetableData>({
    defaultValues: {
      department: "",
      semester: "",
      academicYear: "",
      day: "",
      subject: "",
      faculty: "",
      classroom: "",
      startTime: "",
      endTime: "",
      status: true,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const status = watch("status");

  const onSubmit = (data: TimetableData) => {
    console.log(data);

    alert("Timetable Added Successfully");

    reset();

    navigate("/timetable");
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
          Add Timetable
        </Typography>

        <Stack spacing={3}>

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

            <TextField
              label="Academic Year"
              fullWidth
              placeholder="2026-2027"
              {...register("academicYear", {
                required: "Academic Year is required",
              })}
              error={!!errors.academicYear}
              helperText={errors.academicYear?.message}
            />

            <FormControl
              fullWidth
              error={!!errors.day}
            >
              <InputLabel>Day</InputLabel>

              <Select
                label="Day"
                defaultValue=""
                {...register("day", {
                  required: "Day is required",
                })}
              >
                {days.map((day) => (
                  <MenuItem
                    key={day}
                    value={day}
                  >
                    {day}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.day?.message}
              </FormHelperText>
            </FormControl>

          </Box>          <Box sx={{ display: "flex", gap: 3 }}>

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

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl
              fullWidth
              error={!!errors.classroom}
            >
              <InputLabel>Classroom</InputLabel>

              <Select
                label="Classroom"
                defaultValue=""
                {...register("classroom", {
                  required: "Classroom is required",
                })}
              >
                {classrooms.map((room) => (
                  <MenuItem
                    key={room}
                    value={room}
                  >
                    {room}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.classroom?.message}
              </FormHelperText>
            </FormControl>

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
              onClick={() => navigate("/timetable")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Timetable
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddTimetable;