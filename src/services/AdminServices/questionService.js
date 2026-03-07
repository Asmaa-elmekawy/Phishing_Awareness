import axiosInstance from "./axiosConfig";

class QuestionService {
  // GET /api/admin/lessons/{lessonId}/questions
  async getQuestionsByLesson(lessonId) {
    try {
      const response = await axiosInstance.get(
        `/api/admin/lessons/${lessonId}/questions`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // GET /api/admin/lessons/{lessonId}/questions/{questionId}
  async getQuestionById(lessonId, questionId) {
    try {
      const response = await axiosInstance.get(
        `/api/admin/lessons/${lessonId}/questions/${questionId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST /api/admin/lessons/{lessonId}/questions
  async createQuestion(lessonId, questionData) {
    try {
      const response = await axiosInstance.post(
        `/api/admin/lessons/${lessonId}/questions`,
        questionData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // PUT /api/admin/lessons/{lessonId}/questions/{questionId}
  async updateQuestion(lessonId, questionId, questionData) {
    try {
      const response = await axiosInstance.put(
        `/api/admin/lessons/${lessonId}/questions/${questionId}`,
        questionData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // DELETE /api/admin/lessons/{lessonId}/questions/{questionId}
  async deleteQuestion(lessonId, questionId) {
    try {
      const response = await axiosInstance.delete(
        `/api/admin/lessons/${lessonId}/questions/${questionId}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || "حدث خطأ في السيرفر",
        data: error.response.data,
      };
    } else if (error.request) {
      return {
        status: 500,
        message: "لا يمكن الاتصال بالسيرفر",
      };
    } else {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}

export default new QuestionService();
