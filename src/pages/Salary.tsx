import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SalaryTable from "../components/SalaryTable";

const Salary = () => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: "bold" }}>
          Salary Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-salary")}
        >
          + Add Salary
        </Button>
      </Box>

      <SalaryTable />
    </Box>
  );
};

export default Salary;