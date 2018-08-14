import axios from "axios";
import { AsyncStorage } from "react-native";

export default class UserService {
  static api_url = "http://bills.computers.pk/api/v1";
  static async aboutMe(Token) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(this.api_url + "/users/me");
  }
  static async subscriberList(Token) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(this.api_url + "/subscriber");
  }
  static async payBill(Token, Id) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "Bearer " + Token;
    return axios.post(this.api_url + "/subscriber/" + Id);
  }
}
