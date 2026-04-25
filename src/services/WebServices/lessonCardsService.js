import axiosInstance from "../AdminServices/axiosConfig";

class LessonCardsService {
  async getUserLessonCards() {
    try {
      const response = await axiosInstance.get("/api/lessons/cards");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getActiveLessons() {
    try {
      const response = await axiosInstance.get("/api/lessons/active");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || 'حدث خطأ في السيرفر',
        data: error.response.data
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

export default new LessonCardsService();