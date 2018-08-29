import axios from "axios";
import { AsyncStorage } from "react-native";

export default class UserService {
  static api_url = "https://bills.computers.pk/api/v1";
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
  static async transactionList(Token) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(this.api_url + "/users/transections");
  }
  static async merchantList(Token) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(this.api_url + "/merchants");
  }
  static async payBill(Token, Id) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "Bearer " + Token;
    return axios.post(this.api_url + "/subscriber/" + Id);
  }
  static async saveSubscriber(Token, creds) {
    // console.log("Bearer " + Token);
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "Bearer " + Token;
    return axios.post(this.api_url + "/subscriber", { subscriber: creds });
  }
}
