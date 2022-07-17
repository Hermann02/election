import axios from 'axios'
import data from "@coreui/coreui/js/src/dom/data";

export default class DataService {
  constructor() {
    this.client = axios.create({
      baseURL: "http://localhost:3001/api",
      headers: {
        "content-type": "application/json"
      },
    });
  }

  post = (url, data, config) => {
    return this.client.post(url, data, config);
  };

  get = (url, config) => {
    return this.client.get(url, config);
  };

  upload = (url, data) => {
    return axios.post("http://localhost:3001/api" + url, data);
  }
}
