import Vue from 'vue';
import axios from 'axios'
import { Toast } from 'mint-ui';

const Axios = axios.create({
    baseURL: "http://localhost:3001/api/",
    // baseURL:'http://97.64.44.53/api/',
    timeout: 10000,
    responseType: "json",
  //   withCredentials: true, // 是否允许带cookie这些
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  });
  
  //POST传参序列化(添加请求拦截器)
  Axios.interceptors.request.use(
    config => {
      // 在发送请求之前做某件事
      if (
        config.method === "post" ||
        config.method === "put"
      ) {
        // 序列化
        config.data = qs.stringify(config.data);
      }
      return config;
    },
    error => {
        Toast(error.message);
        return Promise.reject(error.message);
    }
  );
  
  //返回状态判断(添加响应拦截器)
  Axios.interceptors.response.use(
    res => {
      if (res.data.status != '0000') {
            Toast(res.data.msg);
            return Promise.reject(res.data.Msg);
      }
      return res;
    }
  );
  
Vue.prototype.$http = Axios

export default {axios:Axios}