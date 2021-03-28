<template>
  <div class="table-container">
    <el-row :gutter="15">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="175px"
      >
        <div class="moral">
          <span>思想品德分(20分)-自评</span>
          <el-col :span="11">
            <el-form-item label="思想政治观念(15分)" prop="sxzzgn">
              <el-input
                v-model="formData.sxzzgn"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="纪律观念(14分)" prop="jlgn">
              <el-input
                v-model="formData.jlgn"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="基础文明修养(13分)" prop="jcwmxy">
              <el-input
                v-model="formData.jcwmxy"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="集体观念(13分)" prop="jtgn">
              <el-input
                v-model="formData.jtgn"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="学生公寓表现(15分)	" prop="xsgybx">
              <el-input
                v-model="formData.xsgybx"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="社会实践(15分)" prop="shsj">
              <el-input
                v-model="formData.shsj"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="奖分+(15分)" prop="sixiangfenjf">
              <el-input
                v-model="formData.sixiangfenjf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="扣分-" prop="sixiangfenkf">
              <el-input
                v-model="formData.sixiangfenkf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="小计(*20%前)" prop="sixiangfenxj">
              <el-input
                v-model="formData.sixiangfenxj"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="思想品德分得分(*20%后)"
              prop="sixiangfen"
              label-width="185px"
            >
              <el-input
                v-model="formData.sixiangfen"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="study" style="margin: 15px 0 0 0">
          <span>学业分(70分)-自评</span>
          <el-col :span="16">
            <el-form-item label="学习成绩(90分)" prop="xxcj">
              <el-input
                v-model="formData.xxcj"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="奖分+(10分)" prop="xueyefenjf">
              <el-input
                v-model="formData.xueyefenjf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="扣分-" prop="xueyefenkf">
              <el-input
                v-model="formData.xueyefenkf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="小计(*70%前)" prop="xyfxiaoji">
              <el-input
                v-model="formData.xyfxiaoji"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="学业分得分(*70%后)" prop="xueyefen">
              <el-input
                v-model="formData.xueyefen"
                
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div class="sport">
          <span>文体表现分(10分)-自评</span>
          <el-col :span="11">
            <el-form-item label="体育课分(60分)" prop="tiyuke">
              <el-input
                v-model="formData.tiyuke"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="文体活动分(10分)" prop="wthd">
              <el-input
                v-model="formData.wthd"
                placeholder="请输入分数"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="奖分+(30分)" prop="wentifenjf">
              <el-input
                v-model="formData.wentifenjf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="扣分-" prop="wentifenkf">
              <el-input
                v-model="formData.wentifenkf"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="小计(*10%前)" prop="wentifenxj">
              <el-input
                v-model="formData.wentifenxj"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="文体表现分得分(*10%后)"
              prop="wentifen"
              label-width="185px"
            >
              <el-input
                v-model="formData.wentifen"
                placeholder="请输入分数"
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="24">
          <el-form-item size="large" style="text-align: center">
            <el-button type="primary" @click="submitForm" v-show="show">提交</el-button>
            <el-button type="primary" @click="updateForm">修改</el-button>
            <el-badge value="new" class="item">
                <el-button @click="dialogVisible = true">审核状态</el-button>
            </el-badge>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>审核状态：{{this.formData.state==null?'未审核':this.formData.state==1?'通过':'未通过'}}</span>
      <span>反馈信息：{{this.formData.beizhu}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { submitComprehensive ,updateComprehensive,selectComprehensiveById} from "@/api/comprehensive";


export default {
  props: [],
  inject:['reload'],
  data() {
    return {
      formData: {
        beizhu:'',
        sxzzgn: '',
        jlgn: '',
        jcwmxy: '',
        jtgn: '',
        xsgybx: '',
        shsj: '',
        sixiangfenjf: '',
        sixiangfenkf: '',
        sixiangfenxj: '',
        sixiangfen: '',
        xxcj: '',
        xueyefenjf: '',
        xueyefenkf: '',
        xyfxiaoji: '',
        xueyefen: '',
        tiyuke: '',
        wthd: '',
        wentifenjf: '',
        wentifenkf: '',
        wentifenxj: '',
        wentifen: '',
      },
      title:"审核结果",
      status:"未审核",
      message:"无",
      dialogVisible:false,
      
      rules: {
        sxzzgn: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        jlgn: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        jcwmxy: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        jtgn: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xsgybx: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        shsj: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        sixiangfenjf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        sixiangfenkf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        sixiangfenxj: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        sixiangfen: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xxcj: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xueyefenjf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xueyefenkf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xyfxiaoji: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        xueyefen: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        tiyuke: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        wthd: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        wentifenjf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        wentifenkf: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        wentifenxj: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
        wentifen: [
          {
            required: true,
            message: "请输入分数",
            trigger: "blur",
          },
        ],
      },
      show:true
    };
  },
  computed: {
    
  },
  watch: {},
  created() {
    const hasUserInfo = localStorage.getItem('userInfo')
    console.log("aaaaaa"+ hasUserInfo);  //string
    if(hasUserInfo === "undefined"){
      console.log("未填写个人信息")
    }else{
      this.show = false
      this.selectComprehensiveById()
    }
  },
  mounted() {},
  methods: {
    submitForm() {
      const sId = JSON.parse(localStorage.getItem('userInfo')).s_id
      this.formData["studentId"]=JSON.stringify(sId)
      console.log("000000000",this.formData.studentId)
      // this.formData['studentId']=sId
      // this.$refs["formData"].append('studentId',sId)
      // console.log("biaodanshuju shi ?",this.formData)
      let data = {
        sxzzgn: this.formData.sxzzgn,
        jlgn:this.formData.jlgn,
        jcwmxy:this.formData.jcwmxy,
        jtgn:this.formData.jtgn,
        xsgybx:this.formData.xsgybx,
        shsj:this.formData.shsj,
        sixiangfenjf:this.formData.sixiangfenjf,
        sixiangfenkf:this.formData.sixiangfenkf,
        sixiangfenxj:this.formData.sixiangfenxj,
        sixiangfen:this.formData.sixiangfen,
        xxcj:this.formData.xxcj,
        xueyefenjf:this.formData.xueyefenjf,
        xueyefenkf:this.formData.xueyefenkf,
        xyfxiaoji:this.formData.xyfxiaoji,
        xueyefen:this.formData.xueyefen,
        tiyuke:this.formData.tiyuke,
        wthd:this.formData.wthd,
        wentifenjf:this.formData.wentifenjf,
        wentifenkf:this.formData.wentifenkf,
        wentifenxj:this.formData.wentifenxj,
        wentifen:this.formData.wentifen,
        studentId:sId,
        zonghefen:Number(this.formData.sixiangfen+this.formData.xueyefen+this.formData.wentifen)
      };
      submitComprehensive(data).then((res)=>{
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
    resetForm() {
      this.$refs["formData"].resetFields();
    },
    updateForm(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      let data = {
        sxzzgn: this.formData.sxzzgn,
        jlgn:this.formData.jlgn,
        jcwmxy:this.formData.jcwmxy,
        jtgn:this.formData.jtgn,
        xsgybx:this.formData.xsgybx,
        shsj:this.formData.shsj,
        sixiangfenjf:this.formData.sixiangfenjf,
        sixiangfenkf:this.formData.sixiangfenkf,
        sixiangfenxj:this.formData.sixiangfenxj,
        sixiangfen:this.formData.sixiangfen,
        xxcj:this.formData.xxcj,
        xueyefenjf:this.formData.xueyefenjf,
        xueyefenkf:this.formData.xueyefenkf,
        xueyefen:this.formData.xueyefen,
        xyfxiaoji:this.formData.xyfxiaoji,
        tiyuke:this.formData.tiyuke,
        wthd:this.formData.wthd,
        wentifenjf:this.formData.wentifenjf,
        wentifenkf:this.formData.wentifenkf,
        wentifenxj:this.formData.wentifenxj,
        wentifen:this.formData.wentifen,
        studentId:studentId,
        zonghefen:Number(this.formData.sixiangfen+this.formData.xueyefen+this.formData.wentifen)
      };
      updateComprehensive(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) {
         this.$message({
            message: msg,
            type: "success"
          });
          this.show=false
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
    selectComprehensiveById(){
      const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      console.log("12345",studentId)
      let data = {studentId:studentId}
      console.log("1111",data)
      selectComprehensiveById(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        // var Comprehensive = res.list
        // this.formData = res.list
        // console.log()
        if(code == 200){
          this.$message({
            message: msg,
            type: "success"
          });
          this.formData = res.list

          // if(Comprehensive.length == 0){
          //   this.show=true
          // }else{
          //   this.show=false
          //   this.formData.sxzzgn = Comprehensive.sxzzgn,
          //   this.formData.jlgn = Comprehensive.jlgn,
          //   this.formData.jcwmxy = Comprehensive.jcwmxy,
          //   this.formData.jtgn = Comprehensive.jtgn,
          //   this.formData.xsgybx = Comprehensive.xsgybx,
          //   this.formData.shsj= Comprehensive.shsj,
          //   this.formData.sixiangfenjf=Comprehensive.sixiangfenjf,
          //   this.formData.sixiangfenkf = Comprehensive.sixiangfenkf,
          //   this.formData.sixiangfenxj = Comprehensive.sixiangfenxj,
          //   this.formData.sixiangfen = Comprehensive.sixiangfen,
          //   this.formData.xxcj = Comprehensive.xxcj,
          //   this.formData.xueyefenjf = Comprehensive.xueyefenjf,
          //   this.formData.xueyefenkf = Comprehensive.xueyefenkf,
          //   this.formData.xueyefen = Comprehensive.xueyefen,
          //   this.formData.xyfxiaoji = Comprehensive.xyfxiaoji,
          //   this.formData.tiyuke = Comprehensive.tiyuke,
          //   this.formData.wthd = Comprehensive.wthd,
          //   this.formData.wentifenjf = Comprehensive.wentifenjf,
          //   this.formData.wentifenkf = Comprehensive.wentifenkf,
          //   this.formData.wentifenxj = Comprehensive.wentifenxj,
          //   this.formData.wentifen = Comprehensive.wentifen
          // }
        }else{
          this.$message({
            message: msg,
            type: "error"
          });
            console.log("获取失败！"+msg);
            return false;
        }
      })
    }
  },
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 1100px;
  max-width: 100%;
  margin: 20px auto;
  overflow: hidden;
  padding: 10px;
}

.moral {
  width: 100%;
  height: 350px;
  padding-bottom: 15px;
}

.study,
.sport {
  width: 100%;
  height: 230px;
  padding-bottom: 15px;
}

span {
  font-size: 25px;
  display: block;
  text-align: center;
}

.item {
  margin-left: 20px;
}
</style>
