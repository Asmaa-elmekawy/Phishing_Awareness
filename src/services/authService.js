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

  // 2. تحديث التوكن - POST /Auth/refreshToken
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

  // 3. إلغاء التوكن - POST /Auth/revoke-refreshToken
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

  // 4. تسجيل مستخدم جديد - POST /Auth/register
  async register(userData) {
    try {
      const response = await axiosInstance.post("/Auth/register", userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // 5. تأكيد الإيميل (POST) - POST /Auth/confirm-email
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

  // 6. تأكيد الإيميل (GET) - GET /Auth/confirm-email
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

  // 7. إعادة إرسال تأكيد الإيميل - POST /Auth/resend-confirmation-email
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

  // 8. نسيت كلمة المرور - POST /Auth/forget-password
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

  // 9. إعادة تعيين كلمة المرور - POST /Auth/reset-password
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

  // دالة للتعامل مع الأخطاء
  handleError(error) {
    if (error.response) {
      // خطأ من السيرفر
      return {
        status: error.response.status,
        message: error.response.data.message || "حدث خطأ في السيرفر",
        data: error.response.data,
      };
    } else if (error.request) {
      // لا استجابة من السيرفر
      return {
        status: 500,
        message: "لا يمكن الاتصال بالسيرفر",
      };
    } else {
      // خطأ في الإعدادات
      return {
        status: 500,
        message: error.message,
      };
    }
  }

  // دالة تسجيل الخروج
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}

export default new AuthService();
