import axiosInstance from "./axiosConfig";

class LessonService {
  async getAllLessons() {
    try {
      const response = await axiosInstance.get("/api/admin/lessons");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getLessonById(id) {
    try {
      const response = await axiosInstance.get(`/api/admin/lessons/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createLesson(lessonData) {
    try {
      const response = await axiosInstance.post(
        "/api/admin/lessons",
        lessonData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateLesson(id, lessonData) {
    try {
      const response = await axiosInstance.put(
        `/api/admin/lessons/${id}`,
        lessonData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteLesson(id) {
    try {
      const response = await axiosInstance.delete(`/api/admin/lessons/${id}`);
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

export default new LessonService();
