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
      <el-form-item label="学院：" prop="collage">
        <el-input v-model="applyForm.collage" placeholder="请输入学院" />
      </el-form-item>
      <el-form-item label="专业班级：" prop="class">
        <el-select v-model="applyForm.class" placeholder="请选择">
          <el-option label="信管171" value="1" />
          <el-option label="计算机172" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="applyForm.name" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="学号：" prop="sno">
        <el-input v-model="applyForm.sno" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="身份证类型：" prop="idcardType">
        <el-select v-model="applyForm.idcardType" placeholder="请选择">
          <el-option label="居民身份证" value="0" />
          <el-option label="港澳证" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="身份证号：" prop="idCard">
        <el-input v-model="applyForm.idCard" placeholder="请输入身份证号" />
      </el-form-item>

      <el-form-item prop="registeredDetails" label="家庭住址：">
        <el-input
          v-model="applyForm.registeredDetails"
          placeholder="请输入详细地址"
        />
      </el-form-item>
      <el-form-item prop="phone" label="联系电话：">
        <el-input v-model="applyForm.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="学生本人是否患重大疾病：" prop="sick">
        <el-select v-model="applyForm.sick" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否特困供养员：" prop="difficultPerson">
        <el-select v-model="applyForm.difficultPerson" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否城镇低收入困难家庭：" prop="difficultFamily">
        <el-select v-model="applyForm.difficultFamily" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否城乡低收入保障户：" prop="security">
        <el-select v-model="applyForm.security" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否建档立卡家庭：" prop="modelCard">
        <el-select v-model="applyForm.modelCard" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否特困职工子女：" prop="difficultChild">
        <el-select v-model="applyForm.difficultChild" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否孤儿：" prop="orphan">
        <el-select v-model="applyForm.orphan" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否优抚对象：" prop="entitledGroup">
        <el-select v-model="applyForm.entitledGroup" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母不能履行抚养义务的儿童：" prop="foster">
        <el-select v-model="applyForm.foster" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否因公牺牲警察子女：" prop="policeChild">
        <el-select v-model="applyForm.policeChild" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="学生本人是否残疾：" prop="disability">
        <el-select v-model="applyForm.disability" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否父母一方抚养：" prop="fosterOne">
        <el-select v-model="applyForm.fosterOne" placeholder="请选择">
          <el-option label="是" value="0" />
          <el-option label="否" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="赡养人口数：" prop="support">
        <el-input v-model="applyForm.support" placeholder="请输入大于1的整数" />
      </el-form-item>
      <el-form-item label="赡养老人：" prop="supportOld">
        <el-select v-model="applyForm.supportOld" placeholder="请选择">
          <el-option label="赡养两位以上老人(均70岁以上)" value="0" />
          <el-option label="赡养两位老人(其中一位70岁以上)" value="1" />
          <el-option label="赡养一位老人(70岁以上)" value="2" />
          <el-option label="其他" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="家庭成员失业人数：" prop="noWork">
        <el-input v-model="applyForm.noWork" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="父母从业情况：" prop="parentWork">
        <el-select v-model="applyForm.parentWork" placeholder="请选择">
          <el-option label="父母均有工作" value="0" />
          <el-option label="父母一方没有工作" value="1" />
          <el-option label="父母双方均没有工作" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母从业情况：" prop="culture">
        <el-select v-model="applyForm.culture" placeholder="请选择">
          <el-option label="父母均为初中及以下文化程度" value="0" />
          <el-option label="父母一方为初中及一下文化程度" value="1" />
          <el-option label="父母均为高中及以上文化程度" value="2" />
          <el-option label="父母一方为高中及以上文化程度" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="父母年龄：" prop="parentAge">
        <el-select v-model="applyForm.parentAge" placeholder="请选择">
          <el-option label="父母均五十岁以下" value="0" />
          <el-option label="父母其中一方五十岁以下" value="1" />
          <el-option label="父母均五十岁以上" value="2" />
          <el-option label="父母其中一方五十岁以上" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label="劳动力人口数：" prop="workPerson">
        <el-input v-model="applyForm.workPerson" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="家庭人口数：" prop="familyPerson" class="inline">
        <el-input v-model="applyForm.familyPerson" placeholder="请输入" />
        <el-tooltip
          class="item"
          effect="dark"
          content="请上传户口本图片信息(放在word文档备注好一并上传)"
          placement="bottom"
        >
          <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="家庭在读人数：" prop="studyPerson">
        <el-select v-model="applyForm.studyPerson" placeholder="请选择">
          <el-option label="1人在读" value="0" />
          <el-option label="2人(含本人)以上在读" value="1" />
        </el-select>
        <el-tooltip
          class="item"
          effect="dark"
          content="请上传在读学生的学生证明(放在word文档备注好一并上传)"
          placement="bottom"
        >
          <el-upload
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="1"
          >
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="家庭人均年收入：" prop="yearInput">
        <el-input v-model="applyForm.yearInput" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="附件：">
        <el-upload
          class="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :limit="1"
        >
          <el-button size="small" type="primary">上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item style="padding:0 300px;margin:0 auto">
        <el-button
          type="primary"
          style="margin:0 30px"
          @click="submitForm('applyForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('applyForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Apply",
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
    var checkIdCard = (rule, value, callback) => {
      const regEn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!regEn.test(value)) {
        callback(new Error("请输入正确身份证"));
      } else {
        // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
        // 下面分别分析出生日期和校验位
        let num = value.toUpperCase();
        const len = num.length;
        if (len === 15) {
          const re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
          const arrSplit = num.match(re); // 检查生日日期是否正确
          const dtmBirth = new Date(
            "19" + arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
          );
          const bGoodDay =
            dtmBirth.getYear() === Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
            dtmBirth.getDate() === Number(arrSplit[4]);
          if (!bGoodDay) {
            callback(new Error("请输入正确身份证"));
          } else {
            // 将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
            const arrInt = [
              7,
              9,
              10,
              5,
              8,
              4,
              2,
              1,
              6,
              3,
              7,
              9,
              10,
              5,
              8,
              4,
              2
            ];
            const arrCh = [
              "1",
              "0",
              "X",
              "9",
              "8",
              "7",
              "6",
              "5",
              "4",
              "3",
              "2"
            ];
            var nTemp = 0;
            var i;
            num = num.substr(0, 6) + "19" + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            callback();
          }
        }
        if (len === 18) {
          const re = new RegExp(
            /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/
          );
          const arrSplit = num.match(re); // 检查生日日期是否正确
          const dtmBirth = new Date(
            arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]
          );
          // let bGoodDay
          const bGoodDay =
            dtmBirth.getFullYear() === Number(arrSplit[2]) &&
            dtmBirth.getMonth() + 1 === Number(arrSplit[3]) &&
            dtmBirth.getDate() === Number(arrSplit[4]);
          if (!bGoodDay) {
            callback(new Error("请输入正确身份证"));
          } else {
            // 检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10
            // let valnum
            const arrInt = [
              7,
              9,
              10,
              5,
              8,
              4,
              2,
              1,
              6,
              3,
              7,
              9,
              10,
              5,
              8,
              4,
              2
            ];
            const arrCh = [
              "1",
              "0",
              "X",
              "9",
              "8",
              "7",
              "6",
              "5",
              "4",
              "3",
              "2"
            ];
            // var nTemp = 0; var i
            for (i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
            }
            const valnum = arrCh[nTemp % 11];
            if (!isNaN(num.substr(17, 1))) {
              callback();
            }
            if (valnum !== num.substr(17, 1)) {
              callback(new Error("请输入正确身份证"));
            }
          }
        }
      }
    };
    var checkPerson = (rule, value, callback) => {
      if (value < 1) {
        return callback(new Error("输入大于1的整数"));
      }
    };

    return {
      applyForm: {
        collage: "",
        class: "",
        name: "",
        sno: "",
        idcardType: "",
        idCar: "",
        registeredDetails: "",
        phone: "",
        support: "",
        nowork: "",
        noWork: "",
        workPerson: "",
        familyPerson: "",
        studyPerson: "",
        yearInput: ""
      },
      formData: new FormData(),
      rules: {
        // 表单验证
        collage: [
          { required: true, message: "必填项", trigger: ["blur", "change"] }
        ],
        class: [
          { required: true, message: "必填项", trigger: ["blur", "change"] }
        ],
        name: [{ required: true, message: "必填项", trigger: "blur" }],
        sno: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkNumber, trigger: "blur" }
        ],
        idcardType: [
          { required: true, message: "必填项", trigger: ["blur", "change"] }
        ],
        idCard: [
          { required: true, message: "必填项", trigger: "blur" },
          { validator: checkIdCard, trigger: "blur" }
        ],
        registeredDetails: [
          { required: true, message: "必填项", trigger: "blur" }
        ],
        phone: [{ required: true, message: "必填项", trigger: "blur" }],
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
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    handleChange(value) {},
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
    }
    // 上传重点人员信息
    // onSubmit: function() {
    //   const that = this
    //   that.formData = new FormData()
    //   // that.rules.file = [{ required: true, message: '请上传图片' }]
    //   if (that.dialogType !== 'add' && !this.doUpload) {
    //     that.rules.file = []
    //     that.$refs['uploadElement'].clearValidate()
    //   }
    //   that.$refs['addKeyPersonForm'].validate((valid) => {
    //     if (valid) {
    //       that.formData.append('name', that.addKeyPersonForm.name)
    //       if (that.addKeyPersonForm.sex === '男') {
    //         that.addKeyPersonForm.sex = 1
    //       } else if (that.addKeyPersonForm.sex === '女') {
    //         that.addKeyPersonForm.sex = 2
    //       }
    //       that.formData.append('sex', that.addKeyPersonForm.sex)
    //       that.formData.append('age', that.addKeyPersonForm.age)
    //       that.formData.append('idCard', that.addKeyPersonForm.idCard)
    //       that.formData.append('nationlity', that.addKeyPersonForm.nationlity)
    //       that.formData.append('plateNumber', that.addKeyPersonForm.plateNumber)
    //       that.formData.append('userType', that.addKeyPersonForm.userType)
    //       that.formData.append('longitude', that.addKeyPersonForm.longitude)
    //       that.formData.append('latitude', that.addKeyPersonForm.latitude)
    //       that.formData.append('registered', that.addKeyPersonForm.registered.join('-'))
    //       that.formData.append('registeredDetails', that.addKeyPersonForm.registeredDetails)
    //       that.formData.append('domicile', that.addKeyPersonForm.domicile.join('-'))
    //       that.formData.append('domicileDetails', that.addKeyPersonForm.domicileDetails)
    //       that.formData.append('problem', that.addKeyPersonForm.problem)
    //       that.formData.append('measure', that.addKeyPersonForm.measure)
    //       that.formData.append('controller', JSON.stringify(that.addKeyPersonForm.controller))
    //       that.formData.append('remark', that.addKeyPersonForm.remark)
    //       if (that.dialogType === 'add') {
    //         that.$refs.uploadxls.submit() // 提交时触发了before-upload函数
    //         that.doSubmitFlag = true
    //         axiosControl.saveNewKeyPerson(that.formData)
    //           .then(res => {
    //             that.doSubmitFlag = false
    //             if (res.data.code === 200) {
    //               that.$message({
    //                 type: 'success',
    //                 message: '添加成功'
    //               })
    //               that.$refs.addKeyPersonForm.dialogImageUrl = 'none'
    //               that.$refs.uploadxls.clearFiles()
    //               that.$refs.addKeyPersonForm.resetFields()
    //               that.fileName = ''
    //               that.uploadForm = new FormData()
    //               that.$emit('savePersonSuccess')
    //             } else {
    //               that.$message.error({
    //                 message: res.data.message
    //               })
    //             }
    //           })
    //           /* .catch(err => {
    //             that.$message.error({
    //               message: err
    //             })
    //           }) */
    //       } else {
    //         if (!that.doUpload) {
    //           that.formData.append('iconUrl', that.addKeyPersonForm.iconUrl)
    //         }
    //         // 还要传id
    //         that.formData.append('id', that.addKeyPersonForm.id)
    //         that.doSubmitFlag = true
    //         axiosControl.saveEditKeyPerson(that.formData)
    //           .then(res => {
    //             that.doSubmitFlag = false
    //             if (res.data.code === 200) {
    //               that.$message({
    //                 type: 'success',
    //                 message: '添加成功'
    //               })
    //               that.$refs.addKeyPersonForm.dialogImageUrl = 'none'
    //               that.$refs.uploadxls.clearFiles()
    //               that.$refs.addKeyPersonForm.resetFields()
    //               that.fileName = ''
    //               that.uploadForm = new FormData()
    //               that.$emit('savePersonSuccess')
    //             } else {
    //               that.$message.error({
    //                 message: res.data.message
    //               })
    //             }
    //           })
    //       }
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: '请填写正确格式'
    //       })
    //       return false
    //     }
    //   })
    // }
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
