import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResultTable from "../components/ResultTable";

const Result = () => {

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
          Student Results
        </Typography>

        <Button
          variant="contained"
          sx={{ ml: "auto" }}
          onClick={() => navigate("/add-result")}
        >
          + Add Result
        </Button>
      </Box>

      <ResultTable />
    </Box>
  );
};

export default Result;