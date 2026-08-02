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
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type FacultyData = {
  employeeId: string;
  facultyName: string;
  facultyType: "Teaching" | "Non Teaching";
  department: string;
  subject: string;
  designation: string;
  email: string;
  phone: string;
  gender: string;
  qualification: string;
  experience: number;
  joiningDate: string;
  address: string;
  status: boolean;
};

const departments = [
  "Computer Science",
  "Information Technology",
  "Mechanical",
  "Civil",
];

const subjects = [
  "Java",
  "Spring Boot",
  "React",
  "DBMS",
];

const AddFaculty = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FacultyData>({
    defaultValues: {
      employeeId: "",
      facultyName: "",
      facultyType: "Teaching",
      department: "",
      subject: "",
      designation: "",
      email: "",
      phone: "",
      gender: "",
      qualification: "",
      experience: 0,
      joiningDate: "",
      address: "",
      status: true,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const facultyType = watch("facultyType");

  const status = watch("status");

  const onSubmit = (data: FacultyData) => {
    console.log(data);

    alert("Faculty Added Successfully");

    reset();

    navigate("/faculty");
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
          Add Faculty
        </Typography>

        <Stack spacing={3}>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >

            <TextField
              label="Employee ID"
              fullWidth
              {...register("employeeId", {
                required: "Employee ID is required",
              })}
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
            />

            <TextField
              label="Faculty Name"
              fullWidth
              {...register("facultyName", {
                required: "Faculty Name is required",
              })}
              error={!!errors.facultyName}
              helperText={errors.facultyName?.message}
            />

          </Box>

          <Box>

            <Typography
              sx={{ mb: 1 }}
            >
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

            <TextField
              label="Designation"
              fullWidth
              {...register("designation", {
                required: "Designation is required",
              })}
              error={!!errors.designation}
              helperText={errors.designation?.message}
            />

          </Box>

          {facultyType === "Teaching" && (

            <FormControl
              fullWidth
              error={!!errors.subject}
            >
              <InputLabel>
                Subject
              </InputLabel>

              <Select
                label="Subject"
                defaultValue=""
                {...register("subject")}
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

          )}          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Mobile Number"
              fullWidth
              {...register("phone", {
                required: "Mobile Number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <FormControl
              fullWidth
              error={!!errors.gender}
            >
              <InputLabel>Gender</InputLabel>

              <Select
                label="Gender"
                defaultValue=""
                {...register("gender", {
                  required: "Gender is required",
                })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>

              <FormHelperText>
                {errors.gender?.message}
              </FormHelperText>
            </FormControl>

            <TextField
              label="Qualification"
              fullWidth
              {...register("qualification", {
                required: "Qualification is required",
              })}
              error={!!errors.qualification}
              helperText={errors.qualification?.message}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Experience (Years)"
              type="number"
              fullWidth
              {...register("experience", {
                required: "Experience is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Experience cannot be negative",
                },
              })}
              error={!!errors.experience}
              helperText={errors.experience?.message}
            />

            <TextField
              label="Joining Date"
              type="date"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("joiningDate", {
                required: "Joining Date is required",
              })}
              error={!!errors.joiningDate}
              helperText={errors.joiningDate?.message}
            />
          </Box>

          <TextField
            label="Address"
            multiline
            rows={3}
            fullWidth
            {...register("address", {
              required: "Address is required",
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ mr: 2 }}>
              Status
            </Typography>

            <Switch
              checked={status}
              onChange={(e) =>
                setValue("status", e.target.checked)
              }
            />

            <Typography>
              {status ? "Active" : "Inactive"}
            </Typography>
          </Box>

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
              onClick={() => navigate("/faculty")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Faculty
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddFaculty;