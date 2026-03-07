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
      // التعامل مع رسائل الخطأ من Identity أو الـ API
      let errorMessage = "حدث خطأ في السيرفر";
      
      if (error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          // التعامل مع أخطاء الـ Validation (ASP.NET)
          const errors = error.response.data.errors;
          if (Array.isArray(errors)) {
            errorMessage = errors.join(", ");
          } else if (typeof errors === 'object') {
            errorMessage = Object.values(errors).flat().join(", ");
          }
        } else if (error.response.data.title) {
          errorMessage = error.response.data.title;
        }
      }

      return {
        status: error.response.status,
        message: errorMessage,
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
