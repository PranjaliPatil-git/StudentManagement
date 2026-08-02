import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FacultyAttendanceData = {
  facultyType: "Teaching" | "Non Teaching";
  facultyName: string;
  department: string;
  attendanceDate: string;
  checkIn: string;
  checkOut: string;
  status: string;
  remarks: string;
};

const teachingFaculty = [
  "Amit Sharma",
  "Sneha Patil",
  "Rohan Singh",
];

const nonTeachingFaculty = [
  "Rahul Patil",
  "Pooja Deshmukh",
  "Anita Joshi",
];

const departments = [
  "Computer Science",
  "Information Technology",
  "Administration",
  "Library",
];

const AddFacultyAttendance = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FacultyAttendanceData>({
    defaultValues: {
      facultyType: "Teaching",
      facultyName: "",
      department: "",
      attendanceDate: "",
      checkIn: "",
      checkOut: "",
      status: "",
      remarks: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const facultyType = watch("facultyType");

  const facultyList =
    facultyType === "Teaching"
      ? teachingFaculty
      : nonTeachingFaculty;

  const onSubmit = (data: FacultyAttendanceData) => {
    console.log(data);

    alert("Faculty Attendance Added Successfully");

    reset();

    navigate("/faculty-attendance");
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
          Add Faculty Attendance
        </Typography>

        <Stack spacing={3}>

          <Box>

            <Typography sx={{ mb: 1 }}>
              Faculty Type
            </Typography>

            <RadioGroup
              row
              defaultValue="Teaching"
              {...register("facultyType")}
            >
              <FormControlLabel
                value="Teaching"
                control={<Radio />}
                label="Teaching"
              />

              <FormControlLabel
                value="Non Teaching"
                control={<Radio />}
                label="Non Teaching"
              />

            </RadioGroup>

          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <FormControl
              fullWidth
              error={!!errors.facultyName}
            >
              <InputLabel>
                Faculty Name
              </InputLabel>

              <Select
                label="Faculty Name"
                defaultValue=""
                {...register("facultyName", {
                  required: "Faculty Name is required",
                })}
              >
                {facultyList.map((faculty) => (
                  <MenuItem
                    key={faculty}
                    value={faculty}
                  >
                    {faculty}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.facultyName?.message}
              </FormHelperText>

            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.department}
            >
              <InputLabel>
                Department
              </InputLabel>

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

          </Box>          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
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
                  required: "Status is required",
                })}
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Late">Late</MenuItem>
                <MenuItem value="Half Day">Half Day</MenuItem>
                <MenuItem value="Leave">Leave</MenuItem>
              </Select>

              <FormHelperText>
                {errors.status?.message}
              </FormHelperText>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Check In Time"
              type="time"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("checkIn", {
                required: "Check In Time is required",
              })}
              error={!!errors.checkIn}
              helperText={errors.checkIn?.message}
            />

            <TextField
              label="Check Out Time"
              type="time"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("checkOut", {
                required: "Check Out Time is required",
              })}
              error={!!errors.checkOut}
              helperText={errors.checkOut?.message}
            />
          </Box>

          <TextField
            label="Remarks"
            multiline
            rows={3}
            fullWidth
            placeholder="Enter Remarks"
            {...register("remarks")}
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
              onClick={() => navigate("/faculty-attendance")}
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

export default AddFacultyAttendance;