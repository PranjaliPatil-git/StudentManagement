import axios from "axios";

const API_URL = "http://localhost:8081/api/courses";

export interface CourseData {
  courseId: number;

  departmentId: number;

  departmentName: string;

  courseName: string;

  courseCode: string;

  duration: number;

  totalSemesters: number;

  description: string;

  status: boolean;
}

export type CourseRequest = {
  departmentId: number;

  courseName: string;

  courseCode: string;

  duration: number;

  totalSemesters: number;

  description: string;

  status: boolean;
};

// GET ALL COURSES
export const getCourses = () => {
  return axios.get<CourseData[]>(API_URL);
};

// GET COURSE BY ID
export const getCourseById = (id: number) => {
  return axios.get<CourseData>(`${API_URL}/${id}`);
};

// GET COURSES BY DEPARTMENT
export const getCoursesByDepartment = (departmentId: number) => {
  return axios.get<CourseData[]>(
    `${API_URL}/department/${departmentId}`
  );
};

// ADD COURSE
export const addCourse = (course: CourseRequest) => {
  return axios.post<CourseData>(API_URL, course);
};

// UPDATE COURSE
export const updateCourse = (
  id: number,
  course: CourseRequest
) => {
  return axios.put<CourseData>(
    `${API_URL}/${id}`,
    course
  );
};

// DELETE COURSE
export const deleteCourse = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};