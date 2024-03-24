<template>
  <n-tabs default-value="signin" size="large" justify-content="space-evenly">
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
            v-model:value="loginform.username"
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
    <n-tab-pane name="signUp" tab="验证码登录">
      <n-form
        ref="loginRefByCode"
        :model="loginformByCode"
        :rules="rulesByCode"
        label-width="auto"
        :show-require-mark="false"
      >
        <n-form-item path="username" label="用户名">
          <n-input
            v-model:value="loginformByCode.username"
            @keydown.enter.prevent
            placeholder="请输入用户名"
          />
        </n-form-item>
        <n-form-item path="code" label="密码">
          <n-input
            v-model:value="loginformByCode.code"
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
  </n-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { FormRules, FormInst, useMessage, FormItemRule } from "naive-ui";
import { userLoginApi, uploadByPhoneCodeApi } from "@/api/userApi";
import { sendRegisterCode } from "@/api/notiyfApi";
import type { LoginUserModel } from "@/type/userLoginType";
import type { UserModel } from "@/type/userModel";

export default defineComponent({
  setup() {
    // 定义表单对象
    const loginRef = ref<FormInst | null>(null);

    // 定义表单对象
    const loginRefByCode = ref<FormInst | null>(null);
    // 定义登录表单对象
    const loginform = ref<LoginUserModel>({
      username: null,
      password: null,
    });

    // 定义验证码登录表单对象
    const loginformByCode = ref<LoginUserModel>({
      username: null,
      code: null,
    });

    const user = ref<UserModel>({
      username: null,
    });

    const message = useMessage();

    // 登录按钮方法
    function login() {
      loginRef.value?.validate((errors) => {
        if (!errors) {
          var loginUser = loginform.value;
          userLoginApi(loginUser).then((res) => {});
        } else {
          message.error("验证失败");
        }
      });
    }

    // 通过验证码登录按钮方法
    function loginByCode() {
      loginRefByCode.value?.validate((errors) => {
        if (!errors) {
          var loginUser = loginformByCode.value;
          uploadByPhoneCodeApi(loginUser).then((res) => {
            console.log(res.data.data.accessToken);
            var token = res.data.data.accessToken;
            localStorage.setItem("token",token);
          });
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
            user.value.username = loginformByCode.value.username;
            sendRegisterCode(user.value).then((res) => {
              message.success("验证码发送成功");
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

    return {
      loginform,
      user,
      loginformByCode,
      rules,
      rulesByCode,
      loginRef,
      loginRefByCode,
      login,
      loginByCode,
      sendCode,
    };
  },
});
</script>

<style scoped lang="scss">
.button {
  align-items: flex-end;
}
</style>
