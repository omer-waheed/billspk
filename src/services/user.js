import axios from "axios";
import { AsyncStorage } from "react-native";
import { api_url } from "../config";

export default class UserService {
  static api_url = "https://bills.computers.pk/api/v1";
  static async aboutMe(Token) {
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(api_url + "/users/me");
  }
  static async subscriberList(Token) {
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(api_url + "/subscriber");
  }
  static async transactionList(Token) {
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(api_url + "/users/transections");
  }
  static async merchantList(Token) {
    axios.defaults.headers.get["Content-Type"] = "application/json";
    axios.defaults.headers.get["Authorization"] = "Bearer " + Token;
    return axios.get(api_url + "/merchants");
  }
  static async payBill(Token, Id) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "Bearer " + Token;
    return axios.post(api_url + "/subscriber/" + Id);
  }
  static async saveSubscriber(Token, creds) {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Authorization"] = "Bearer " + Token;
    return axios.post(api_url + "/subscriber", { subscriber: creds });
  }
}
