import axiosInstance from "./axiosConfig";

class UserService {
  async getAllUsers() {
    try {
      const response = await axiosInstance.get("/api/admin/users");
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async makeAdmin(userId) {
    try {
      const response = await axiosInstance.put(`/api/admin/users/${userId}/make-admin`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async removeAdmin(userId) {
    try {
      const response = await axiosInstance.put(`/api/admin/users/${userId}/remove-admin`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        status: error.response.status,
        message: error.response.data?.message || 'حدث خطأ في السيرفر',
        data: error.response.data
      };
    } else if (error.request) {
      return {
        status: 500,
        message: 'لا يمكن الاتصال بالسيرفر'
      };
    } else {
      return {
        status: 500,
        message: error.message
      };
    }
  }
}

export default new UserService();