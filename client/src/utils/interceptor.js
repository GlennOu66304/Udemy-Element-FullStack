//在官方的axios的基础上封装一个添加拦截器的axios
import axios from "axios";
//配置默认的路由地址头
axios.defaults.baseURL = "https://api.glennou.cn";
//全局添加拦截器的作用是可以在每个api前面加上headers的token验证
axios.interceptors.request.use((config) => {
  // 判断token是否存在和是否需要token验证的路由
  if (sessionStorage.getItem("token")) {
    config.headers.Authorization = sessionStorage.getItem("token");
  }
  return config;
});
export default axios;

// main.js this.$axios
// utls import axios from '../../interceptor.js"
// pure axios axios
