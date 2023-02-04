import axios from "axios";
// import { accessToken } from './Assignment_CA2_P7337992/Login'

export default axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "http://52.86.67.23:3000/",
  headers: {
    "Content-type": "application/json",
    // "Authorization": `Bearer ${accessToken}`
  }
});