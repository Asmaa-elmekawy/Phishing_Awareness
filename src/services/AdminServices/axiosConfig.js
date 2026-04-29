import axios from "axios";

const BASE_URL = "https://phish-escape.runasp.net";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// إضافة interceptor للتعامل مع التوكن
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

    // التحقق من أن الخطأ هو 401 (Unauthorized) وأن الطلب لم تتم إعادة محاولته بالفعل
    // نتحقق أيضاً أن الطلب ليس طلب تسجيل دخول أو تجديد توكن لتجنب الحلقات المفرغة
    const isAuthRequest = originalRequest.url.includes('/Auth');
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw error;
        }

        // استخدام axios مباشر لتجنب الـ interceptors في طلب التجديد
        const response = await axios.post(`${BASE_URL}/Auth/refreshToken`, {
          refreshToken,
        });

        if (response.data.token) {
          const newToken = response.data.token;
          localStorage.setItem("accessToken", newToken);
          
          // تحديث الـ Refresh Token إذا جاء واحد جديد
          if (response.data.refreshToken) {
            localStorage.setItem("refreshToken", response.data.refreshToken);
          }

          // تحديث الهيدر في الطلب الأصلي وإعادة تنفيذه
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // إذا فشل تجديد التوكن، نقوم بتسجيل الخروج
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        
        // التوجيه لصفحة تسجيل الدخول حسب المسار الحالي
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = "/admin/login";
        } else {
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
