<template>
  <div class="login-container">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="registerForm"
    >
      <div class="title-container">
        <h3 class="title">注册页面</h3>
      </div>
      <el-form-item label="账号" prop="account">
        <el-input
          ref="account"
          v-model="ruleForm.account"
          placeholder="请输入账号"
          type="text"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="请输入密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="cpassword">
        <el-input
          v-model="ruleForm.cpassword"
          type="password"
          placeholder="请再次输入密码"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="所属角色" class="radio" prop="role">
        <el-radio-group v-model="ruleForm.roles">
          <el-radio label="0">学生</el-radio>
          <el-radio label="1">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="tips">
        <span style="color: #214457; font-size: 14px; font-weight: bold"
          >ps:账号即对应的学号或工号</span
        >
      </div>
      <el-form-item>
        <el-button type="primary" @click="registerForm">注册</el-button>
        <el-button @click="Login">已有账号，返回登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  width="30%"
  :modal-append-to-body='false'
  >
  <span>请前往登录页面，进行登录</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="Login">确 定</el-button>
  </span>

</el-dialog>

  </div>
</template>

<script>
import { addUser } from "@/api/register_s";

export default {
  name: "Register",
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if(value.length < 6){
        callback(new Error('密码不能少于6位数'))
      }else{
        if (this.ruleForm.cpassword !== "") {
          this.$refs.ruleForm.validateField("cpassword");
        }
        callback();
      }    
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        cpassword: "",
        password: "",
        account: "",
        roles: "0",
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        cpassword: [{ validator: validatePass2, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
        roles: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
      },
      title:'',
      dialogVisible: false
    };
  },
  methods: {
    registerForm() {
      let data = {
        account: this.ruleForm.account,
        password: this.ruleForm.password,
        cpassword: this.ruleForm.cpassword,
        roles: this.ruleForm.roles,
      };
      console.log("xuehao:"+this.ruleForm.account)
      addUser(data).then((res) => {
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
          // alert(msg);
          this.dialogVisible = true
          this.title = msg
          }else {
            alert(msg)
          }
      });
    },
    Login() {
      console.log("返回登陆");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="scss" scoped>
$dark_gray: #101b20;
$light_gray: #214457;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url("~@/assets/images/bg.jpg") center center no-repeat;
  overflow: hidden;
  background-size: 100% 100%;
  position: fixed;

  .registerForm {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 20px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    margin: 20px 30px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .radio {
    margin: 0;
  }
  .el-form-item--label {
    text-align: center;
  }
  .el-form-item__error {
    opacity: 0.4;
    font-size: 12px;
    color: rgb(238, 63, 63);
    line-height: 21px;
    padding-top: 4px;
  }
}
</style>
