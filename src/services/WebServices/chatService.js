import axiosInstance from "../AdminServices/axiosConfig";

export const sendChatMessage = async ({ userId, message, conversationId = null }) => {
  const res = await axiosInstance.post("/api/chat/send", {
    userId,
    message,
    conversationId
  });

  return res.data;
};