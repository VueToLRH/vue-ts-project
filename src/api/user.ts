import axios, { ResponseData } from './index';
import { AxiosPromise } from 'axios';

interface LoginReqArguInterface {
  user_name: string;
  password: number | string;
}

interface GetInfoReqArguInterface {
  user_id: string;
}

export const loginReq = (
  data: LoginReqArguInterface
): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/login',
    data,
    method: 'POST',
  });
};

export const getInfoReq = (
  data?: GetInfoReqArguInterface
): AxiosPromise<ResponseData> => {
  return axios.request({
    url: '/api/user/get_info',
    data,
    method: 'POST',
  });
};
