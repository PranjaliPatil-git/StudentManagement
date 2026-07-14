import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"
import StudentFeeTable from "../components/StudentFeeTable";


const Fees = () => {

  const navigate = useNavigate();
  return (
    <Box sx={{ boxShadow: 3, p: 4 }}>
      <Box sx={{ display: "flex" ,mb: 2, gap: 95 }}>
        <Typography sx={{ mb: 2, fontWeight: "bold" }}>Student Fee Details</Typography>
        <Button type="submit"
          variant="contained" onClick={() => navigate("/add-student-fees")}>+ Add Student Fee</Button>
      </Box>
      <StudentFeeTable />
    </Box>
  )
}

export default Fees