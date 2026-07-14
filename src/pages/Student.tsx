import { Box, Button, Typography } from "@mui/material"
import StudentTable from "../components/StudentTable"
import { useNavigate } from "react-router-dom"

const Student = () => {

  const navigate= useNavigate();

  return (
    <Box sx={{ boxShadow: 3, p: 4 }}>
      <Box sx={{ display: "flex" ,mb: 2, gap: 100 }}>
        <Typography sx={{ mb: 2, fontWeight: "bold" }}>Student Details</Typography>
        <Button type="submit"
          variant="contained" onClick={() => navigate("/add-student")}>+ Add Student</Button>
      </Box>
      <StudentTable />
    </Box>
  )
}

export default Student