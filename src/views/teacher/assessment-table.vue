<template>
  <div id="app-container">
    <div class="filter-container">
      <el-cascader
        :options="options"
        placeholder="请选择学院-专业-班级"
        v-model="listQuery.majorClass"
        :props="{ expandTrigger: 'hover' }"
        style="margin-right: 15px"
      ></el-cascader>
    
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 130px"
        class="filter-item"
      />

      <el-input
        v-model="listQuery.number"
        placeholder="学号"
        style="width: 130px"
        class="filter-item"
      />

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleSearch"
      >
        搜索
      </el-button>

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="handlerefresh"
      >
        刷新
      </el-button>

       <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click.native="handleDownload"
      >
        导出
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="ComprehensiveList"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >

    <el-table-column type="selection" align="center" />

      <el-table-column label="ID" prop="s_id" align="center" width="80">
        <template slot-scope="{ row }">
          <span>{{ row.s_id }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="学号"
        prop="s_number"
        width="150px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.s_number }}</span>
          <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="s_name" min-width="130px">
        <template slot-scope="{ row }">
          <span>{{ row.s_name }}</span>
          <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag>  -->
        </template>
      </el-table-column>

      <el-table-column
        label="学院"
        prop="s_college"
        width="200px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.s_college ? row.s_college[0] : "" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="专业" prop="s_grade" width="160px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.s_college ? row.s_college[1] : "" }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" prop="s_class" width="80px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.s_college ? row.s_college[2] : "" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="思想分"
        prop="sixiangfen"
        width="80px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.sixiangfen }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="学业分"
        prop="xueyefen"
        width="80px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.xueyefen }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="文体分"
        prop="wentifen"
        width="80px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ row.wentifen }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="综合分"
        prop="zonghefen"
        width="120px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span>{{ Number(row.zonghefen) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="排名" prop="rowno" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.rowno }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生自评" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click.native="watchStudent(row.s_id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column label="奖扣分细则" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click.native="watchContent(row.s_id)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="等级"
        width="200px"
        align="center"
        prop="dengji"
      >
      <!-- :render-header="renderHeader" -->

      <template slot="header" v-show="show">
          <span>等级</span>
          <i class="el-icon-refresh-right" @click="handleUpdate" style="color:blue" ></i>
        </template>

        <template slot-scope="{ row }">
          <el-button type="text" size="mini">
            {{ row.dengji ? row.dengji : "无" }}
          </el-button>
          <el-button
            icon="el-icon-edit"
            size="mini"
            round
            @click.native="updateLevel(row)"
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="审核情况"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            v-if="row.state == '0' || row.state == null"
            @click.native="state(row)"
          >
            未审核
          </el-button>
          <el-button
            type="success"
            size="mini"
            v-if="row.state == '1'"
            @click.native="state(row)"
          >
            通过审核
          </el-button>
          <el-button
            type="info"
            size="mini"
            v-if="row.state == '2'"
            @click.native="state(row)"
          >
            拒绝通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div id="pagepos">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="currentPage"
        :total="totalPage"
      >
      </el-pagination>
    </div>

    <!-- 学生自评表 -->
    <el-dialog title="学生自评分数详情" :visible.sync="dialogTableVisible">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        style="width: 100%"
      >
        <el-table-column prop="content" label="内容" width="100">
        </el-table-column>
        <el-table-column prop="sort" label="分数类别"> </el-table-column>
        <el-table-column prop="score" label="分数"> </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 综合测评审核表单 -->
    <el-dialog title="审核信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="学生姓名" label-width="200px">
          {{ studentlist.s_name }}
        </el-form-item>
        <el-form-item label="获奖情况" label-width="200px">
          {{ studentlist.dengji ? studentlist.dengji : "无" }}
        </el-form-item>
        <el-form-item label="备注" label-width="200px">
          <el-input v-model="beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="stateok(1)">通过</el-button>
        <el-button type="primary" @click="stateok(2)">拒绝</el-button>
      </div>
    </el-dialog>

    <!-- 等级改变表单 -->
    <el-dialog title="审核信息" :visible.sync="dialogDengJiFormVisible">
      <el-form>
        <el-form-item label="学生姓名" label-width="150px">
          {{ studentlist.s_name }}
        </el-form-item>
        <el-form-item label="获奖情况" label-width="150px">
          <el-select placeholder="请选择" v-model="dengji">
            <el-option label="一等奖" value="一等奖" />
            <el-option label="二等奖" value="二等奖" />
            <el-option label="三等奖" value="三等奖" />
            <el-option label="无" value="无" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDengJiFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="levelChange">确定</el-button>
      </div>
    </el-dialog>

    <!-- 奖扣分细则弹窗 -->
    <el-dialog title="奖扣分细则" :visible.sync="dialogTableVisible1">
      <el-table :data="tableData1" style="margin: 10px 0">
        <el-table-column
          prop="activityType"
          label="活动类型"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="activityName"
          label="活动名称"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="activityNum"
          label="分数"
          width="80"
        ></el-table-column>
        <el-table-column prop="activityProofPic" label="图片证明" width="150">
          <template slot-scope="{ row }">
            <a @click="Proofshow(row.activityProofPath)">
              {{ row.activityProofPic }}
            </a>
          </template>
        </el-table-column>
      </el-table>
      <el-form>
        <el-form-item label="审核备注：" label-width="120px">
          <el-input v-model="beizhu1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible1 = false">取 消</el-button>
        <el-button type="primary" @click.native="statejk(1)">通过</el-button>
        <el-button type="primary" @click.native="statejk(2)">拒绝</el-button>
      </div>
    </el-dialog>

    <!-- 图片预览窗口 -->
    <el-dialog title="图片预览" :visible.sync="previewVisiblePic" width="80%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>
  </div>
