<template>
  <div class="app-container">
    <el-form
      ref="applyForm"
      :inline="true"
      :model="applyForm"
      class="applyFrom"
      label-width="300px"
      :rules="rules"
    >
      <div class="title-container">
        <h3 class="title">家庭经济困难学生信息采集</h3>
      </div>

       <el-form-item label="学院-专业-班级：" prop="majorClass">
        <el-cascader
          :options="options"
          placeholder="请选择"
          v-model="applyForm.majorClass"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="姓名：" prop="name">
        <el-input v-model="applyForm.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="学号：" prop="number">
        <el-input v-model="applyForm.number" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        <el-select v-model="applyForm.gender" placeholder="请选择">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>

      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model="applyForm.idCard" placeholder="请输入身份证号" />
      </el-form-item>

      <el-form-item prop="region" label="家庭住址：">
        <el-input
          v-model="applyForm.region"
          placeholder="请输入详细地址"
        />
      </el-form-item>
      <el-form-item prop="telephone" label="联系电话：">
        <el-input v-model="applyForm.telephone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="学生本人是否患重大疾病：" prop="sick">
        <el-select v-model="applyForm.sick" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否特困供养员：" prop="difficultPerson">
        <el-select v-model="applyForm.difficultPerson" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否城镇低收入困难家庭：" prop="difficultFamily">
        <el-select v-model="applyForm.difficultFamily" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否城乡低收入保障户：" prop="security">
        <el-select v-model="applyForm.security" placeholder="请选择">
         <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否建档立卡家庭：" prop="modelCard">
        <el-select v-model="applyForm.modelCard" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否特困职工子女：" prop="difficultChild">
        <el-select v-model="applyForm.difficultChild" placeholder="请选择">
         <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否孤儿：" prop="orphan">
        <el-select v-model="applyForm.orphan" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否优抚对象：" prop="entitledGroup">
        <el-select v-model="applyForm.entitledGroup" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母不能履行抚养义务的儿童：" prop="foster">
        <el-select v-model="applyForm.foster" placeholder="请选择">
         <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否因公牺牲警察子女：" prop="policeChild">
        <el-select v-model="applyForm.policeChild" placeholder="请选择">
         <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="学生本人是否残疾：" prop="disability">
        <el-select v-model="applyForm.disability" placeholder="请选择">
         <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否父母一方抚养：" prop="fosterOne">
        <el-select v-model="applyForm.fosterOne" placeholder="请选择">
          <el-option label="是" value="是" />
          <el-option label="否" value="否" />
        </el-select>
      </el-form-item>
      <el-form-item label="赡养人口数：" prop="support">
        <el-input v-model="applyForm.support" placeholder="请输入大于1的整数" />
      </el-form-item>
      <el-form-item label="赡养老人：" prop="supportOld">
        <el-select v-model="applyForm.supportOld" placeholder="请选择">
          <el-option label="赡养两位以上老人(均70岁以上)" value="赡养两位以上老人(均70岁以上)" />
          <el-option label="赡养两位老人(其中一位70岁以上)" value="赡养两位老人(其中一位70岁以上)" />
          <el-option label="赡养一位老人(70岁以上)" value="赡养一位老人(70岁以上)" />
          <el-option label="其他" value="其他" />
        </el-select>
      </el-form-item>
      <el-form-item label="家庭成员失业人数：" prop="noWork">
        <el-input v-model="applyForm.noWork" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="父母从业情况：" prop="parentWork">
        <el-select v-model="applyForm.parentWork" placeholder="请选择">
          <el-option label="父母均有工作" value="父母均有工作" />
          <el-option label="父母一方没有工作" value="父母一方没有工作" />
          <el-option label="父母双方均没有工作" value="父母双方均没有工作" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母从业情况：" prop="culture">
        <el-select v-model="applyForm.culture" placeholder="请选择">
          <el-option label="父母均为初中及以下文化程度" value="父母均为初中及以下文化程度" />
          <el-option label="父母一方为初中及一下文化程度" value="父母一方为初中及一下文化程度" />
          <el-option label="父母均为高中及以上文化程度" value="父母均为高中及以上文化程度" />
          <el-option label="父母一方为高中及以上文化程度" value="父母一方为高中及以上文化程度" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母年龄：" prop="parentAge">
        <el-select v-model="applyForm.parentAge" placeholder="请选择">
          <el-option label="父母均五十岁以下" value="父母均五十岁以下" />
          <el-option label="父母其中一方五十岁以下" value="父母其中一方五十岁以下" />
          <el-option label="父母均五十岁以上" value="父母均五十岁以上" />
          <el-option label="父母其中一方五十岁以上" value="父母其中一方五十岁以上" />
        </el-select>
      </el-form-item>
      <el-form-item label="劳动力人口数：" prop="workPerson">
        <el-input v-model="applyForm.workPerson" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="家庭人口数：" prop="familyPerson" class="inline">
        <el-input v-model="applyForm.familyPerson" placeholder="请输入" />
        
      </el-form-item>
      <el-form-item label="家庭在读人数：" prop="studyPerson">
        <el-select v-model="applyForm.studyPerson" placeholder="请选择">
          <el-option label="1人在读" value="1人在读" />
          <el-option label="2人(含本人)以上在读" value="2人(含本人)以上在读" />
        </el-select>
        
      </el-form-item>
      <el-form-item label="家庭人均年收入：" prop="yearInput">
        <el-input v-model="applyForm.yearInput" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="附件：">
        <el-input v-model="applyForm.fujianName" placeholder="请上传附件" >
          <el-button slot="append" icon="el-icon-download" @click.native="download"></el-button>
        </el-input>
        <el-tooltip
          class="item"
          effect="dark"
          content="请把所有需要上传的附件文件压缩后上传，命名为：姓名-学院-专业-班级-学号"
          placement="bottom"
        >
          <el-upload
            class="upload"
            action="/uploads/"
            :on-exceed="handleExceed"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            multiple
            :file-list="fileList"
            :limit="1"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-tooltip>

      </el-form-item>

      <el-form-item style="padding:0 300px;margin:0 auto">
        <el-button
          type="primary"
          style="margin:0 30px"
          @click="submitForm('applyForm')"
          v-show="show"
          >提交</el-button
        >

         <el-button
          type="primary"
          style="margin:0 30px"
          @click="updateForm('applyForm')"
          >修改</el-button
        >

        <el-badge value="new" class="item">
                <el-button @click="dialogVisible = true">审核状态</el-button>
            </el-badge>

        
      </el-form-item>
    </el-form>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span class="shenhe">审核状态：{{this.applyForm.state==null?'未审核':this.applyForm.state==1?'审核通过':'审核未通过'}}</span>
      <br>
      <span class="shenhe">反馈信息：{{this.applyForm.beizhu}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {getCardTypeNumber} from "../../utils/validate"
import { addApply,updateApply,searchApplyById} from "@/api/apply";
import { deleteFiles,downloadFile} from "@/api/files";

export default {
  name: "Apply",
  inject:['reload'],
  props: {},
  data() {
    var checkNumber = (rule, value, callback) => {
      const regEn = /^[1-9]\d*$/;
      if (!regEn.test(value)) {
        callback(new Error("正整数"));
      } else {
        callback();
      }
    };
    var checkPerson = (rule, value, callback) => {
      if (value < 1) {
        return callback(new Error("输入大于1的整数"));
      }
    };

    return {
      applyForm: {
        majorClass: [],
        name: "",
        number: "",
        gender: "",
        idCard: "",
        region: "",
        telephone: "",
        sick:"",
        difficultPerson:"",
        difficultFamily:"",
        security:"",
        modelCard:"",
        difficultChild:"",
        orphan:"",
        entitledGroup:"",
        foster:"",
        policeChild:"",
        disability:"",
        fosterOne:"",
        support: "",
        supportOld:"",   
        noWork: "",
        parentWork: "",
        culture:"",
        parentAge:"",
        workPerson: "",
        familyPerson: "",
        studyPerson: "",
        yearInput: "",
        fujian:'',
        fujianName:''
      },
      fileList: [],
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
      rules: {
        // 表单验证
        majorClass: [
          { required: true, message: "请选择学院专业班级", trigger: "change" }
        ],
        name: [{ required: true, message: "必填项", trigger: "blur" }],
        number: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" }
        ],
        gender: [
          { required: true, message: "必填项", trigger: ["blur", "change"] }
        ],
        idCard: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: getCardTypeNumber, trigger: "blur" }
        ],
        region: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        telephone: [{ required: true, message: "必填项", trigger: "blur" }],
        support: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkPerson, trigger: "blur" }
        ],
        nowork: [{ required: true, message: "必填项", trigger: "blur" }],
        workPerson: [{ required: true, message: "必填项", trigger: "blur" }],
        familyPerson: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkPerson, trigger: "blur" }
        ],
        studyPerson: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkPerson, trigger: "blur" }
        ],
        yearInput: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      show:true,
      title:"审核结果",
      dialogVisible:false,
    };
  },
  computed: {},
  created() {
    const hasUserInfo = JSON.parse(localStorage.getItem('userInfo'))
   if(hasUserInfo === "undefined"){
      console.log("未填写个人信息")
    }else{
      this.applyForm.name = hasUserInfo.s_name,
      this.applyForm.number = hasUserInfo.s_number,
      this.applyForm.gender = hasUserInfo.s_gender,
      this.applyForm.majorClass = JSON.parse(hasUserInfo.s_college),
      this.applyForm.idCard = hasUserInfo.s_idCard,
      this.applyForm.region = hasUserInfo.s_address,
      this.applyForm.telephone = hasUserInfo.s_telephone
      this.searchApplyById()
      
    }
  },
  mounted(){
    
  },
  methods: {
    submitForm() {
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      const wenjian = JSON.parse(localStorage.getItem("wenjian"));
      console.log("biadao=fcas",this.applyForm,studentId)
      this.applyForm["studentId"]=studentId
      this.applyForm.fujian=wenjian.path
      this.applyForm.fujianName=wenjian.name
      // this.applyForm["majorClass"]=this.applyForm.majorClass,
      console.log("biadao111111",this.applyForm)
    addApply(this.applyForm).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
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
       })
    },
    updateForm(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      const wenjian = JSON.parse(localStorage.getItem("wenjian"));
      this.applyForm["studentId"]=studentId
      this.applyForm.fujian=wenjian.path
      this.applyForm.fujianName=wenjian.name
      this.applyForm["majorClass"]=JSON.stringify(this.applyForm.majorClass),
      console.log("biadao22222",this.applyForm)
      updateApply(this.applyForm).then((res)=>{
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
            return false;
          }
       })
    },
    searchApplyById(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      let data = {studentId:studentId}
      searchApplyById(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) { 
           this.$message({
            message: msg,
            type: "success"
          });
          this.show = false
          this.applyForm = res.data
          this.applyForm.majorClass = JSON.parse(res.data.majorClass)
          // this.applyForm.fujianName = res.data.fujianName
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
    handleChange(value) {
      console.log(value,'dfsd');
      console.log("zzzz"+this.applyForm.majorClass)
    },
    // 文件限制判断
     handleExceed(files, fileList) {
      this.$message.warning(`只能上传一个压缩包文件`);
    },
    // 移除判断
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 移除文件
    handleRemove(file, fileList) {
      console.log("11111111", file, fileList);
      console.log("2222",file.path)
      this.deleteFile(file.path)
    },
    // 删除图片接口
    deleteFile(path){
      console.log(path,"zzzzz")
      let data ={
        path:path
      }
      deleteFiles(data).then((res)=>{
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
            this.$message({
              message: msg,
              type: "success",
            });
            this.applyForm.fujianName = ''
          } 
      })
    },
    //监听图片上传成功
    handleSuccess(response) {
      //拼接得到图片信息对象
      console.log("chenggong",response)
      const wenjian = { name: response.data.name, path: response.data.path2 };
      //将文件信息存入浏览器localStorage
      localStorage.setItem("wenjian", JSON.stringify(wenjian));
      console.log("图片信息：" + wenjian);
      this.applyForm.fujianName = response.data.name
      //将图片信息对象，push到pics数组中
      this.fileList.push(wenjian);
      console.log("图片信息：" + this.fileList);
    },
    // 下载文件
    download(){
      const wenjian = JSON.parse(localStorage.getItem("wenjian"));
      let data ={
        url:wenjian.path,
        filename:wenjian.name
      }
      downloadFile(data).then((res)=>{
        console.log("下载")
      })
    }
  }
};
</script>

<style scoped>
.app-container {
  min-height: 100%;
  width: 100%;
}
.line {
  text-align: center;
}

.inline {
  display: inline-block;
}

.applyForm {
  position: relative;
  width: 920px;
  max-width: 100%;
  padding: 20pxpx 35px 0;
  margin: 0 auto;
  overflow: hidden;
}

.title {
  font-size: 26px;
  margin: 0px auto 20px auto;
  text-align: center;
  font-weight: bold;
}

el-input {
  margin: 0 20px;
}
</style>
