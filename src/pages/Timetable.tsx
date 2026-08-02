import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TimetableTable from "../components/TimetableTable";

const Timetable = () => {

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
        <Typography
          variant="h5"
          sx={{ fontWeight: 700 }}
        >
          Timetable Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-timetable")}
        >
          + Add Timetable
        </Button>
      </Box>

      <TimetableTable />
    </Box>
  );
};

export default Timetable;