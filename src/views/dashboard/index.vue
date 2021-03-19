<template>
  <div class="dashboard-container">
    <el-form
      ref="StudentForm"
      :model="StudentForm"
      class="studentFrom"
      label-width="150px"
      :rules="rules"
    >
      <div class="dashboard-text">{{ account }}个人信息</div>

      <el-form-item label="姓名：" prop="name">
        <el-input v-model="StudentForm.name" placeholder="请输入姓名" />
      </el-form-item>
       <el-form-item label="学号：" prop="number">
        <el-input
          ref="sno"
          v-model="StudentForm.number"
          placeholder="请输入学号"
          type="text"
          auto-complete="off"
        />
      </el-form-item>
      <el-form-item label="性别：" prop="gender">
        <el-select v-model="StudentForm.gender" placeholder="请选择">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input v-model="StudentForm.age" placeholder="请输入年龄" />
      </el-form-item>
     
      <!-- <el-cascader style="width:1.3rem;"
                       :options="options"
                       v-model="addKeyPersonForm.registered"
                       :rules="{type: 'array'}"
                       @change="handleChange"
                       :separator="' '">
          </el-cascader> -->

      <el-form-item label="学院-专业-班级：" prop="majorClass">
        <el-cascader
          :options="options"
          placeholder="请选择"
          v-model="StudentForm.majorClass"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <!-- <el-form-item label="学院：" prop="collage">
        <el-select
          v-model="StudentForm.collage"
          placeholder="请选择所属学院"
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in collageOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item> -->

       <el-form-item label="联系方式：" prop="phone">
        <el-input v-model="StudentForm.phone" placeholder="请输入手机号码" />
      </el-form-item>

       <el-form-item label="身份证：" prop="idCard">
        <el-input v-model="StudentForm.idCard" placeholder="请输入身份证" />
      </el-form-item>

      <el-form-item label="家庭住址：" prop="address">
        <el-input v-model="StudentForm.address" placeholder="请输入家庭住址" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="updateForm">修改</el-button>
        <el-button @click="resetForm('StudentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getCardTypeNumber} from "../../utils/validate"
import { addComprehensive,updateComprehensive } from "@/api/student";

// 手机号验证
function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

  var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  }

