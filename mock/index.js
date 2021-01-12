import Logindata from "./login/index";
let Mock = require("mockjs");

// import Managerdata from "./manager/index";

// mock config配置
const registe = {
  // 登录接口数据
  "/api/login": Logindata,
  // mang
};

//两个参数 一个请求的url 和 请求方式
const data = (url, method) => {
  if (registe[url]) return Mock.mock(registe[url]);
  return null;
};
export { data };
