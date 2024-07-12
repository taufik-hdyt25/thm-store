import axios from "axios";
import "dotenv/config"

const apiURL= process.env.NEXT_PUBLIC_API_URL


export const API = axios.create({
  baseURL: apiURL
});