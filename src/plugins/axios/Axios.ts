import axios, { AxiosRequestConfig } from "axios";

interface IOptions {
  loading?: boolean
  message?: boolean
  clearValidateError?: boolean
}

class Axios {
  private instance;
  private options: IOptions = { loading: true, message: true, clearValidateError: true }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.interceptors();
  }

  public async request<T>(config: AxiosRequestConfig, options?: IOptions) {
    this.options = Object.assign(this.options, options ?? {})
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config)
        resolve(response.data)
      } catch (error) {
        reject(error)
      }
    }) as Promise<T>
  }

  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export { Axios };
