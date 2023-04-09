import axios from "axios";

export const api = axios.create({
  baseURL: "https://kadpad-api.onrender.com"
});
