import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FacultyAttendanceTable from "../components/FacultyAttendanceTable";

const FacultyAttendance = () => {

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
          Faculty Attendance
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-faculty-attendance")}
        >
          + Add Faculty Attendance
        </Button>
      </Box>

      {/* Attendance Table */}

      <FacultyAttendanceTable />

    </Box>
  );
};

export default FacultyAttendance;