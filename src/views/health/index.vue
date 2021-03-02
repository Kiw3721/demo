<template>
  <div class="health-container">
    <el-form
      ref="health-Form"
      :model="healthForm"
      :rules="healthRules"
      class="health-form"
      auto-complete="on"
      label-position="right"
      label-width="240px"
      :inline="true"
    >
      <div class="title-container">
        <h3 class="title">健康登记表</h3>
      </div>

      <el-form-item label="姓名" prop="name">
        <el-input
          ref="name"
          v-model="healthForm.name"
          placeholder="请输入姓名"
          type="text"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item label="学号" prop="sno">
        <el-input
          v-model="healthForm.sno"
          type="text"
          placeholder="请输入学号"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="healthForm.sex" placeholder="请选择">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input
          v-model="healthForm.phone"
          type="text"
          placeholder="请输入联系方式"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="填报时间" prop="time">
        <el-date-picker
          v-model="healthForm.time"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="体温" prop="temperature">
        <el-select v-model="healthForm.temperature" placeholder="请选择">
          <el-option label="36℃以下" value="1" />
          <el-option label="36℃-37℃" value="2" />
          <el-option label="37℃以上" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有咳嗽、呼吸困难等症状" prop="ill">
        <el-select v-model="healthForm.ill" placeholder="请选择">
          <el-option label="是" value="1" />
          <el-option label="否" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="目前所在地" prop="region">
        <el-cascader
          size="large"
          :options="options"
          v-model="healthForm.region"
          @change="handleChange"
        >
        </el-cascader>
      </el-form-item>

      <el-form-item style="padding:0 300px">
        <el-button
          type="primary"
          @click="submitForm('healthForm')"
          style="margin:0 20px"
          >提交</el-button
        >
        <el-button @click="resetForm('healthForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText } from "element-china-area-data";

export default {
  name: "Health",
  data() {
    var checkSno = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      options: regionData,
      healthForm: {
        name: "",
        sno: "",
        sex: "",
        phone: "",
        time: "",
        temperature: "",
        ill: "",
        region: []
      },
      healthRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        sno: [{ required: true, validator: checkSno, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          {
            required: true,
            validator: checkPhone,
            type: "number",
            trigger: "blur"
          }
        ],
        time: [{ required: true, message: "请选择时间点", trigger: "blur" }],
        temperature: [
          { required: true, message: "请选择体温", trigger: "blur" }
        ],
        ill: [{ required: true, trigger: "blur" }],
        region: [{ required: true, message: "请选择所在地", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log("12345");
      this.$refs[formName].validate(valid => {
        console.log("1111111111");
        if (valid) {
          alert("submit!");
          this.$message({
            message: "提交成功",
            type: "success"
          });
        } else {
          console.log("提交失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      alert(loc);
    }
  }
};
</script>

<style lang="scss" scoped>
.health-container {
  min-height: 100%;
  width: 100%;

  .health-form {
    position: relative;
    width: 920px;
    max-width: 100%;
    padding: 30px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      margin: 0px auto 20px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
