import axios from "axios";
import axiosInstance from "./axiosConfig";

const BASE_URL = "https://phish-escape.runasp.net";


let refreshTimer = null;
class AuthService {
  async login(email, password) {
    try {
      const response = await axiosInstance.post("/Auth", {
        email,
        password,
      });

      if (response.data.token) {
        this.setSession(response.data);
      }

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  setSession(authData) {
    localStorage.setItem("accessToken", authData.token);
    localStorage.setItem("refreshToken", authData.refreshToken);
    
    if (authData.expiresIn) {
      const expiresAt = Date.now() + authData.expiresIn * 1000;
      localStorage.setItem("tokenExpires", expiresAt.toString());
      this.startSilentRefresh(authData.expiresIn);
    }
  }

  startSilentRefresh(expiresInSeconds) {
    if (refreshTimer) clearTimeout(refreshTimer);

    // تجديد قبل النهاية بـ 5 دقائق (أو فوراً إذا كان الوقت المتبقي أقل من ذلك)
    const refreshThreshold = 300; // 5 minutes
    const delay = Math.max(0, (expiresInSeconds - refreshThreshold) * 1000);

    console.log(`🕒 Silent refresh scheduled in ${Math.round(delay / 60000)} minutes`);

    refreshTimer = setTimeout(async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token || !refreshToken) return;

        console.log("🔄 Starting silent refresh...");
        
        // استخدام axios مباشرة لتجنب التداخل مع interceptors
        const response = await axios.post(`${BASE_URL}/Auth/refreshToken`, {
          token,
          refreshToken,
        });

        console.log("✅ Silent refresh success");
        this.setSession(response.data);

      } catch (err) {
        console.error("❌ Silent refresh failed", err.response?.data || err.message);
        // لا نقوم بتسجيل الخروج هنا، نترك الـ interceptor يتعامل مع الـ 401 إذا حدث
      }
    }, delay);
  }

  initAuth() {
    const token = localStorage.getItem("accessToken");
    const expiresAt = localStorage.getItem("tokenExpires");

    if (token && expiresAt) {
      const remainingSeconds = Math.floor((parseInt(expiresAt) - Date.now()) / 1000);
      
      if (remainingSeconds > 60) { // لو فاضل أكتر من دقيقة، شغل الـ timer
        this.startSilentRefresh(remainingSeconds);
      } else if (remainingSeconds > -600) { // لو منتهي من فترة قصيرة، حاول تجدده فوراً
        this.startSilentRefresh(0);
      }
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

 async confirmEmailPost(userId, code) {
  try {
    const response = await axiosInstance.post("/Auth/confirm-email", {
      UserId: userId,
      Code: code,
    });
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
    localStorage.removeItem("tokenExpires");
    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }
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

  getUserId() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    
    const decoded = this.decodeToken(token);
    if (!decoded) return null;

    return decoded.id || 
           decoded.nameid || 
           decoded["http://schemas.microsoft.com/ws/2005/05/identity/claims/nameidentifier"] ||
           decoded.sub;
  }
}

export default new AuthService();
