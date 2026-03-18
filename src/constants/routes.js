export const ROUTES_ADMIN = {
  AUTH: {
    LOGIN: "/admin/login",
    REGISTER: "/admin/register",
    FORGOT_PASSWORD: "/admin/forgot-password",
    RESET_PASSWORD: "/admin/reset-password",
    CONFIRM_EMAIL: "/admin/confirm-email",
  },

  DASHBOARD: "/admin",

  LESSONS: {
    LIST: "/admin/lessons",
    DETAILS: "/admin/lessons/:id",
  },

  QUESTIONS: {
    LIST: "/admin/questions",
    DETAILS: "/admin/lessons/:lessonId/questions/:questionId",
  },

  PROFILE: {
    INFO: "/admin/profile",
  },
  SETTINGS: {
    USER_SETTINGS: "/admin/user-settings",
  },
};

export const ROUTES_WEBSITE = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  ANALYTICS: "/analytics",
  SIMULATIONS: "/simulations",
  LESSONS: "/lessons",
  DASHBOARD: "/dashboard",
};
