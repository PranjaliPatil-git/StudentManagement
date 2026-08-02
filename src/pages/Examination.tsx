import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExaminationTable from "../components/ExaminationTable";

const Examination = () => {

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
          Examination Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-examination")}
        >
          + Add Examination
        </Button>
      </Box>

      <ExaminationTable />
    </Box>
  );
};

export default Examination;