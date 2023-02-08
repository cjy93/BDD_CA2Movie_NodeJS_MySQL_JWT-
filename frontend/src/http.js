import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:3000/",
  baseURL: "http://52.86.67.23:3000/",
  headers: {
    "Content-type": "application/json",
  }
});