import AxiosService from "./axiosService";

class companyServise {
  constructor() {
    if (!companyServise.instance) {
      companyServise.instance = this;
    }
    return companyServise.instance;
  }

  getCompanyList = async () => {
    const { data } = await AxiosService.get(`company/`);
    return data;
  };

  getCompanyDetail = async id => {
    const response = await AxiosService.get(`company/${id}/`);
    return response.data;
  };
}
const instance = new companyServise();

export default instance;
