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
                @click="getsixiangfenxj"
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
            <el-form-item label="小计(*20%前)" prop="xyfxiaoji">
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
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      formData: {
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
    };
  },
  computed: {
    
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      const sId = JSON.parse(localStorage.getItem('userInfo')).s_id
      
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    getsixiangfenxj(){
      this.formData.sixiangfenxj = this.formData.sxzzgn+this.formData.jlgn+this.formData.jcwmxy+this.formData.jtgn+this.formData.xsgybx+this.formData.shsj+this.formData.sixiangfenjf-this.formData.sixiangfenkf
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
</style>
