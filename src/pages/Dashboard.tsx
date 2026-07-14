import { Box, Typography } from "@mui/material";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {

   const userName = localStorage.getItem("userName");
  return (
    <Box sx={{boxShadow: 3, p: 4}}>
    <Typography sx={{fontWeight: "bold"}}>WelCome {userName}!</Typography>

    <Box sx={{display: "flex", mt: 2, gap: 4}}>
      <Box sx={{boxShadow: 3, p: 4}}>
        Total Student
        <Typography sx={{fontWeight: "bold"}}>1000</Typography>
      </Box>

       <Box sx={{boxShadow: 3, p: 4}}>
        Total Department
        <Typography sx={{fontWeight: "bold"}}>1000</Typography>
      </Box>

      <Box sx={{boxShadow: 3, p: 4}}>
       Total Teachers
       <Typography sx={{fontWeight: "bold"}}>1000</Typography>
      </Box>
    </Box>

    <Box sx={{mt: 4}}>
      <Typography sx={{mb: 2, fontWeight: "bold"}}>Student Details</Typography>
      <StudentTable/>
    </Box>
    </Box>
  );
};

export default Dashboard;