</template>

<script>
import {
  selectComprehensiveById,
  updateComprehensive,
  ComprehensiveList,
  selectComprehensive,
  updateLevel,
} from "@/api/comprehensive";
// import { getAllStudent ,StudentList} from '@/api/student'
import { searchProof, updateProof } from "@/api/activityProof";
const { export_json_to_excel } = require('@/vendor/Export2Excel');


export default {
  name: "ComplexTable",
  inject: ["reload"],
  data() {
    return {
      listLoading: true,
      listQuery: {
        majorClass: [],
        name: "",
        number: "",
      },
      beizhu: null, //审批备注
      beizhu1: null, //奖扣分备注
      ComprehensiveList: [],
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
                  label: "171班",
                },
                {
                  value: "172",
                  label: "172班",
                },
                {
                  value: "173",
                  label: "173班",
                },
                {
                  value: "174",
                  label: "174班",
                },
              ],
            },
            {
              value: "电子信息",
              label: "电子信息",
              children: [
                {
                  value: "171",
                  label: "171班",
                },
                {
                  value: "172",
                  label: "172班",
                },
                {
                  value: "173",
                  label: "173班",
                },
                {
                  value: "174",
                  label: "174班",
                },
              ],
            },
            {
              value: "信息管理与信息系统",
              label: "信息管理与信息系统",
              children: [
                {
                  value: "171",
                  label: "171班",
                },
                {
                  value: "172",
                  label: "172班",
                },
                {
                  value: "173",
                  label: "173班",
                },
                {
                  value: "174",
                  label: "174班",
                },
              ],
            },
            {
              value: "物联网",
              label: "物联网",
              children: [
                {
                  value: "171",
                  label: "171班",
                },
                {
                  value: "172",
                  label: "172班",
                },
                {
                  value: "173",
                  label: "173班",
                },
              ],
            },
            {
              value: "大数据",
              label: "大数据",
              children: [
                {
                  value: "171",
                  label: "171班",
                },
                {
                  value: "172",
                  label: "172班",
                },
                {
                  value: "173",
                  label: "173班",
                },
                {
                  value: "174",
                  label: "174班",
                },
                {
                  value: "175",
                  label: "175班",
                },
              ],
            },
          ],
        },
      ],
      // collageOptions: ["信科院", "管院", "艺设"],
      // classOptions: ["计算机171", "信管171", "物联网182"],
      dialogTableVisible: false, //学生自评表
      dialogTableVisible1: false, //奖扣分细则弹窗
      previewVisiblePic: false, //图片预览弹窗
      //图片地址
      previewPath: "",
      tableData: [
        {
          content: "思想分",
          sort: "思想政治观念(15分)",
          // score: this.comprehensive.sxzzgn,
          score: "",
        },
        {
          content: "思想分",
          sort: "纪律观念(14分)",
          // score: this.comprehensive.jlgn,
          score: "",
        },
        {
          content: "思想分",
          sort: "基础文明修养(13分)",
          // score: this.comprehensive.jcwmxy,
          score: "",
        },
        {
          content: "思想分",
          sort: "集体观念(13分)",
          // score:this.comprehensive.jtgn,
          score: "",
        },
        {
          content: "思想分",
          sort: "学生公寓表现(15分)",
          // score:this.comprehensive.xsgybx,
          score: "",
        },
        {
          content: "思想分",
          sort: "社会实践(15分)",
          // score:this.comprehensive.shsj,
          score: "",
        },
        {
          content: "思想分",
          sort: "奖分+(15分)",
          // score:this.comprehensive.sixiangfenjf,
          score: "",
        },
        {
          content: "思想分",
          sort: "扣分-",
          // score: this.comprehensive.sixiangfenkf,
          score: "",
        },
        {
          content: "思想分",
          sort: "小计(*20%前)",
          // score:this.comprehensive.sixiangfenxj,
          score: "",
        },
        {
          content: "思想分",
          sort: "思想品德分得分(*20%后)",
          // score:this.comprehensive.sixiangfen,
          score: "",
        },

        {
          content: "学业分",
          sort: "学习成绩(90分)",
          // score: this.comprehensive.xxcj,
          score: "",
        },
        {
          content: "学业分",
          sort: "奖分+(10分)",
          // score:this.comprehensive.xueyefenjl,
          score: "",
        },
        {
          content: "学业分",
          sort: "扣分-",
          // score: this.comprehensive.xueyefenkf,
          score: "",
        },
        {
          content: "学业分",
          sort: "小计(*20%前)",
          // score: this.comprehensive.xueyefenxj,
          score: "",
        },
        {
          content: "学业分",
          sort: "学业分得分(*70%后)",
          // score: this.comprehensive.xueyefen,
          score: "",
        },
        {
          content: "文体分",
          sort: "体育课分(60分)",
          // score: this.comprehensive.tiyuke,
          score: "",
        },
        {
          content: "文体分",
          sort: "文体活动分(10分)",
          // score: this.comprehensive.wthd,
          score: "",
        },
        {
          content: "文体分",
          sort: "奖分+(30分)",
          // score: this.comprehensive.wentifenjf,
          score: "",
        },
        {
          content: "文体分",
          sort: "扣分-",
          // score: this.comprehensive.wentifenkf,
          score: "",
        },
        {
          content: "文体分",
          sort: "小计(*10%前)",
          // score: this.comprehensive.wentifenxj,
          score: "",
        },

        {
          content: "文体分",
          sort: "文体分得分(*10%后)",
          // score: this.comprehensive.wentifen,
          score: "",
        },
      ],
      comprehensive: {
        sxzzgn: "11",
        jlgn: "",
        jcwmxy: "",
        jtgn: "",
        xsgybx: "",
        shsj: "",
        sixiangfenjf: "",
        sixiangfenkf: "",
        sixiangfenxj: "",
        sixiangfen: "",
        xxcj: "",
        xueyefenjf: "",
        xueyefenkf: "",
        xyfxiaoji: "",
        xueyefen: "",
        tiyuke: "",
        wthd: "",
        wentifenjf: "",
        wentifenkf: "",
        wentifenxj: "",
        wentifen: "",
        zonghefen: "",
      },
      pageNo: 1, //表格页码
      pageCount: 10, //数据数
      currentNo: 1, //当前页码
      allData: [], //全部数据
      totalPage: 1, //总页码
      studentlist: {}, //学生详情
      dialogFormVisible: false, //综合测评审核表单
      dialogDengJiFormVisible: false, //等级修改
      dengji: "", //等级
      tableData1: [], //奖扣分细则
      studentId: "",
      downloadLoading:false,
      multipleSelection: [],
      show:true
    };
  },
  created() {
    this.getComprehensiveList();
    this.getPageTotal();
  },
  methods: {
    // 获取数据
    getComprehensiveList(index) {
      this.listLoading = true;
      this.pageNo = index || this.pageNo;
      console.log("当前页面是第几页？" + this.pageNo);
      let data = {
        page: this.pageNo,
        pageSize: this.pageCount,
      };
      console.log("页面个数！" + this.pageCount);
      ComprehensiveList(data)
        .then((res) => {
          console.log("分页的数据" + res.data);
          res.data.map((val) => {
            if (val.s_college) {
              val.s_college = JSON.parse(val.s_college);
            }
          });
          this.ComprehensiveList = res.data;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //当前页数据
    currentPage(currentPage) {
      console.log("页面！！！！" + currentPage);
      this.currentNo = currentPage;
      console.log("当前页数据" + this.currentNo);
      this.getComprehensiveList(this.currentNo);
    },
    //获取总页数
    getPageTotal() {
      this.listLoading = true;
      ComprehensiveList()
        .then((res) => {
          console.log("msgggg" + res.msg);
          this.allData = res.data;
          this.totalPage = Math.ceil(this.allData.length / this.pageCount) * 10;
          console.log("获取总页数" + this.totalPage);
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 查看学生自评的数据
    watchStudent(s_id) {
      console.log(s_id, "1111111");
      // this.dialogTableVisible = true;
      this.selectComprehensive(s_id);
    },
    // 学生自评的分数
    selectComprehensive(studentId) {
      let data = { studentId: studentId };
      selectComprehensiveById(data).then((res) => {
        this.comprehensive = res.list;
        console.log(this.comprehensive, "123456");
        // var count = -1;
        // for(var key in this.comprehensive){
        //   count++;
        //   console.log(key,this.comprehensive[key])
        //   for(let i = count;i<this.tableData.length;){
        //     this.tableData[i].score=this.comprehensive[key]
        //   }
        // }
        this.tableData[0].score = this.comprehensive.sxzzgn;
        this.tableData[1].score = this.comprehensive.jlgn;
        this.tableData[2].score = this.comprehensive.jcwmxy;
        this.tableData[3].score = this.comprehensive.jtgn;
        this.tableData[4].score = this.comprehensive.xsgybx;
        this.tableData[5].score = this.comprehensive.shsj;
        this.tableData[6].score = this.comprehensive.sixiangfenjf;
        this.tableData[7].score = this.comprehensive.sixiangfenkf;
        this.tableData[8].score = this.comprehensive.sixiangfenxj;
        this.tableData[9].score = this.comprehensive.sixiangfen;
        this.tableData[10].score = this.comprehensive.xxcj;
        this.tableData[11].score = this.comprehensive.xueyefenjf;
        this.tableData[12].score = this.comprehensive.xueyefenkf;
        this.tableData[13].score = this.comprehensive.xyfxiaoji;
        this.tableData[14].score = this.comprehensive.xueyefen;
        this.tableData[15].score = this.comprehensive.tiyuke;
        this.tableData[16].score = this.comprehensive.wthd;
        this.tableData[17].score = this.comprehensive.wentifenjf;
        this.tableData[18].score = this.comprehensive.wentifenkf;
        this.tableData[19].score = this.comprehensive.wentifenxj;
        this.tableData[20].score = this.comprehensive.wentifen;

        this.getRowSpan();
        this.dialogTableVisible = true;
      });
    },
    // 获取合并的数组
    getRowSpan() {
      this.rowSpanArr = [];
      this.tableData.forEach((item, index) => {
        if (index == 0) {
          this.rowSpanArr.push(1);
          this.position = 0;
        } else {
          if (
            this.tableData[index].content == this.tableData[index - 1].content
          ) {
            this.rowSpanArr[this.position] += 1; //项目名称相同，合并到同一个数组中
            this.rowSpanArr.push(0);
            this.tableData[index].content = this.tableData[index - 1].content;
          } else {
            this.rowSpanArr.push(1);
            this.position = index;
          }
        }
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 只合并区域位置
      if (columnIndex === 0) {
        const _row = this.rowSpanArr[rowIndex];
        return {
          rowspan: _row, //行
          colspan: 1, //列
        };
      }
    },
    // 奖扣分弹窗获取数据
    watchContent(s_id) {
      console.log("查看奖扣分细则，跳转到属于该学生的奖扣分页面");
      this.searchProofById(s_id);
    },
    // 查找学生奖扣分详情
    searchProofById(studentId) {
      let data = { studentId: studentId };
      searchProof(data).then((res) => {
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.tableData1 = res.data;
          this.studentId = studentId;
          console.log("1111", studentId, "2222", this.studentId);
          this.dialogTableVisible1 = true;
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
          console.log("获取失败！" + msg);
          return false;
        }
      });
    },
    // 查找
    handleSearch() {
      this.listLoading = true;
      let data = {
        s_name: this.listQuery.name,
        s_number: this.listQuery.number,
        s_college: JSON.stringify(this.listQuery.majorClass),
        page: this.pageNo,
        pageSize: this.pageCount,
      };
      selectComprehensive(data)
        .then((res) => {
          console.log("查询的数据：" + res.data);
          res.data.map((val) => {
            if (val.s_college) {
              val.s_college = JSON.parse(val.s_college);
            }
            // console.log(  val ,'  res.data   res.data ')
            // this.$set(val,'s_college',JSON.parse(val.s_college))
            // val.s_college=JSON.parse(val.s_college)
          });
          this.ComprehensiveList = res.data;
          this.totalPage = Math.ceil(this.ComprehensiveList.length / this.pageCount) * 10;
          this.listLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 重置
    handlerefresh() {
      this.listQuery.majorClass = [];
      this.listQuery.name = "";
      this.listQuery.number = "";
      this.getComprehensiveList();
      this.getPageTotal();
    },
    state(v) {
      //   const studentId = JSON.parse(localStorage.getItem('userInfo')).s_id
      //  this.$set(v,'studentId',v.s_id)
      //    this.$set(v,'s_college',JSON.stringify(v.s_college))
      //  this.$set(v,'state',1)
      this.studentlist = v;
      this.dialogFormVisible = true;
    },
    // 综合测评状态
    stateok(sum) {
      let data = {
        studentId: this.studentlist.s_id,
        state: sum,
        beizhu: this.beizhu,
      };
      updateComprehensive(data).then((res) => {
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.dialogFormVisible = false;
          // this.getPageTotal()
          this.reload();
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
          console.log("修改失败！" + msg);
        }
      });
    },
    // 预览奖扣分
    Proofshow(path) {
      console.log("1111" + path);
      this.previewVisiblePic = true;
      this.previewPath = "http://localhost:3000/" + path;
    },
    statejk(num) {
      console.log("状态：" + num);
      let data = {
        studentId: this.studentId,
        state: num,
        beizhu: this.beizhu1,
      };
      updateProof(data).then((res) => {
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.dialogFormVisible = false;
          this.reload();
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
          console.log("修改失败！" + msg);
        }
      });
    },
    // 修改等级
    updateLevel(v) {
      this.studentlist = v;
      this.dialogDengJiFormVisible = true;
    },
    levelChange() {
      let data = {
        studentId: this.studentlist.s_id,
        dengji: this.dengji,
      };
      updateComprehensive(data).then((res) => {
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.dialogFormVisible = false;
          // this.getPageTotal()
          this.reload();
        } else {
          this.$message({
            message: msg,
            type: "error",
          });
          console.log("修改失败！" + msg);
        }
      });
    },
    // 刷新等级
    handleUpdate() {
      console.log("刷新等级");
      let data = {
        page: this.pageNo,
        pageSize: this.pageCount,
      };
      updateLevel(data).then((res) => {
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
          this.$message({
            message: msg,
            type: "success",
          });
          this.reload();
          this.show=false;
        } else {
          this.$message({
            message: "获取失败",
            type: "error",
          });
        }
      });
    },
       //选择导出项
  handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  //导出的方法
  handleDownload() {
    require.ensure([], () => {
      // 设置Excel的表格第一行的标题
      const tHeader = [
            "学号",
            "姓名",
            "学院专业班级",
            "思想分",
            "学业分",
            "文体分",
            "综合分",
            "综合分排名",
            "所获等级"
          ];
       const filterVal = [
            "s_number",
            "s_name",
            "s_college",
            "sixiangfen",
            "xueyefen",
            "wentifen",
            "zonghefen",
            "rowno",
            "dengji"
          ];
      
      // 数据集
      const list = this.multipleSelection; 
      const data = this.formatJson(filterVal, list);
      // excel名称可自定义
      const excelName = "学生综合测评表";
      export_json_to_excel(tHeader, data, excelName);
    });
  },
  //格式化json
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  },
  },
};
</script>

<style scoped>
.filter-container {
  margin: 10px;
  justify-content: space-around;
}

.filter-item {
  margin-right: 15px;
}

#pagepos {
  /* float:right */
  text-align: center;
  margin-top: 10px;
}
.previewImg {
  width: 100%;
  height: 100%;
}
</style>