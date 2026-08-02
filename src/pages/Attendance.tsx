import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AttendanceTable from "../components/AttendanceTable";

const Attendance = () => {

  const navigate = useNavigate();

  return (
    <Box
      sx={{
        boxShadow: 3,
        p: 4,
        borderRadius: 2,
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography sx={{ mb: 2, fontWeight: "bold" }}>
          Attendance Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-attendance")}
        >
          + Add Attendance
        </Button>
      </Box>

      {/* Attendance Table */}

      <AttendanceTable />
    </Box>
  );
};

export default Attendance;