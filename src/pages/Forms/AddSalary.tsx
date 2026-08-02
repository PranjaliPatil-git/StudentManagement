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

type SalaryData = {
  employeeId: string;
  department: string;
  salaryMonth: string;
  salaryYear: number;

  basicSalary: number;
  hra: number;
  da: number;
  bonus: number;
  otherAllowance: number;

  pf: number;
  tax: number;
  otherDeduction: number;

  paymentMethod: string;
  paymentDate: string;
  status: string;
};

const employees = [
  "EMP001 - Amit Sharma",
  "EMP002 - Sneha Patil",
  "EMP003 - Rahul Patil",
  "EMP004 - Pooja Deshmukh",
];

const departments = [
  "Computer Science",
  "Information Technology",
  "Administration",
  "Library",
];

const AddSalary = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SalaryData>({
    defaultValues: {
      employeeId: "",
      department: "",
      salaryMonth: "",
      salaryYear: new Date().getFullYear(),

      basicSalary: 0,
      hra: 0,
      da: 0,
      bonus: 0,
      otherAllowance: 0,

      pf: 0,
      tax: 0,
      otherDeduction: 0,

      paymentMethod: "",
      paymentDate: "",
      status: "",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const basicSalary = watch("basicSalary") || 0;

  const hra = watch("hra") || 0;

  const da = watch("da") || 0;

  const bonus = watch("bonus") || 0;

  const otherAllowance = watch("otherAllowance") || 0;

  const pf = watch("pf") || 0;

  const tax = watch("tax") || 0;

  const otherDeduction = watch("otherDeduction") || 0;

  const netSalary =
    basicSalary +
    hra +
    da +
    bonus +
    otherAllowance -
    pf -
    tax -
    otherDeduction;

  const onSubmit = (data: SalaryData) => {
    console.log({
      ...data,
      netSalary,
    });

    alert("Salary Added Successfully");

    reset();

    navigate("/salary");
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
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Add Salary
        </Typography>

        <Stack spacing={3}>

          <Box sx={{ display: "flex", gap: 3 }}>

            <FormControl
              fullWidth
              error={!!errors.employeeId}
            >
              <InputLabel>
                Employee
              </InputLabel>

              <Select
                label="Employee"
                defaultValue=""
                {...register("employeeId", {
                  required: "Employee is required",
                })}
              >
                {employees.map((employee) => (
                  <MenuItem
                    key={employee}
                    value={employee}
                  >
                    {employee}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>
                {errors.employeeId?.message}
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

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Salary Month"
              fullWidth
              {...register("salaryMonth", {
                required: "Salary Month is required",
              })}
              error={!!errors.salaryMonth}
              helperText={errors.salaryMonth?.message}
            />

            <TextField
              label="Salary Year"
              type="number"
              fullWidth
              {...register("salaryYear", {
                valueAsNumber: true,
              })}
            />

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="Basic Salary"
              type="number"
              fullWidth
              {...register("basicSalary", {
                valueAsNumber: true,
              })}
            />

            <TextField
              label="HRA"
              type="number"
              fullWidth
              {...register("hra", {
                valueAsNumber: true,
              })}
            />

          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>

            <TextField
              label="DA"
              type="number"
              fullWidth
              {...register("da", {
                valueAsNumber: true,
              })}
            />

            <TextField
              label="Bonus"
              type="number"
              fullWidth
              {...register("bonus", {
                valueAsNumber: true,
              })}
            />

          </Box>          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Other Allowance"
              type="number"
              fullWidth
              {...register("otherAllowance", {
                valueAsNumber: true,
              })}
            />

            <TextField
              label="PF Deduction"
              type="number"
              fullWidth
              {...register("pf", {
                valueAsNumber: true,
              })}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <TextField
              label="Tax Deduction"
              type="number"
              fullWidth
              {...register("tax", {
                valueAsNumber: true,
              })}
            />

            <TextField
              label="Other Deduction"
              type="number"
              fullWidth
              {...register("otherDeduction", {
                valueAsNumber: true,
              })}
            />
          </Box>

          <TextField
            label="Net Salary"
            fullWidth
            value={netSalary}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <FormControl
              fullWidth
              error={!!errors.paymentMethod}
            >
              <InputLabel>
                Payment Method
              </InputLabel>

              <Select
                label="Payment Method"
                defaultValue=""
                {...register("paymentMethod", {
                  required: "Payment Method is required",
                })}
              >
                <MenuItem value="Cash">
                  Cash
                </MenuItem>

                <MenuItem value="Bank Transfer">
                  Bank Transfer
                </MenuItem>

                <MenuItem value="UPI">
                  UPI
                </MenuItem>

                <MenuItem value="Cheque">
                  Cheque
                </MenuItem>
              </Select>

              <FormHelperText>
                {errors.paymentMethod?.message}
              </FormHelperText>
            </FormControl>

            <TextField
              label="Payment Date"
              type="date"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register("paymentDate", {
                required: "Payment Date is required",
              })}
              error={!!errors.paymentDate}
              helperText={errors.paymentDate?.message}
            />
          </Box>

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
              <MenuItem value="Paid">
                Paid
              </MenuItem>

              <MenuItem value="Pending">
                Pending
              </MenuItem>
            </Select>

            <FormHelperText>
              {errors.status?.message}
            </FormHelperText>
          </FormControl>

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
              onClick={() => navigate("/salary")}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
            >
              Save Salary
            </Button>
          </Box>

        </Stack>
      </Box>
    </Box>
  );
};

export default AddSalary;