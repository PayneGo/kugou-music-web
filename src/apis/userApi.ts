import { http } from "@/plugins/axios";

class userApi {
  playlist(keyword:string,page: Number, pagesize: Number) {
    return http.request({
      url: `/search`,
      method: "get",
      params: {
        keyword,
        page,
        pagesize,
      },
    });
  }
}

export default new userApi();
