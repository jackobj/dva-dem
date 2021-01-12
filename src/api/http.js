import fetch from "dva/fetch";
import { data } from "../../mock/index";
const header = {
  "Content-Type": "application/x-www-form-urlencoded",
  "Cache-Control": "no-cache",
  // "accesstoken": token  //用户登陆后返回的token，某些涉及用户数据的接口需要在header中加上token
};
// get 请求
const get = (url, params) => {
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach((key) =>
      paramsArray.push(key + "=" + params[key])
    );
    if (url.search(/\?/) === -1) {
      url += "?" + paramsArray.join("&");
    } else {
      url += "&" + paramsArray.join("&");
    }
  }
  const promise = new Promise((resolve, reject) => {
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: header,
    }).then(
      (response) => {
        response.body.data = data(url, "get");
        console.log(response, "-----");
        resolve(response);
      }
      //将返回数据转化为json，也可以转为text(),否则无法看到返回数据,且必须回调才可以看到
    );
  });
  return promise;
  //   return new Promise((resolve, reject)  => {
  //       console.log(url)
  //       fetch(url,{
  //           method: 'GET',
  //           headers: header
  //       })
  //       .then((response) => response.json()
  //           //将返回数据转化为json，也可以转为text(),否则无法看到返回数据,且必须回调才可以看到
  //       )
  //       .then((responseData) => {
  //         console.log(responseData)
  //           resolve(responseData);
  //       })
  //       .catch((err) => {
  //           console.log("err:",err)
  //           reject(err);
  //       });
  //   })
};
// post请求
const post = (url, params) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "POST",
      headers: header,
      body: JSON.stringify(params), //body参数，通常需要转换成字符串后服务器才能解析
    })
      .then((response) => response.json())
      .then((responseData) => {
        responseData.body.data = data(url, "post");
        console.log(responseData, "-----");
        resolve(responseData);
      })
      .catch((err) => {
        console.log("err:", url, err); //网络请求失败返回的数据
        reject(err);
      });
  });
};
const http = {
  get: get,
  post: post,
};
export default http;
