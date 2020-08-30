// 引入 axios 和定义在 node_modules/axios/index.ts 文件里的类型声明
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
} from 'axios';
import config from '@/config';

const {
  api: { devApiBaseUrl, proApiBaseUrl },
} = config;
// process.env.NODE_ENV是vue服务内置的环境变量，有两个值，当本地开发时是development，当打包时是production
const apiBaseUrl =
  process.env.NODE_ENV === 'production' ? proApiBaseUrl : devApiBaseUrl;

export interface ResponseData {
  code: number;
  data?: any;
  msg: string;
}

class HttpRequest {
  // 定义一个接口请求类，用于创建一个axios请求实例
  constructor(public baseUrl: string = apiBaseUrl) {
    // 这个类接收一个字符串参数，是接口请求的基本路径
    this.baseUrl = baseUrl;
  }

  public request(options: AxiosRequestConfig): AxiosPromise {
    // 实际调用接口的时候调用实例的这个方法，他返回一个 AxiosPromise
    // 使用 axios.create 方法创建一个 axios 实例，他是一个函数，同时这个函数包含多个属性
    const instance: AxiosInstance = axios.create();
    // 合并基础路径和每个接口单独传入的配置，比如url、参数等
    options = this.mergeConfig(options);
    // 调用 interceptors 方法使拦截器生效
    this.interceptors(instance, options.url);
    // 最后返回AxiosPromise
    return instance(options);
  }

  // 定义 interceptors 函数用于添加全局请求和响应拦截逻辑
  private interceptors(instance: AxiosInstance, url?: string) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 接口请求的所有配置，都在 config 对象中，他的类型是 AxiosRequestConfig
        // 如果要修改接口请求配置，需要修改 axios.defaults 上的字段值
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // res 的类型是 AxiosResponse<any>，包含六个字段，其中 data 是服务端返回的数据
        const { data } = res;
        // 通常服务端会将响应状态码、提示信息、数据等放到返回的数据中
        const { code, msg } = data;
        if (code !== 0) {
          // 在服务端将正确返回的状态码标为 0
          // 如果不是 0，则打印错误信息
          console.error(msg);
        }
        return res; // 返回数据
      },
      (error) => {
        // 遇到报错的回调
        return Promise.reject(error);
      }
    );
  }

  // mergeConfig 方法用于合并基础路径配置和接口单独配置
  private mergeConfig(options: AxiosRequestConfig): AxiosRequestConfig {
    return Object.assign({ baseURL: this.baseUrl }, options);
  }
}

export default HttpRequest;
