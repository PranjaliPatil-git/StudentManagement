import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import Student from "./pages/Student";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import DashboardLayout from "./layout/DashboardLayout";
import AddStudent from "./pages/Forms/AddStudent";
import AddFeeDetails from "./pages/Forms/AddFeeDetails";
import Department from "./pages/Department";
import AddDepartment from "./pages/Forms/AddDepartment";
import Subject from "./pages/Subject";
import AddSubject from "./pages/Forms/AddSubject";
import AddAttendance from "./pages/Forms/AddAttendance";
import AddFaculty from "./pages/Forms/AddFaculty";
import Faculty from "./pages/Faculty";
import FacultyAttendance from "./pages/FacultyAttendance";
import AddFacultyAttendance from "./pages/Forms/AddFacultyAttendance";
import Salary from "./pages/Salary";
import AddSalary from "./pages/Forms/AddSalary";
import Timetable from "./pages/Timetable";
import AddTimetable from "./pages/Forms/AddTimetable";
import Examination from "./pages/Examination";
import AddExamination from "./pages/Forms/AddExamination";
import AddResult from "./pages/Forms/AddResult";
import Result from "./pages/Result";
import StudentView from "./components/student/StudentView";
import EditStudent from "./components/student/EditStudent"
import Course from "./pages/Course";
import AddCourse from "./pages/Forms/AddCourse";
import EditCourse from "./components/course/EditCourse";
import ViewCourse from "./components/course/ViewCourse";
import EditSubject from "./components/subject/EditSubject";
import ViewSubject from "./components/subject/ViewCourse";
import ViewFeeDetails from "./components/feeDetail/ViewFeeDetails";
import EditFeeDetails from "./components/feeDetail/EditFeeDetails";

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
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/student-view/:id" element={<StudentView />} />
          <Route path="/student-edit/:id" element={<EditStudent />} />

          <Route path="/course" element={<Course />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/view-course/:id" element={<ViewCourse />} />
          <Route path="/edit-course/:id" element={<EditCourse />} />

          <Route path="/attendance" element={<Attendance />} />
          <Route path="/add-attendance" element={<AddAttendance />} />

          <Route path="/faculty" element={<Faculty />} />
          <Route path="/add-faculty" element={<AddFaculty />} />

          <Route path="/fees" element={<Fees />} />
          <Route path="/add-student-fees" element={<AddFeeDetails />} />
          <Route path="/view-fee/:id" element={<ViewFeeDetails />}/>
          <Route path="/edit-fee/:id" element={<EditFeeDetails />}/>

          <Route path="/department" element={<Department />} />
          <Route path="/add-department" element={<AddDepartment />} />

          <Route path="/subjects" element={<Subject />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/view-subject/:id" element={<ViewSubject />} />
          <Route path="/edit-subject/:id" element={<EditSubject />} />

          <Route path="/faculty-attendance" element={<FacultyAttendance />} />
          <Route path="/add-faculty-attendance" element={<AddFacultyAttendance />} />

          <Route path="/salary" element={<Salary />} />
          <Route path="/add-salary" element={<AddSalary />} />

          <Route path="/timetable" element={<Timetable />} />
          <Route path="/add-timetable" element={<AddTimetable />} />

          <Route path="/examination" element={<Examination />} />
          <Route path="/add-examination" element={<AddExamination />} />

          <Route path="/result" element={<Result />} />
          <Route path="/add-result" element={<AddResult />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
};

export default App;