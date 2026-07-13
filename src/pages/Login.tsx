import { Box, TextField, Typography, Button, Stack, Link } from '@mui/material'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type LoginData = {
  name: string;
  email: string;
  password: string;
};
const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onLogin = (data: LoginData) => {
    console.log(data);
    alert("Login Successful");
     localStorage.setItem("userName", data.name);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onLogin)} noValidate>
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
            Login
          </Typography>

          <Stack spacing={2}>
            <TextField label="Name" fullWidth
              {...register("name", {
                required: "Name is required",
              })} error={!!errors.name} helperText={errors.name?.message} />
            <TextField label="Email" type="email" fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              })} error={!!errors.email} helperText={errors.email?.message} />
            <TextField label="Password" type='password' fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value:15,
                  message: "Password must be only 15 characters"
                }
              })} error={!!errors.password} helperText={errors.password?.message} />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={() => navigate("/dashboard")}
            >
              Login
            </Button>
            <Link
              component="button"
              onClick={() => navigate("/register")}
            >
              Register
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default Login