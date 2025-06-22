import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import axiosInstance from './axios-instance';

const axiosController = async <R, T = undefined>(
  endpoint: string,
  data?: T
): Promise<AxiosResponse<R>> => {
  const [method, url] = endpoint.split(':');

  try {
    const response = await axiosInstance({
      method: method,
      url: url,
      data: data,
    });
    return response;
  } catch (error: unknown) {
    const err = error as AxiosError;

    if (!isAxiosError(err)) {
      console.error('Axios Error not occured!');
      return err;
    }

    throw err;
  }
};

export default axiosController;
