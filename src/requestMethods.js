import axios from "axios";

const BASE_URL = "http://localhost:5000";

let TOKEN = "";

if (JSON.parse(localStorage.getItem("persist:root"))) {
  if (JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser) {
    TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
  }
} else {
  TOKEN = "";
}

console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
