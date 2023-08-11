// IMPORTANT!!
// Because this React app is running in the same workspace as the API,

// there is no need to set a separate baseURL until you reach deployment.

// Setting a baseURL before you reach deployment will cause errors

// import axios from "axios";

// axios.defaults.baseURL =
//   "https://drp-api-the-last-book-page-4bcf6d1799b5.herokuapp.com/";
// axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
// axios.defaults.withCredentials = true;

import axios from "axios";

export const axiosReq = axios.create();
export const axiosRes = axios.create();
