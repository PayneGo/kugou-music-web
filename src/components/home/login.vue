<template>
  <n-tabs default-value="signin" size="large" justify-content="space-evenly">
    <!-- 账号密码登陆开始 -->
    <n-tab-pane name="signin" tab="密码登录">
      <n-form
        ref="loginRef"
        :model="loginform"
        :rules="rules"
        label-width="auto"
        :show-require-mark="false"
      >
        <n-form-item path="username" label="用户名">
          <n-input
            v-model="loginform.username"
            @keydown.enter.prevent
            placeholder="请输入用户名"
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="loginform.password"
            type="password"
            @keydown.enter.prevent
            placeholder="请输入密码"
          />
        </n-form-item>
      </n-form>
      <n-button @click="login" type="primary" block secondary strong>
        登录
      </n-button>
    </n-tab-pane>
    <!-- 账号密码登陆结束 -->
    <!-- 验证码登陆开始 -->
    <n-tab-pane name="signUp" tab="验证码登录">
      <n-form
        ref="loginRefByCode"
        :model="loginform"
        :rules="rulesByCode"
        label-width="auto"
        :show-require-mark="false"
      >
        <n-form-item path="username" label="用户名">
          <n-input
            v-model:value="loginform.mobile"
            @keydown.enter.prevent
            placeholder="请输入用户名"
          />
        </n-form-item>
        <n-form-item path="code" label="密码">
          <n-input
            v-model:value="loginform.code"
            type="code"
            @keydown.enter.prevent
            placeholder="请输入验证码"
          />
          <n-button @click="sendCode" type="primary" secondary>
            获取验证码
          </n-button>
        </n-form-item>
      </n-form>
      <n-button @click="loginByCode" type="primary" block secondary strong>
        登录
      </n-button>
    </n-tab-pane>
    <!-- 验证码登陆结束 -->
  </n-tabs>

  <n-space>
    <n-button @click="handleStart"> 开始 </n-button>
    <n-button @click="handleFinish"> 结束 </n-button>
    <n-button @click="handleError"> 报个错 </n-button>
  </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  FormRules,
  FormInst,
  useMessage,
  FormItemRule,
  useLoadingBar,
} from "naive-ui";
import UserInfo from "@/type/UserType";
import UserApi from "@/apis/userApi";
import { useProviderStore } from "@/stores/provider";

// 定义表单对象
const loginRef = ref<FormInst | null>(null);

// 定义表单对象
const loginRefByCode = ref<FormInst | null>(null);
// 定义登录表单对象
const loginform = ref<UserInfo>({
  mobile: null,
  code: null,
  username: null,
  password: null,
});
const message = useMessage();

// 登录按钮方法
function login() {
  loginRef.value?.validate((errors) => {
    if (!errors) {
      var loginUser = loginform.value;
      UserApi.loginCellphone(loginUser).then((res) => {
        const status = res.status;
        const data = res.data;
        console.log(status);
        console.log(data);
      });
    } else {
      message.error("验证失败");
    }
  });
}

// 通过验证码登录按钮方法
function loginByCode() {
  loginRefByCode.value?.validate((errors) => {
    if (!errors) {
      var loginUser = loginform.value;
      // UserApi.loginCellphone(loginUser).then((res) => {
      const res = {
        data: {
          is_vip: 1,
          servertime: "2024-03-24 17:30:03",
          roam_type: 0,
          t1: "e4e9cfda3ecbf1b5a5395ba7c23ea483e153bd8f31cb41cd13e31fcf5df4b52c93f7a31bf631f6134ecb215c4ced05679eacd1166f8e5dad41f9d18f8c4cb2350a37273d63964b9d13d923eebf18e610",
          reg_time: "2014-09-20 18:57:00",
          vip_type: 6,
          vip_begin_time: "2022-07-02 23:35:02",
          expire_time: "2021-07-03 00:26:55",
          userid: 495399625,
          su_vip_end_time: "2024-07-25 11:28:51",
          sex: 1,
          user_type: 29,
          username: "kgopen495399625",
          qq: 0,
          exp: 967,
          m_end_time: "2024-08-17 23:35:02",
          score: 967,
          m_is_old: 0,
          birthday: "1998-12-27",
          arttoy_avatar: "",
          totp_server_timestamp: 1711272603,
          roam_end_time: "",
          su_vip_begin_time: "2024-01-21 11:28:51",
          roam_begin_time: "",
          vip_end_time: "2024-08-17 23:35:02",
          secu_params:
            "0bd22154db200d630aa0e861562f0ac494cf9158276c91a00a491e3abf8778f21166d8b50a204a0f627b207985fc41fcfd65d6302d18f616d99fe2bf63e1a5429b4b129af29239d861b30a911f498c94",
          nickname: "payne",
          mobile: 1,
          vip_token: "1605f1613cb551c1644e693872124e91",
          bc_code: "",
          m_type: 1,
          roam_list: {},
          m_begin_time: "2022-07-02 23:35:02",
          pic: "http://imge.kugou.com/kugouicon/165/20221114/20221114103301202219.jpg",
          su_vip_clearday: "2024-03-23 11:28:51",
          user_y_type: 13,
          su_vip_y_endtime: "",
          birthday_mmdd: "1227",
          y_type: 3,
          wechat: 0,
          token:
            "51e397af7a4d3dc7a0526d3cb66fea4a946a4c21375de797fc1be7d671db8aa5",
        },
        status: 1,
        error_code: 0,
      };
      console.log(res);
      // var token = res.data.data.accessToken;
      // localStorage.setItem("token", token);
      // });
    } else {
      message.error("验证失败");
    }
  });
}

// 发送验证码方法
function sendCode() {
  loginRefByCode.value?.validate(
    (errors) => {
      if (!errors) {
        const mobile = loginform.value.mobile;
        console.log(mobile);
        UserApi.sentCaptcha(mobile).then((res) => {
          const status = res.status;
          console.log(status);
          if (status === 1) {
            message.success("验证码发送成功");
          } else {
            message.error(res.data);
          }
        });
      } else {
        message.error("请输入正确的手机号");
      }
    },
    (rule) => {
      return rule?.key === "onlyUsername";
    }
  );
}

// 自定义校验方法
const rules: FormRules = {
  username: [
    {
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请输入手机号");
        } else if (!/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
          return new Error("请输入正确格式的手机号");
        }
        return true;
      },
      required: true,
      trigger: ["input", "blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: ["input", "blur"],
    },
  ],
};

const rulesByCode: FormRules = {
  mobile: [
    {
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("请输入手机号");
        } else if (!/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value)) {
          return new Error("请输入正确格式的手机号");
        }
        return true;
      },
      key: "onlyUsername",
      required: true,
      trigger: ["input", "blur", "change"],
    },
  ],
  code: [
    {
      required: true,
      message: "验证码不能为空",
      trigger: ["input", "blur"],
    },
  ],
};

const loadingBar = useLoadingBar();
const disabledRef = ref(true);
function handleStart() {
  useProviderStore().loadingBar.start();
  disabledRef.value = false;
}
function handleFinish() {
  useProviderStore().loadingBar.finish();
  disabledRef.value = true;
}
function handleError() {
  disabledRef.value = true;
  useProviderStore().loadingBar.error();
}
</script>

<style scoped lang="scss">
.button {
  align-items: flex-end;
}
</style>
