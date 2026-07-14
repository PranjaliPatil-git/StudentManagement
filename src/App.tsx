import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import DashboardLayout from "./layout/DashboardLayout";
import AddStudent from "./pages/Forms/AddStudent";
import AddFeeDetails from "./pages/Forms/AddFeeDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<Student />} />
          <Route path="/add-student" element={<AddStudent/>}/>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/add-student-fees" element={<AddFeeDetails />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;