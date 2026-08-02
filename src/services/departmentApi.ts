import axios from "axios";

export type DepartmentData = {
  departmentId: number;

  departmentName: string;

  departmentCode: string;

  hodName: string;

  description: string;

  status: boolean;
};

export type DepartmentRequest = {
  departmentName: string;

  departmentCode: string;

  hodName: string;

  description: string;

  status: boolean;
};

const API_URL = "http://localhost:8081/api/departments";

export const getDepartments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addDepartment = async (data: DepartmentRequest) => {
  const response = await axios.post(API_URL, data);

  return response.data;
};

export const deleteDepartment = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
