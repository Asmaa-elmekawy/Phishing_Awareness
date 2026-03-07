export const ROUTES_ADMIN = {
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    CONFIRM_EMAIL: "/confirm-email",
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
