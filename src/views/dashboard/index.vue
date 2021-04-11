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
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
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
        <el-button type="primary" @click="submitForm" v-show="show">提交</el-button>
        <el-button type="primary" @click="updateForm">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import {getCardTypeNumber} from "../../utils/validate"
import { addStudent,updateStudent,getStudentById} from "@/api/student";

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
  inject:['reload'],
  data() {
    var checkNumber = (rule, value, callback) => {
      let regEn = /^[1-9]\d*$/
      if (!regEn.test(value)) {
        callback(new Error('请输入正整数'))
      } else if (value.length < 12) {
        callback(new Error('输入12位的学号'))
      }else {
        callback()
      }
      
    };
    var checkName = (rule,value,callback)=>{
      let reg =/^[\u4e00-\u9fa5]{2,3}$/
      if(!reg.test(value)){
        callback(new Error('请输入汉字'))
      }else{
        callback()
      }
    }

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
          { required: true, validator: checkName,trigger: "blur" },
          {min:2,max:5,message:"输入长度为2到5的汉字",trigger:"blur"}
        ],
        number: [
          { required: true, validator: checkNumber, trigger: "blur" }
          ],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        majorClass: [
          { required: true, message: "请选择学院专业班级", trigger: "change" }
        ],
        phone: [{ required: true, validator: validPhone, trigger: "blur" }],
         idCard: [
           { required: true, message: '请填写证件号码', trigger: 'blur' },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }
         ],
         address:[{ required: true, message: "请输入家庭住址", trigger: "blur" }],
      },
      options: [
        {
          value: "信息科学与技术学院",
          label: "信息科学与技术学院",
          children: [
            {
              value: "计算机",
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
              value: "电子信息",
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
              value: "信息管理与信息系统",
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
              value: "物联网",
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
              value: "大数据",
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
      show:true

     
    };
  },
  computed: {
    ...mapGetters(["account"])
  },
  created() {
    
    // const hasUserInfo = localStorage.getItem('userInfo')?true:false
    const hasUserInfo = localStorage.getItem('userInfo')
    console.log("aaaaaa"+ hasUserInfo);  //string
    if(hasUserInfo === "undefined"){
      console.log("未填写个人信息")
    }else{
      this.show = false
      this.getStudentById()
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
      addStudent(data).then((res) => {
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
        // 将后台返回的JSON数据存入浏览器localStorage
        localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
         this.$message({
            message: msg,
            type: "success"
          });
          this.show = false
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
      console.log("表单的数据！！！"+JSON.stringify(this.StudentForm));
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
      updateStudent(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) {
        // 将后台返回的学生信息存入浏览器localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
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
    getStudentById(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      console.log("12345",studentId)
      let data = {studentId:studentId}
      getStudentById(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        var list = res.data
        if( code == 200) { 
        // // 将后台返回的JSON数据存入浏览器localStorage
        // localStorage.setItem("userInfo", JSON.stringify(res.data));
         this.$message({
            message: msg,
            type: "success"
          });
          console.log("3333333",res.data)
          // 44444444444 string object
          console.log("44444444444",typeof list.s_college,typeof JSON.parse(list.s_college))
            this.StudentForm.name = list.s_name,
            this.StudentForm.number = list.s_number,
            this.StudentForm.gender = list.s_gender,
            this.StudentForm.age = list.s_age,
            this.StudentForm.majorClass =JSON.parse(list.s_college),
            this.StudentForm.phone = list.s_telephone,
            this.StudentForm.idCard = list.s_idCard,
            this.StudentForm.address = list.s_address
          }else {
            this.$message({
            message: msg,
            type: "error"
          });
            console.log("获取失败！"+msg);
            return false;
          }
      })
    },
    handleChange(value) {
      console.log(value,'dfsd');
      console.log("zzzz"+this.StudentForm.majorClass,Object.prototype.toString.call(this.StudentForm.majorClass));
      // zzzz信息科学与技术学院,计算机,171 [object Array]
      var a = JSON.stringify(this.StudentForm.majorClass)
      // aaaaaa["信息科学与技术学院","计算机","171"] string
      console.log("aaaaaa"+a,typeof a)
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
