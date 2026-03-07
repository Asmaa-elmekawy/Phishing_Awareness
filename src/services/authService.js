import axiosInstance from "./axiosConfig";

class AuthService {
  async login(email, password) {
    try {
      const response = await axiosInstance.post("/Auth", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 2. POST /Auth/refreshToken
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosInstance.post("/Auth/refreshToken", {
        refreshToken,
      });

      if (response.data.token) {
        localStorage.setItem("accessToken", response.data.token);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 3.  POST /Auth/revoke-refreshToken
  async revokeRefreshToken() {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const response = await axiosInstance.post("/Auth/revoke-refreshToken", {
        refreshToken,
      });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 4. POST /Auth/register
  async register(userData) {
    try {
      const response = await axiosInstance.post("/Auth/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 5. POST /Auth/confirm-email
  async confirmEmailPost(token) {
    try {
      const response = await axiosInstance.post("/Auth/confirm-email", {
        token,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 6.  GET /Auth/confirm-email
  async confirmEmailGet(token) {
    try {
      const response = await axiosInstance.get(
        `/Auth/confirm-email?token=${token}`,
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 7.  POST /Auth/resend-confirmation-email
  async resendConfirmationEmail(email) {
    try {
      const response = await axiosInstance.post(
        "/Auth/resend-confirmation-email",
        {
          email,
        },
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 8. POST /Auth/forget-password
  async forgetPassword(email) {
    try {
      const response = await axiosInstance.post("/Auth/forget-password", {
        email,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // POST /Auth/reset-password
  async resetPassword(token, newPassword) {
    try {
      const response = await axiosInstance.post("/Auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  //  للتعامل مع الأخطاء
  handleError(error) {
    if (error.response) {
      let errorMessage = "حدث خطأ في السيرفر";

      if (error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
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

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default new AuthService();
