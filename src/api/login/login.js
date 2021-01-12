import http from "../http";
export default {
  userlogin(params) {
    return http.get("/api/login", params);
  },
  userLoginOut(params) {
    return http.get("/api/user/login", params);
  },
};
