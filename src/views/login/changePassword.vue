<template>
  <div class="password-container">
    <el-form ref="PasswordForm" :model="PasswordForm" :rules="passwordRules" class="password-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">修改密码</h3>
      </div>

      <el-form-item label="账号" prop="account">
        <el-input
          ref="account"
          v-model="PasswordForm.account"
          placeholder="请输入账号"
          type="text"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="PasswordForm.oldPassword"
          type="password"
          placeholder="请输入旧密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="PasswordForm.newPassword"
          type="password"
          placeholder="请输入新的密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="cNewPassword">
        <el-input
          v-model="PasswordForm.cNewPassword"
          type="password"
          placeholder="请再输入一次新的密码"
          autocomplete="off"
        />
      </el-form-item>

      <el-button :loading="loading" type="goon" style="width:100%;margin-bottom:15px;" @click.native.prevent="changePassword">确认修改</el-button>

    </el-form>
  </div>
</template>

<script>

import { changePassword } from "@/api/login";

export default {
  name: 'changePassword',
  data() {
    const validateAccount = (rule, value, callback) => {
       if (!value) {
        return callback(new Error("账号不能为空"));
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的密码"));
      } else if(value.length < 6){
        callback(new Error('密码不能少于6位数'))
      }else{
        if (this.PasswordForm.cpassword !== "") {
          this.$refs.PasswordForm.validateField("cNewPassword");
        }
        callback();
      }    
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新的密码"));
      } else if (value !== this.PasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      PasswordForm: {
        account: "",
        oldPassword: "",
        newPassword:"",
        cNewPassword:""
      },
      passwordRules: {
        account: [{ type:'string',required: true, trigger: 'blur', validator: validateAccount }],
        oldPassword: [{ type:'string' , required: true, trigger: 'blur', validator: validatePassword }],
        newPassword: [{ type:'string' , required: true, trigger: 'blur', validator: validatePass }],
        cNewPassword: [{ type:'string' , required: true, trigger: 'blur', validator: validatePass2 }],

      },
      loading: false,
    }
  },
  watch: {
  },
  methods: {
    changePassword() {
      this.loading = true
        changePassword(this.PasswordForm).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
          this.$message({
            message: msg,
            type: "success"
          });
          this.loading = false
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
          }
        })
    },
    
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#101b20;
$light_gray:#214457;

.password-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;

  .password-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 20px 0;
    margin: 0 auto;
    overflow: hidden;
  }



  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;

    }
  }

}
</style>
