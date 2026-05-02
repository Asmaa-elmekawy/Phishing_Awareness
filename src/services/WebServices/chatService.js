import axios from "axios";

const api = axios.create({
  baseURL: "https://amer003100-securitychatbot.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendChatMessage = async ({ user_id, message }) => {
  const res = await api.post("/webhook", {
    user_id,
    message,
  });

  return res.data;
};