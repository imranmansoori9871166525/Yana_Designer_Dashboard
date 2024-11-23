import { EmployeeData } from "../types/global";
import { Imran, Nasim, Yasmin } from "./iconsPath";

export const employeeDetails: EmployeeData[] = [
  {
    name: "Imran",
    role: "Developer",
    email: import.meta.env.VITE_EMPLOYEE_1_EMAIL,
    id: import.meta.env.VITE_EMPLOYEE_1_ID_EMAIL,
    mobile_No: "+91 9311064234",
    img: Imran,
    firm: "Yana Designer Dashboard",
  },
  {
    name: "Yasmin Praveen",
    role: "Admin",
    email: import.meta.env.VITE_EMPLOYEE_2_EMAIL,
    id: import.meta.env.VITE_EMPLOYEE_2_ID_EMAIL,
    mobile_No: "+91 7011195177",
    img: Yasmin,
    firm: "Yana Designer Dashboard",
  },
  {
    name: "Nasim Ansari",
    role: "Owner",
    email: import.meta.env.VITE_EMPLOYEE_3_EMAIL,
    id: import.meta.env.VITE_EMPLOYEE_3_ID_EMAIL,
    mobile_No: "+91 9911540536",
    img: Nasim,
    firm: "Yana Designer Dashboard",
  },
];
