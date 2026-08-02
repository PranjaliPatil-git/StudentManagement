import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import SubjectTable from "../components/SubjectTable";

const Subject = () => {

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

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
          }}
        >
          Subject Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-subject")}
        >
          + Add Subject
        </Button>

      </Box>

      {/* Subject Table */}

      <SubjectTable />

    </Box>
  );
};

export default Subject;