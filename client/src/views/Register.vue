<template>
  <div class="register_container">
    <!-- login area -->
    <div class="register_box">
      <!-- avatar -->

      <el-form
        :model="registerForm"
        :rules="register_rules"
        ref="registerFormRef"
        class="register_form"
      >
        <div class="company_name">米修在线后台管理系统</div>
        <!-- email -->
        <el-form-item prop="username" label="用户名" label-width="100px">
          <!-- v-model get the model object's value -->

          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="registerForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- email -->
        <el-form-item prop="email" label="邮箱" label-width="100px">
          <!-- v-model get the model object's value -->

          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="registerForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password" label="密码" label-width="100px">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="registerForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" label="确认密码" label-width="100px">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="registerForm.confirmpassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <!-- <el-form-item prop="password" label="选择身份" label-width="100px">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->

        <el-form-item class="btns">
          <!-- login and reset button -->
          <el-button type="primary" @click="submitForm">注册</el-button>
          <el-button type="info" @click="resetForm">取消</el-button>
        </el-form-item>
        <div @click="$router.push('/login')">login</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      register_rules: {
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
      registerForm: {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.registerFormRef.validate(async (valid) => {
        // test the submited value
        const result = this.registerForm;
        // console.log(result);
        if (!valid) {
          return false;
        }
        if (result.password != result.confirmpassword) {
          this.$message.error("two password not equal");
          return;
        }
        // desctructure content
        const { data } = await axios.post(
          "https://api.glennou.cn/api/auth/register",
          this.registerForm
        );

        // const { data } = await this.$axios({
        //   method: "post",
        //   url: "http://localhost:8800/api/auth/login",
        //   data: this.loginForm,
        // });

        // console.log(data);
        // login failed

        if (data.success != true) {
          // console.log("login failed");
          this.$message.error("注册失败");
          return;
        }

        // login success
        console.log("login success");
        this.$message({
          message: "注册成功",
          type: "success",
        });

        // router push to the /home section
        this.$router.push("/login");
      });
    },

    resetForm() {
      this.$refs.registerFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.register_container {
  background-color: #2b4b6b;
  height: 100%;
  width: 100%;
}
.register_box {
  width: 450px;
  height: 400px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  // form section
  .register_form {
    // form area in the center
    position: absolute;
    width: 100%;
    bottom: 0;
    // input field in the middle
    padding: 0 20px;
    // button in the right bottom corner
    box-sizing: border-box;
  }
  .el-form-item {
    margin-bottom: 15px;
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