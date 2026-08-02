import { Box, Typography } from "@mui/material";
import StudentTable from "../components/StudentTable";

const Dashboard = () => {

   const userName = localStorage.getItem("userName");
  return (
    <Box sx={{boxShadow: 3, p: 4}}>
    <Typography sx={{fontWeight: "bold", display: "flex", justifyContent: "center"}}>WelCome {userName}!</Typography>

    <Box sx={{display: "flex", mt: 2, gap: 5, justifyContent: "center"}}>
      <Box sx={{boxShadow: 3, py: 4, px: 15}}>
        Total Student
        <Typography sx={{fontWeight: "bold"}}>1000</Typography>
      </Box>

       <Box sx={{boxShadow: 3, py: 4, px: 15}}>
        Total Department
        <Typography sx={{fontWeight: "bold"}}>1000</Typography>
      </Box>

      <Box sx={{boxShadow: 3, py: 4, px: 15}}>
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