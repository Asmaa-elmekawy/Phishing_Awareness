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

  async register(userData) {
    try {
      const response = await axiosInstance.post("/Auth/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

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

  // فك تشفير التوكن للحصول على البيانات للتاكد من role admin or not
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  getUserRole() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    return decoded.role || 
           decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
           (Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles);
  }
}

export default new AuthService();
