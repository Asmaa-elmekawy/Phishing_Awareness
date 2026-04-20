// services/lessonQuestionsService.js

import axiosInstance from "../AdminServices/axiosConfig";

class LessonQuestionsService {
  // GET /api/lessons/{lessonId}/questions - جلب كل أسئلة الدرس
  async getLessonQuestions(lessonId) {
    try {
      const response = await axiosInstance.get(`/api/lessons/${lessonId}/questions`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // GET /api/lessons/{lessonId}/next-question - جلب السؤال التالي
  async getNextQuestion(lessonId) {
    try {
      const response = await axiosInstance.get(`/api/lessons/${lessonId}/next-question`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST /api/lessons/{lessonId}/answer - إرسال إجابة
  async submitAnswer(lessonId, answerData) {
    try {
      const response = await axiosInstance.post(`/api/lessons/${lessonId}/answer`, answerData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // GET /api/lessons/{lessonId}/result - جلب نتيجة الدرس
  async getLessonResult(lessonId) {
    try {
      const response = await axiosInstance.get(`/api/lessons/${lessonId}/result`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      const data = error.response.data;
      let message = data?.message || 'حدث خطأ في السيرفر';
      
      // If there are specific errors from the backend, use the last one (usually descriptive)
      if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
        message = data.errors[data.errors.length - 1];
      }
      
      return {
        status: error.response.status,
        message: message,
        data: data
      };
    } else if (error.request) {
      return {
        status: 500,
        message: 'لا يمكن الاتصال بالسيرفر'
      };
    } else {
      return {
        status: 500,
        message: error.message
      };
    }
  }
}

export default new LessonQuestionsService();