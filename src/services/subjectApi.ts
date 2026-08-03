import axios from "axios";

const API_URL = "http://localhost:8081/api/subjects";

export interface SubjectRequest {
  courseId: number;
  subjectName: string;
  subjectCode: string;
  semester: number;
  credits: number;
  description: string;
  status: boolean;
}

export interface SubjectResponse {
  subjectId: number;
  courseId: number;
  courseName: string;
  subjectName: string;
  subjectCode: string;
  semester: number;
  credits: number;
  description: string;
  status: boolean;
}

export const getSubjects = () => {
  return axios.get<SubjectResponse[]>(API_URL);
};

export const getSubjectById = (id: number) => {
  return axios.get<SubjectResponse>(`${API_URL}/${id}`);
};

export const saveSubject = (data: SubjectRequest) => {
  return axios.post(API_URL, data);
};

export const updateSubject = (
  id: number,
  data: SubjectRequest
) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteSubject = (id: number) => {
  return axios.delete(`${API_URL}/${id}`);
};