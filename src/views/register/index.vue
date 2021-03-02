<template>
  <div class="login-container">
    <el-form ref="ruleForm" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="registerForm">
      <div class="title-container">
        <h3 class="title">注册页面</h3>
      </div>
      <el-form-item label="账号" prop="account">
        <el-input ref="account" v-model="ruleForm.account" placeholder="请输入账号" type="text" auto-complete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" placeholder="请输入密码" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" placeholder="请再次输入密码" autocomplete="off" />
      </el-form-item>
      <el-form-item label="所属角色" class="radio" prop="roles">
        <el-radio-group v-model="ruleForm.roles">
          <el-radio label="student">学生</el-radio>
          <el-radio label="teacher">老师</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="tips">
        <span style="color:#214457;font-size: 14px;font-weight: bold;">ps:账号即对应的学号或工号</span>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        checkPass: '',
        pass: '',
        account: '',
        roles: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log('12345')
      this.$refs[formName].validate((valid) => {
        console.log('1111111111')
        if (valid) {
          alert('submit!')
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.$router.push('/login')
        } else {
          console.log('注册失败！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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

  .tips{
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
.radio{
  margin:0;
}
.el-form-item--label{
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