export default {
  name: "Dashboard",
  data() {
    var checkNumber = (rule, value, callback) => {
      let regEn = /^[1-9]\d*$/
      if (!regEn.test(value)) {
        callback(new Error('正整数'))
      } else {
        callback()
      }
    };

    return {
      StudentForm: {
        name: "",
        number: "",
        gender: "",
        age: "",
        majorClass: [],
        phone: "",
        idCard:"",
        address:""
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        number: [{ required: true, validator: checkNumber, trigger: "blur" }],
        age: [{ required: true, validator: checkNumber, trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        majorClass: [
          { required: true, message: "请选择学院专业班级", trigger: "change" }
        ],
        phone: [{ required: true, validator: validPhone, trigger: "blur" }],
         idCard: [
           { required: true, message: '必填项', trigger: 'blur' },
         { validator: getCardTypeNumber, trigger: 'blur' }
         ],
         address:[{ required: true, message: "请输入家庭住址", trigger: "blur" }],
      },
      options: [
        {
          value: "xxkxyjsxy",
          label: "信息科学与技术学院",
          children: [
            {
              value: "jisuanji",
              label: "计算机",
              children: [
                {
                  value: "171",
                  label: "171班"
                },
                {
                  value: "172",
                  label: "172班"
                },
                {
                  value: "173",
                  label: "173班"
                },
                {
                  value: "174",
                  label: "174班"
                }
              ]
            },
            {
              value: "dianzixinxi",
              label: "电子信息",
              children: [
                {
                  value: "171",
                  label: "171班"
                },
                {
                  value: "172",
                  label: "172班"
                },
                {
                  value: "173",
                  label: "173班"
                },
                {
                  value: "174",
                  label: "174班"
                }
              ]
            },
            {
              value: "xinxiguanliyuxinxixitong",
              label: "信息管理与信息系统",
              children: [
                {
                  value: "171",
                  label: "171班"
                },
                {
                  value: "172",
                  label: "172班"
                },
                {
                  value: "173",
                  label: "173班"
                },
                {
                  value: "174",
                  label: "174班"
                }
              ]
            },
            {
              value: "wulianwang",
              label: "物联网",
              children: [
                {
                  value: "171",
                  label: "171班"
                },
                {
                  value: "172",
                  label: "172班"
                },
                {
                  value: "173",
                  label: "173班"
                }
              ]
            },
            {
              value: "dashuju",
              label: "大数据",
              children: [
                {
                  value: "171",
                  label: "171班"
                },
                {
                  value: "172",
                  label: "172班"
                },
                {
                  value: "173",
                  label: "173班"
                },
                {
                  value: "174",
                  label: "174班"
                },
                {
                  value: "175",
                  label: "175班"
                }
              ]
            }
          ]
        }
      ],

      // collageOptions: [
      //   {
      //     label: "信息科学与技术学院",
      //     value: 1
      //   },
      //   {
      //     label: "管理学院",
      //     value: 2
      //   }
      // ]
    };
  },
  computed: {
    ...mapGetters(["account"])
  },
  created() {
    // const hasUserInfo = localStorage.getItem('userInfo')?true:false
    const hasUserInfo = localStorage.getItem('userInfo')
    console.log("aaaaaa"+ typeof hasUserInfo);  //string
    if(hasUserInfo !== "undefined"){
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
     this.StudentForm.name = userInfo.s_name,
     this.StudentForm.number = userInfo.s_number,
    this.StudentForm.gender = userInfo.s_gender,
     this.StudentForm.age = userInfo.s_age,
    this.StudentForm.majorClass =JSON.parse(userInfo.s_college),
    this.StudentForm.phone = userInfo.s_telephone,
    this.StudentForm.idCard = userInfo.s_idCard,
    this.StudentForm.address = userInfo.s_address
    }else{
      console.log("未填写个人信息")
    }
  },
  methods: {
    submitForm() {
     const userId = JSON.parse(localStorage.getItem('user')).id
     console.log("1111111"+userId)
     let data = {
        s_name: this.StudentForm.name,
        s_number: this.StudentForm.number,
        s_gender: this.StudentForm.gender,
        s_age: this.StudentForm.age,
        s_college: JSON.stringify(this.StudentForm.majorClass),
        s_telephone:this.StudentForm.phone,
        s_idCard: this.StudentForm.idCard,
        s_address: this.StudentForm.address,
        userId:userId
      };
      // console.log("44444444"+data.s_number)
      addComprehensive(data).then((res) => {
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
        // 将后台返回的JSON数据存入浏览器localStorage
        localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
         this.$message({
            message: msg,
            type: "success"
          });
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
            console.log("录入失败！"+msg);
            return false;
          }
      });
    },
    updateForm(){
      const sId = JSON.parse(localStorage.getItem('userInfo')).s_id
      const userId = JSON.parse(localStorage.getItem('userInfo')).userId
      let data = {
        s_id:sId,
        s_name: this.StudentForm.name,
        s_number: this.StudentForm.number,
        s_gender: this.StudentForm.gender,
        s_age: this.StudentForm.age,
        s_college: JSON.stringify(this.StudentForm.majorClass),
        s_telephone:this.StudentForm.phone,
        s_idCard: this.StudentForm.idCard,
        s_address: this.StudentForm.address,
        userId:userId
      };
      updateComprehensive(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) {
         this.$message({
            message: msg,
            type: "success"
          });
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
    handleChange(value) {
      console.log(value,'dfsd');
      console.log("zzzz"+this.StudentForm.majorClass)
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    position: relative;
    width: 620px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  &-text {
    font-size: 25px;
    line-height: 46px;
    text-align: center;
    margin: 10px 0;
  }

  .el-input {
    width: 100px;
  }
}
</style>
