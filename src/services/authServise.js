import AxiosService from "./axiosService";

class AuthService {
  constructor() {
    if (!AuthService.instance) {
      AuthService.instance = this;
    }
    return AuthService.instance;
  }

  login = async data => {
    const response = await AxiosService.post(`token`, data);
    return response.data;
  };
  logout = async data => {
    const response = await AxiosService.post(`logout`, data);
    return response;
  };
  register = async data => {
    const response = await AxiosService.post(`register`, data);
    return response;
  };
}
const instance = new AuthService();

export default instance;
