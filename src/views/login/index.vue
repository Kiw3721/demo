<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">高校学生活动核实系统</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
          <span class="text">账号</span>
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="请输入学号或工号"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
          <span class="text">密码</span>
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="goon" style="width:100%;margin-bottom:15px;" @click.native.prevent="handleLogin">登录</el-button>

      <div class="tips">
        <el-button type="text" style="color:#101b20;font-size:16px;" @click="dialogFormVisible = true">忘记密码</el-button>
        <el-button type="text" style="color:#101b20;font-size:16px;" @click="Register">立即注册</el-button>
      </div>

    </el-form>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" :append-to-body="true">
  <el-form :model="PasswordForm" :rules="passwordRules" :label-width="100">
    <el-form-item label="账号："  prop="account">
      <el-input v-model="PasswordForm.account" autocomplete="off" placeholder="请输入账号" type="text"></el-input>
    </el-form-item>
    <el-form-item label="新密码"  prop="newPassword">
      <el-input v-model="PasswordForm.newPassword" type="password" placeholder="请再输入一次新的密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确定新密码" prop="cNewPassword">
      <el-input v-model="PasswordForm.cNewPassword"  type="password" placeholder="请再输入一次新的密码" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所属角色" prop="role">
        <el-radio-group v-model="PasswordForm.roles">
          <el-radio label="0">学生</el-radio>
          <el-radio label="1">老师</el-radio>
        </el-radio-group>
      </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="changePassword">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { changePassword } from "@/api/login";

export default {
  name: 'Login',
  data() {
    const validateAccount = (rule, value, callback) => {
       if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新的密码"));
      } else if(value.length < 6){
        callback(new Error('密码不能少于6位数'))
      }else{
        if (this.PasswordForm.newPassword !== "") {
          this.$refs.PasswordForm.validateField("cNewPassword");
        }
        callback();
      }    
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新的密码"));
      } else if (value !== this.PasswordForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [{ type:'string',required: true, trigger: 'blur', validator: validateAccount }],
        password: [{ type:'string' , required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogFormVisible: false,
      PasswordForm:{
        account: "",
        newPassword:"",
        cNewPassword:"",
        roles: "0",
      },
      passwordRules: {
        account: [{ type:'string',required: true, trigger: 'blur', validator: validateAccount }],
        newPassword: [{ type:'string' , required: true, trigger: 'blur', validator: validatePass }],
        cNewPassword: [{ type:'string' , required: true, trigger: 'blur', validator: validatePass2 }],
        roles: [{ required: true, message: "请选择角色", trigger: "change" },],
      },
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then((res) => {
            let roles = res.roles;
            this.$router.push({ path:'/' })
            this.loading = false
          }).catch((errorMsg) => {
            this.loading = false
            this.$message({
              type:'error',
              message:"登录失败，账号或密码错误"
            })
          })
    },
    Register() {
      console.log('注册路由')
      this.$router.push({ path: '/register' })
    },
    changePassword(){
      changePassword(this.PasswordForm).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if(code == 200) { 
          this.$message({
            message: msg,
            type: "success"
          });
          this.dialogFormVisible = false
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
$dark_gray:#101b20;
$light_gray:#214457;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  background: url("~@/assets/images/bg.jpg") center center no-repeat;
  overflow: hidden;
  background-size: 100% 100%;
  position: fixed;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
     float: right;
  }

  .svg-container {
    padding: 5px 20px 5px 10px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    .text{
      padding:5px 15px;
      font-size: 14px;
      color: $light_gray;
      font-weight: bold;
      text-align: left;
  }
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

  .el-button--goon {
  color: #FFF;
  background-color:#4d79aa;
  border-color: #4d79aa;
}

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
