<template>
  <div class="dashboard-container">
    <el-form
      ref="StudentForm"
      :model="StudentForm"
      class="studentFrom"
      label-width="150px"
      :rules="rules"
    >
      <div class="dashboard-text">{{ name }}个人信息录入</div>

      <el-form-item label="姓名：" prop="name">
        <el-input v-model="StudentForm.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-select v-model="StudentForm.sex" placeholder="请选择">
          <el-option label="男" value="1" />
          <el-option label="女" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="年龄：" prop="age">
        <el-input v-model="StudentForm.age" placeholder="请输入年龄" />
      </el-form-item>
      <el-form-item label="学号：" prop="sno">
        <el-input
          ref="sno"
          v-model="StudentForm.sno"
          placeholder="请输入学号"
          type="text"
          auto-complete="off"
        />
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('StudentForm')"
          >录入</el-button
        >
        <el-button @click="resetForm('StudentForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkSno = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("学号不能为空"));
      }
    };
    return {
      StudentForm: {
        name: "",
        sex: "",
        age: "",
        sno: "",
        majorClass: []
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        majorClass: [
          { required: true, message: "请选择学院专业班级", trigger: "change" }
        ],
        sno: [{ required: true, validator: checkSno, trigger: "blur" }]
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
      ]
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  methods: {
    submitForm(formName) {
      console.log("12345");
      this.$refs[formName].validate(valid => {
        console.log("1111111111");
        if (valid) {
          alert("submit!");
          this.$message({
            message: "录入成功",
            type: "success"
          });
        } else {
          console.log("录入失败！");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
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
