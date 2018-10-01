import axios from "axios";
import { api_url } from "../config";
export default class LoginService {
  static login(creds) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(api_url + "/users/signin", {
      user: creds
    });
  }
  static signup(creds) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    return axios.post(api_url + "/users/signup", {
      user: creds
    });
  }
}
