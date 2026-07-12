import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type RegisterData = {
  name: string;
  department: string;
  email: string;
  mobile: string;
  gender: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RegisterData>({
    defaultValues: {
      name: "",
      department: "",
      email: "",
      mobile: "",
      gender: "",
      address: "",
      password: "",
      confirmPassword: ""
    },
  });

  const navigate = useNavigate();
  // const password = watch("password");

  const onRegister = (data: RegisterData) => {
    console.log(data);
    alert("Registration Successful")
    reset();
    navigate("/");
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onRegister)} noValidate>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: 400,
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: "white",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Register
          </Typography>

          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField label="Name" fullWidth
                {...register("name", {
                  required: "Name is required",
                })} error={!!errors.name} helperText={errors.name?.message} />
              <TextField label="Department" fullWidth
                {...register("department", {
                  required: "Department is required",
                })} error={!!errors.department} helperText={errors.department?.message} />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField label="Email" type="email" fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })} error={!!errors.email} helperText={errors.email?.message} />
              <TextField label="Phone Number" fullWidth
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter a valid 10-digit mobile number",
                  },
                })} error={!!errors.mobile} helperText={errors.mobile?.message} />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField label="Gender" fullWidth 
               {...register("gender", {
                  required: "Gender is required",
                })} error={!!errors.gender} helperText={errors.gender?.message} />
              <TextField label="Address" fullWidth
               {...register("address", {
                  required: "Address is required",
                })} error={!!errors.address} helperText={errors.address?.message}  />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField label="Password" type='password' fullWidth
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password must be only 15 characters"
                  }
                })} error={!!errors.password} helperText={errors.password?.message} />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Register
            </Button>
            <Link
              component="button"
              onClick={() => navigate("/")}
            >
              Login
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Register