// import router from '@/plugins/router'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { useProviderStore } from "@/stores/provider";
interface IOptions {
  loading?: boolean;
  message?: boolean;
  clearValidateError?: boolean;
}
// const storage = useStorage()
export default class Axios {
  private instance;
  private options: IOptions = {
    loading: true,
    message: true,
    clearValidateError: true,
  };
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  public async request<T>(config: AxiosRequestConfig, options?: IOptions) {
    this.options = Object.assign(this.options, options ?? {});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<T>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<T>;
  }

  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        useProviderStore().loadingBar.start();
        this.options.loading = false;

        // if (this.options.clearValidateError) useErrorStore().resetError()
        // config.headers.Accept = 'application/json'
        // config.headers.Authorization = `Bearer ${storage.get(CacheEnum.TOKEN_NAME)}`
        // useLoadingBar().finish;
        return config;
      },
      (error: any) => {
        useProviderStore().loadingBar.error();
        this.options.loading = true;
        return Promise.reject(error);
      }
    );
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        const responseMessage =
          response.data?.success ?? response.data?.success;
        if (responseMessage && this.options.message) {
          useProviderStore().message.success(responseMessage);
        }

        this.options = {
          loading: true,
          message: true,
          clearValidateError: true,
        };
        useProviderStore().loadingBar.finish();
        this.options.loading = true;

        return response;
      },
      (error) => {
        useProviderStore().loadingBar.error();
        this.options.loading = true;

        const response = error.response;

        const errorMessage = response.data.data;
        const status = response.status ?? 500;
        switch (status) {
          // case HttpCodeEnum.UNAUTHORIZED:
          //   storage.remove(CacheEnum.TOKEN_NAME);
          //   router.push({ name: RouteEnum.LOGIN });
          //   break;
          // case HttpCodeEnum.UNPROCESSABLE_ENTITY:
          //   useErrorStore().setErrors(
          //     error.response.data.errors ?? error.response.data
          //   );
          //   break;
          // case HttpCodeEnum.FORBIDDEN:
          //   ElMessage({ type: "error", message: message ?? "没有操作权限" });
          //   break;
          // case HttpCodeEnum.NOT_FOUND:
          //   ElMessage.error("请求资源不存在");
          //   router.push({ name: RouteEnum.HOME });
          //   break;
          // case HttpCodeEnum.TOO_MANY_REQUESTS:
          //   ElMessage({ type: "error", message: "请求过于频繁，请稍候再试" });
          //   break;
          default:
            if (errorMessage) {
              useProviderStore().message.error(errorMessage ?? "服务器错误");
            }
        }
        return Promise.reject(error);
      }
    );
  }
}
