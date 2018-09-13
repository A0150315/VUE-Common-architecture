import axios, { AxiosRequestConfig, AxiosStatic } from "axios";
import proxyList from "./ProxyList";

import store from "../../store";

interface axiosMethods extends AxiosStatic {
  [propName: string]: any;
}

// 带认证信息（jq叫跨域？）
// axios.defaults.withCredentials = true;

const Axios: axiosMethods = axios;

// 请求拦截器
Axios.interceptors.request.use(
  function(config: AxiosRequestConfig) {
    return config;
  },
  function(error) {
    console.log(error.response);
    return Promise.reject(error);
  }
);
//响应拦截器
Axios.interceptors.response.use(
  function(response) {
    if (response.status === 200 && response.data.code === 0) {
      store.dispatch("closeToast");
      return response.data;
    }
    store.dispatch("autoToast", "服务器异常");
    return Promise.reject("服务端错误：" + response.data.code);
  },
  function(error) {
    store.dispatch("autoToast", "网络不可用，请检查网络");
    console.log(error.response);
    return Promise.reject(error);
  }
);

export default class $http {
  private target: any;

  constructor(target: any) {
    this.target = target;
    this.initHttp();
  }

  initHttp() {
    this.target.$http = {};
    proxyList.forEach(e => {
      this.target.$http[e.name] = (...agrs: Array<Object>) => {
        // return new Promise((res, rej) => {
        //   res("succeess");
        // });
        if (agrs.length === 0)
          return Axios[e.methods.toLocaleLowerCase()](e.path);
        if (agrs.length === 1)
          return Axios[e.methods.toLocaleLowerCase()](e.path, agrs[0]);
        if (agrs.length >= 2)
          return Axios[e.methods.toLocaleLowerCase()](e.path, agrs[0], agrs[1]);
      };
    });
  }
}
