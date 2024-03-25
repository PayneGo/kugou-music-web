import { http } from "@/plugins/axios";
import UserInfo from "@/type/UserType"

class UserApi {
  // 手机登陆
  loginCellphone(userInfo: UserInfo) {
    return http.request({
      url: `/login/cellphone`,
      method: "get",
      params: {
        mobile: userInfo.mobile,
        code: userInfo.code,
      },
    });
  }

  // 发送手机验证码
  sentCaptcha(mobile: string) {
    return http.request({
      url: `/captcha/sent`,
      method: "get",
      params: {
        mobile,
      },
    });
  }
}
export default new UserApi();
