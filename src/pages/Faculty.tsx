import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FacultyTable from "../components/FacultyTable";

const Faculty = () => {

  const navigate = useNavigate();

  const [facultyType, setFacultyType] = useState<
    "Teaching" | "Non Teaching"
  >("Teaching");

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
          Faculty Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-faculty")}
        >
          + Add Faculty
        </Button>
      </Box>

      {/* Faculty Type Buttons */}

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button
          variant={
            facultyType === "Teaching"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setFacultyType("Teaching")
          }
        >
          Teaching Staff
        </Button>

        <Button
          variant={
            facultyType === "Non Teaching"
              ? "contained"
              : "outlined"
          }
          onClick={() =>
            setFacultyType("Non Teaching")
          }
        >
          Non-Teaching Staff
        </Button>
      </Stack>

      {/* Faculty Table */}

      <FacultyTable
        facultyType={facultyType}
      />

    </Box>
  );
};

export default Faculty;