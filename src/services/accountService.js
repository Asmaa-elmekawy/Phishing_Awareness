import axiosInstance from "./axiosConfig";

class AccountService {
  async getCurrentUser() {
    try {
      const response = await axiosInstance.get("/me");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateUserInfo(userData) {
    try {
      const response = await axiosInstance.put("/me/info", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await axiosInstance.put(
        "/me/change-password",
        passwordData,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async uploadProfileImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append("Image", imageFile);

      const response = await axiosInstance.put(
        "/me/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
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

export default new AccountService();
