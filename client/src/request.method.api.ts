import axios from "axios";
export const authClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api`,
  withCredentials: true,
});
