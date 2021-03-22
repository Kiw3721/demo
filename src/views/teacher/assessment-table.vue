<template>
  <div id="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.collage"
        placeholder="学院"
        clearable
        style="width: 200px"
        class="filter-item"
      >
        <el-option
          v-for="item in collageOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.class"
        placeholder="专业班级"
        clearable
        class="filter-item"
        style="width: 200px"
      >
        <el-option
          v-for="item in classOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 130px"
        class="filter-item"
      />

      <el-button
       
        class="filter-item"
        type="primary"
        icon="el-icon-search"
      >
        搜索
      </el-button>
      <!-- @click="handleFilter" -->

      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
      >
        下载
      </el-button> -->
      <!-- @click="handleDownload" -->
    </div>

<!-- v-loading="listLoading" -->
    <el-table
      
      :data="studentList"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        label="ID"
        prop="s_id"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{row}"  >
          <span>{{ row.s_id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学号" prop="s_number" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_number }}</span>
           <!-- <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span> -->
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="s_name" min-width="130px">
        <template slot-scope="{row}">
            <span>{{ row.s_name }}</span>
           <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag>  -->
        </template>
      </el-table-column>

       <el-table-column label="学院" prop="s_college" width="250px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[0]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="专业" prop="s_grade" width="200px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[1]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" prop="s_grade" width="100px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[2]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学生自评" width="150px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click.native="watchStudent(row.s_id)">
            查看
          </el-button>
        </template>
      </el-table-column>

      <el-table-column
        label="复审"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <!-- <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            未审核
          </el-button>
        </template> -->
        <template>
          <el-button type="primary" size="mini"> 未审核 </el-button>
        </template>
      </el-table-column>
    </el-table>

     <div id="pagepos">
   <el-pagination 
     background
    layout="prev, pager, next"
    @current-change="currentPage"
    :total="totalPage">
  </el-pagination>
     </div>

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
  </div>
</template>

<script>
import { selectComprehensive} from '@/api/comprehensive'
import { getAllStudent ,StudentList} from '@/api/student'

export default {
  name: "ComplexTable",
  data() {
    return {
      listLoading: true,
      listQuery: {
        collage: "",
        class: "",
        name: "",
      },
      // comprehensive:{
      //   sxzzgn: "",
      //   jlgn: "",
      //   jcwmxy: "",
      //   jtgn: "",
      //   xsgybx: "",
      //   shsj: "",
      //   sixiangfenjf: "",
      //   sixiangfenkf: "",
      //   sixiangfenxj: "",
      //   sixiangfen: "",
      //   xxcj: "",
      //   xueyefenjf: "",
      //   xueyefenkf: "",
      //   xyfxiaoji: "",
      //   xueyefen: "",
      //   tiyuke: "",
      //   wthd:"",
      //   wentifenjf: "",
      //   wentifenkf: "",
      //   wentifenxj: "",
      //   wentifen: ""
      // },
      comprehensive:{},
      studentList: [],
      collageOptions: ["信科院", "管院", "艺设"],
      classOptions: ["计算机171", "信管171", "物联网182"],
      dialogTableVisible: false,
      tableData: [
        {
          content: "思想分",
          sort: "思想政治观念(15分)",
          // score: this.comprehensive.sxzzgn,
          score:"13"
        },
        {
          content: "思想分",
          sort: "纪律观念(14分)",
          // score: this.comprehensive.jlgn,
           score:"13"
        },
        {
          content: "思想分",
          sort: "基础文明修养(13分)",
          // score: this.comprehensive.jcwmxy,
           score:"13"
        },
        {
          content: "思想分",
          sort: "集体观念(13分)",
          // score:this.comprehensive.jtgn,
           score:"13"
        },
        {
          content: "思想分",
          sort: "学生公寓表现(15分)",
          // score:this.comprehensive.xsgybx,
           score:"13"
        },
        {
          content: "思想分",
          sort: "社会实践(15分)",
          // score:this.comprehensive.shsj,
           score:"13"
        },
        {
          content: "思想分",
          sort: "奖分+(15分)",
          // score:this.comprehensive.sixiangfenjf,
           score:"13"
        },
        {
          content: "思想分",
          sort: "扣分-",
          // score: this.comprehensive.sixiangfenkf,
           score:"13"
        },
        {
          content: "思想分",
          sort: "小计(*20%前)",
          // score:this.comprehensive.sixiangfenxj,
           score:"13"
        },
        {
          content: "思想分",
          sort: "思想品德分得分(*20%后)",
          // score:this.comprehensive.sixiangfen,
           score:"13"
        },

        {
          content: "学业分",
          sort: "学习成绩(90分)",
          // score: this.comprehensive.xxcj,
           score:"13"
        },
        {
          content: "学业分",
          sort: "奖分+(10分)",
          // score:this.comprehensive.xueyefenjl,
           score:"13"
        },
        {
          content: "学业分",
          sort: "扣分-",
          // score: this.comprehensive.xueyefenkf,
           score:"13"
        },
        {
          content: "学业分",
          sort: "小计(*20%前)",
          // score: this.comprehensive.xueyefenxj,
           score:"13"
        },
        {
          content: "学业分",
          sort: "学业分得分(*70%后)",
          // score: this.comprehensive.xueyefen,
           score:"13"
        },
        {
          content: "文体分",
          sort: "体育课分(60分)",
          // score: this.comprehensive.tiyuke,
           score:"13"
        },
        {
          content: "文体分",
          sort: "文体活动分(10分)",
          // score: this.comprehensive.wthd,
           score:"13"
        },
        {
          content: "文体分",
          sort: "奖分+(30分)",
          // score: this.comprehensive.wentifenjf,
           score:"13"
        },
        {
          content: "文体分",
          sort: "扣分-",
          // score: this.comprehensive.wentifenkf,
           score:"13"
        },
        {
          content: "文体分",
          sort: "小计(*10%前)",
          // score: this.comprehensive.wentifenxj,
           score:"13"
        },

        {
          content: "文体分",
          sort: "文体分得分(*10%后)",
          // score: this.comprehensive.wentifen,
           score:"13"
        },
      ],
      pageNo:1,//表格页码
      pageCount:10,//数据数
      currentNo:1,//当前页码
      allData:[],//全部数据
      totalPage:1//总页码
    };
  },
  created() {
    this.getRowSpan()
    this.StudentList()
    this.getPageTotal()
  },
  methods: {
    StudentList(index){
      this.listLoading = true
      this.pageNo = index || this.pageNo
      console.log("当前页面是第几页？"+this.pageNo)
      let data = {
       page:this.pageNo,
       pageSize:this.pageCount
       }
       console.log("页面个数！"+this.pageCount)
      StudentList(data).then((res)=>{
        console.log("分页的数据"+res.data);
        res.data.map(val=>{
          if(val.s_college){
          val.s_college=JSON.parse(val.s_college)
          }
        })
 
          this.studentList = res.data
          this.listLoading = false
      }).catch(error=>{
          console.log(error);
        })
    },
      //当前页数据
    currentPage(currentPage){
        console.log("页面！！！！"+currentPage)
      this.currentNo = currentPage;
      console.log("当前页数据"+this.currentNo)
        this.StudentList(this.currentNo)
    },
        //获取总页数
    getPageTotal(){
        this.listLoading = true
         getAllStudent().then((res)=>{
              console.log("msgggg"+res.msg)
              this.allData = res.list;
              this.totalPage = Math.ceil(this.allData.length / this.pageCount) * 10;
              console.log("获取总页数"+this.totalPage);
              this.listLoading = false
          }).catch(error=>{
            console.log(error)
      })
    },
    
    watchStudent(s_id) {
      console.log(s_id,"1111111")
      // this.selectComprehensive(s_id)
      this.dialogTableVisible = true;
    },
    selectComprehensive(studentId){
      let data = {studentId:studentId}
      selectComprehensive(data).then((res)=>{
        this.comprehensive = res.list;
        console.log(this.comprehensive,"123456") 
        this.dialogTableVisible = true;
      })
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

#pagepos{
 /* float:right */
  text-align:center;
  margin-top:10px;
 
}
</style>