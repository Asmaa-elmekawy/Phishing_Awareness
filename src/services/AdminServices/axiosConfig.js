import axios from "axios";

const BASE_URL = "https://phish-escape.runasp.net";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//  interceptor للتعامل مع التوكن
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor للتعامل مع انتهاء صلاحية التوكن

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isAuthRequest = originalRequest.url.includes('/Auth');

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;
      console.log(" 401 Detected, attempting to refresh token...");

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const expiredToken = localStorage.getItem("accessToken");

        if (!refreshToken || !expiredToken) {
          console.warn(" Missing tokens for refresh:", { hasAccess: !!expiredToken, hasRefresh: !!refreshToken });
          throw error;
        }

        console.log(" Sending refresh request with:", { 
          token: expiredToken?.substring(0, 20) + "...", 
          refreshToken: refreshToken?.substring(0, 10) + "..." 
        });

        const response = await axios.post(`${BASE_URL}/Auth/refreshToken`, {
          token: expiredToken,
          refreshToken: refreshToken
        });

        if (response.data.token) {
          console.log("✅ Token refreshed successfully.");
          const newToken = response.data.token;
          localStorage.setItem("accessToken", newToken);
          
          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // تحديث الهيدر وإعادة الطلب الأصلي
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error(" Refresh process failed:", refreshError.response?.data || refreshError.message);
        
        // مسح البيانات وتوجيه المستخدم
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        if (!window.location.pathname.includes('/login')) {
          console.log(" Redirecting to login...");
          window.location.href = window.location.pathname.startsWith('/admin') 
            ? "/admin/login" 
            : "/login";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
