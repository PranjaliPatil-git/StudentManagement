import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addDepartment,
  type DepartmentRequest
} from "../../services/departmentApi";


const AddDepartment = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DepartmentRequest>({
    defaultValues: {
      departmentName: "",
      departmentCode: "",
      hodName: "",
      description: "",
      status: true,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const status = watch("status");

  const onSubmit = async(data:DepartmentRequest)=>{

    try{

        await addDepartment(data);

        alert(
          "Department Added Successfully"
        );

        reset();

        navigate("/department");


    }catch(error){

        console.log(error);

        alert(
          "Something went wrong"
        );
    }

};

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Box sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}>

        <Typography
          variant="h6"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          Add Department
        </Typography>

        <Stack spacing={3}>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Department Name"
              fullWidth
              {...register("departmentName", {
                required: "Department Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              error={!!errors.departmentName}
              helperText={errors.departmentName?.message}
            />

            <TextField
              label="Department Code"
              fullWidth
              {...register("departmentCode", {
                required: "Department Code is required",
              })}
              error={!!errors.departmentCode}
              helperText={errors.departmentCode?.message}
            />

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="HOD Name"
              fullWidth
              {...register("hodName", {
                required: "HOD Name is required",
              })}
              error={!!errors.hodName}
              helperText={errors.hodName?.message}
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
              onClick={() => navigate("/departments")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Department
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddDepartment;