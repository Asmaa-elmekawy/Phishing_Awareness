import axios from "axios";

const api = axios.create({
  baseURL: "https://amer003100-simulation-bot.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendChatMessage = async (messages) => {
  try {
    // جلب آخر رسالة من المستخدم
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const messageToSend = lastUserMessage?.content || "مرحبا";

    const response = await api.post("/simulate", {
      language: "Arabic",    
     difficulty: "Medium",    
      message: messageToSend 
    });

    // استخراج الرد من الـ API
    const botReply = response.data?.reply  || "آسف، لم أفهم هذا.";
    
    return { response: botReply };
    
  } catch (error) {
    console.error("Chat API Error Details:", error.response?.data || error.message);
    throw error;
  }
};