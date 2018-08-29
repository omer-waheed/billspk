import axios from "axios";

export default class LoginService {
  static api_url = "https://bills.computers.pk/api/v1";
  static login(creds) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(this.api_url + "/users/signin", {
      user: creds
    });
  }
  static signup(creds) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(this.api_url + "/users/signup", {
      user: creds
    });
  }
}
