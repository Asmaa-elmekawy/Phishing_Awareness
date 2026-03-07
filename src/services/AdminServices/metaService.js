import axiosInstance from "./axiosConfig";

class MetaService {
  async getAllDifficultyLevels() {
    try {
      const response = await axiosInstance.get("/api/meta/difficulty-levels");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getAllQuestionsTypes() {
    try {
      const response = await axiosInstance.get("/api/meta/question-types");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

export default new MetaService();
