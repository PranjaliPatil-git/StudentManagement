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

type SubjectData = {
  departmentId: number;
  subjectName: string;
  subjectCode: string;
  semester: number;
  credits: number;
  description: string;
  status: boolean;
};

const departments = [
  {
    id: 1,
    departmentName: "Computer Science",
  },
  {
    id: 2,
    departmentName: "Information Technology",
  },
  {
    id: 3,
    departmentName: "Mechanical Engineering",
  },
  {
    id: 4,
    departmentName: "Civil Engineering",
  },
];

const AddSubject = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubjectData>({
    defaultValues: {
      departmentId: 0,
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

  const onSubmit = (data: SubjectData) => {
    console.log(data);

    alert("Subject Added Successfully");

    reset();

    navigate("/subjects");
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
          Add Subject
        </Typography>

        <Stack spacing={3}>

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
                  required:
                    "Department is required",
                  valueAsNumber: true,
                })}
              >
                {departments.map((department) => (
                  <MenuItem
                    key={department.id}
                    value={department.id}
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
              label="Subject Name"
              fullWidth
              {...register("subjectName", {
                required:
                  "Subject Name is required",
              })}
              error={!!errors.subjectName}
              helperText={
                errors.subjectName?.message
              }
            />

          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >

            <TextField
              label="Subject Code"
              fullWidth
              {...register("subjectCode", {
                required:
                  "Subject Code is required",
              })}
              error={!!errors.subjectCode}
              helperText={
                errors.subjectCode?.message
              }
            />

            <FormControl
              fullWidth
              error={!!errors.semester}
            >
              <InputLabel>
                Semester
              </InputLabel>

              <Select
                label="Semester"
                defaultValue={1}
                {...register("semester", {
                  valueAsNumber: true,
                })}
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

              <FormHelperText>
                {errors.semester?.message}
              </FormHelperText>

            </FormControl>

          </Box>          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Credits"
              type="number"
              fullWidth
              {...register("credits", {
                required: "Credits are required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Minimum credit is 1",
                },
                max: {
                  value: 10,
                  message: "Maximum credit is 10",
                },
              })}
              error={!!errors.credits}
              helperText={errors.credits?.message}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={(event) =>
                    setValue("status", event.target.checked)
                  }
                />
              }
              label={status ? "Active" : "Inactive"}
              sx={{ mt: 1 }}
            />
          </Box>

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 2,
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
              onClick={() => navigate("/subjects")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Subject
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddSubject;