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
      <el-form-item label="学号" prop="number">
        <el-input
          v-model="healthForm.number"
          type="text"
          placeholder="请输入学号"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="healthForm.gender" placeholder="请选择">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话" prop="telephone">
        <el-input
          v-model="healthForm.telephone"
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
          <el-option label="36℃以下" value="36℃以下" />
          <el-option label="36℃-37℃" value="36℃-37℃" />
          <el-option label="37℃以上" value="37℃以上" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否有咳嗽、呼吸困难等症状" prop="ill">
        <el-select v-model="healthForm.ill" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
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
          @click="submitForm"
          style="margin:0 20px"
          v-show="show"
          >提交</el-button
        >
        
         
        <el-button
          type="primary"
          @click="updateForm"
          style="margin:0 20px"
          >修改</el-button
        >
        
        <el-button @click="resetForm('healthForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { regionData, CodeToText,TextToCode } from "element-china-area-data";
import { addHealth ,updateHealth,selectHealthById} from "@/api/health";

export default {
  name: "Health",
  inject:['reload'],
  data() {
    var checknumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      }
    };
    var checktelephone = (rule, value, callback) => {
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
        name: "" ,
        number: "",
        gender: "",
        telephone: "",
        time: "",
        temperature: "",
        ill: "",
        region: []
      },
      local:'',
      healthRules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        number: [{ required: true, validator: checknumber, trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        telephone: [
          {
            required: true,
            validator: checktelephone,
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
      },
      show:true
    };
  },
  created(){
    const hasUserInfo = localStorage.getItem('userInfo')
    console.log("aaaaaa"+ hasUserInfo);  //string
    if(hasUserInfo === "undefined"){
      console.log("未填写学生信息")
    }else{
      this.selectHealthById()
    }


  },
  methods: {
    submitForm() {
      console.log("111111"+this.healthForm.region)
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      console.log("12345"+studentId);
      let data={
        studentId:studentId,
        name: this.healthForm.name,
        number:this.healthForm.number,
        gender: this.healthForm.gender,
        telephone: this.healthForm.telephone,
        time:this.healthForm.time,
        temperature:this.healthForm.temperature,
        ill: this.healthForm.ill,
        region: this.local
      }
      addHealth(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
         this.$message({
            message: msg,
            type: "success"
          });
          this.show=false
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
            console.log("录入失败！"+msg);
            return false;
          }
      })
      
    },
    updateForm(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      let data={
        studentId:studentId,
        name: this.healthForm.name,
        number:this.healthForm.number,
        gender: this.healthForm.gender,
        telephone: this.healthForm.telephone,
        time:this.healthForm.time,
        temperature:this.healthForm.temperature,
        ill: this.healthForm.ill,
        region: this.local
      }
      updateHealth(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) {
         this.$message({
            message: msg,
            type: "success"
          });
          this.reload()
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
            console.log("修改失败！"+msg);
          }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange() {
      var loc = "";
      for (let i = 0; i < this.healthForm.region.length; i++) {
        loc += CodeToText[this.healthForm.region[i]];
      }
      console.log(loc)
      this.local = loc
    },
    selectHealthById(){
       const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      console.log("12345",studentId)
      let data = {studentId:studentId}
      selectHealthById(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        var health = res.list
        if(code == 200){
          this.$message({
            message: msg,
            type: "success"
          });
          this.healthForm.name=health.name,
          this.healthForm.number=health.number,
          this.healthForm.gender=health.gender,
          this.healthForm.telephone=health.telephone,
          this.healthForm.time=health.time
          this.healthForm.temperature=health.temperature
          this.healthForm.ill=health.ill
          this.healthForm.region=health.region
          console.log("123456",health.region)
          console.log(TextToCode["河北省"]["秦皇岛市"]["海港区"])
        }else{
           this.$message({
            message: msg,
            type: "error"
          });
            console.log("获取失败！"+msg);
            return false;
        }
      })
    },
    // changeRegion(){
      
    // }
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
