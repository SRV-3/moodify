import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-9uoh.onrender.com/api/",
  withCredentials: true,
});

export async function getSong({ mood }) {
  const response = await api.get("/song?mood=" + mood);
  return response;
}
