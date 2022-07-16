<template>
  <div class="login_container">
    <!-- login area -->
    <div class="login_box">
      <div class="company_name">米修在线后台管理系统</div>
      <!-- login form -->

      <el-form
        :model="loginForm"
        :rules="login_rules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
      >
        <!-- email -->
        <!-- el-form的label和el-input不在同一行
https://blog.csdn.net/m0_46581222/article/details/123559956
 -->
        <el-form-item prop="email" label="邮箱" label-width="70px">
          <!-- v-model get the model object's value -->
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password" label="密码" label-width="70px">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item class="btns">
          <!-- login and reset button -->
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
        <!-- sign up page -->
        <div @click="$router.push('/register')">register account</div>
        <!-- Vue.js redirection to another page -->
        <!-- https://stackoverflow.com/questions/35664550/vue-js-redirection-to-another-page -->
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      login_rules: {
        email: [
          // rules not filled the content
          { required: true, message: "邮箱必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 15,
            message: "用户名长度要在3到15个字符",
            trigger: "blur",
          },
        ],
        password: [
          // rules not filled the content
          { required: true, message: "用户密码必填", trigger: "blur" },
          // rule filled the content
          {
            min: 3,
            max: 6,
            message: "用户密码长度要在3到6个字符",
            trigger: "blur",
          },
        ],
      },
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // test the submited value
        // const result = this.loginForm;
        // console.log(result);
        if (!valid) {
          return false;
        }

        // desctructure content
        const { data } = await axios.post(
          "http://localhost:8800/api/auth/login",
          this.loginForm
        );

        // const { data } = await this.$axios({
        //   method: "post",
        //   url: "http://localhost:8800/api/auth/login",
        //   data: this.loginForm,
        // });

        // console.log(data);
        // login failed

        if (data.succsss !== true) {
          // console.log("login failed");
          this.$message.error("登录失败");
          return;
        }

        // login success
        console.log("login success");
        this.$message({
          message: "登录成功",
          type: "success",
        });
        // save the token into the session
        window.sessionStorage.setItem("token", data.token);
        // router push to the /home section
        this.$router.push("/welcome");
      });
    },

    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // form section
  .login_form {
    // form area in the center
    position: absolute;
    width: 100%;
    bottom: 0;
    // input field in the middle
    padding: 0 20px;
    // button in the right bottom corner
    box-sizing: border-box;
  }
  .company_name {
    text-align: center;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>