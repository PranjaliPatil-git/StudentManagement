import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import CourseTable from "../components/course/CourseTable";

const Course = () => {
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
          sx={{
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          Course Management
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() =>
            navigate("/add-course")
          }
        >
          + Add Course
        </Button>
      </Box>

      <CourseTable />
    </Box>
  );
};

export default Course;