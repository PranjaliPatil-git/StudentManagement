import axios from "axios";


const API_URL = "http://localhost:8081/api/students";


export interface Department {
    departmentId:number;
    departmentName:string;
    departmentCode:string;
}

export interface Student {

    id: number;
    name: string;
    department: Department;
    email: string;
    phone: string;
    address: string;
    gender: string;
    joinDate: string;
    parentContact: string;

}

export type StudentRequest = {

    name: string;
    departmentId:number;
    email: string;
    phone: string;
    address: string;
    gender: string;
    joinDate: string;
    parentContact: string;

};



// GET ALL STUDENTS
export const getStudents = () => {

    return axios.get<Student[]>(API_URL);

};



// GET STUDENT BY ID
export const getStudentById = (id:number)=>{

    return axios.get<Student>(
        `${API_URL}/${id}`
    );

};



// ADD STUDENT
export const addStudent = (student:StudentRequest)=>{

    return axios.post<Student>(
        API_URL,
        student
    );

};



// UPDATE STUDENT
export const updateStudent = (
    id:number,
    student:StudentRequest
)=>{

    return axios.put<Student>(
        `${API_URL}/${id}`,
        student
    );

};



// DELETE STUDENT
export const deleteStudent = (id:number)=>{

    return axios.delete(
        `${API_URL}/${id}`
    );

};