/* eslint-disable @typescript-eslint/no-explicit-any */
import { IApiRes } from "@/types/api-res.interface";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
});

const onRequest = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const onResponseError = (error: AxiosError<IApiRes>) => {
  const res = error.response;

  if (res) {
    switch (res.status) {
      case 400:
        toast.warning("Bad Request", {
          description: (res?.data as any)?.message || "N/A"
        });
        break;
      case 401:
        toast.error("Unauthenticated", {
          description: "Something went wrong."
        });
        break;
      case 500:
        toast.error("Internal Server Error", {
          description: (res?.data as any)?.message || "N/A"
        });
        break;
      default:
        toast.error("Unknown Error Occur", {
          description: "Something went wrong."
        });
        break;
    }
  }

  if (!res) {
    toast.error("Unknown Error Occur", {
      description: "Something went wrong."
    });
  }

  return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
