import axios from "axios";

const API_URL = "http://localhost:8081/api/student-fees";

export interface StudentFee {

    id: number;

    studentId: number;

    studentName: string;

    departmentName: string;

    email: string;

    phone: string;

    totalFee: number;

    paidAmount: number;

    remainingFee: number;

    paymentType: string;

    paidDate: string;
}

export type StudentFeeRequest = {

    studentId: number;

    totalFee: number;

    paidAmount: number;

    paymentType: string;

    paidDate: string;

};


// GET ALL FEES
export const getFees = () => {

    return axios.get<StudentFee[]>(API_URL);

};


// GET FEE BY ID
export const getFeeById = (id: number) => {

    return axios.get<StudentFee>(
        `${API_URL}/${id}`
    );

};


// ADD FEE
export const addFee = (
    fee: StudentFeeRequest
) => {

    return axios.post<StudentFee>(
        API_URL,
        fee
    );

};


// UPDATE FEE
export const updateFee = (
    id: number,
    fee: StudentFeeRequest
) => {

    return axios.put<StudentFee>(
        `${API_URL}/${id}`,
        fee
    );

};


// DELETE FEE
export const deleteFee = (
    id: number
) => {

    return axios.delete(
        `${API_URL}/${id}`
    );

};