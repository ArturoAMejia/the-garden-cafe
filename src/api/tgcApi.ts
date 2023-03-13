import axios from "axios";

const tgcApi = axios.create({
  baseURL: '/'
})

export default tgcApi;