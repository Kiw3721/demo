<template>
  <div id="app-container">
    <div class="filter-container">
        <el-cascader
          :options="options"
          placeholder="请选择学院-专业-班级"
          v-model="listQuery.majorClass"
          :props="{ expandTrigger: 'hover' }"
          style="margin-right:15px"
        ></el-cascader>


      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 130px;"
        class="filter-item"
      />
      <el-input
        v-model="listQuery.number"
        placeholder="学号"
        style="width: 130px;"
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
      <!-- @click="handleFilter" -->
<!-- 
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        下载
      </el-button> -->

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
      :data="studentList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >


    <el-table-column type="selection" align="center" />

      <el-table-column
        label="ID"
        prop="s_id"
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

      <el-table-column label="姓名" prop="s_name" min-width="100px">
        <template slot-scope="{row}">
            <span>{{ row.s_name }}</span>
           <!-- <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag>  -->
        </template>
      </el-table-column>

       <el-table-column label="学院" prop="s_college" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[0]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="专业" prop="s_grade" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[1]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级" prop="s_class" width="50px" align="center">
        <template slot-scope="{row}">
            <span>{{row.s_college?row.s_college[2]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄" prop="s_age" width="50px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_age }}</span>
        </template>
      </el-table-column>

 <el-table-column label="性别" prop="s_gender" width="50px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_gender }}</span>
        </template>
      </el-table-column>

       <el-table-column label="手机号码" prop="s_telephone" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_telephone }}</span>
        </template>
      </el-table-column>


       <el-table-column label="身份证" prop="s_idCard" width="200px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_idCard }}</span>
        </template>
      </el-table-column>

       <el-table-column label="家庭住址" prop="s_address" width="250px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.s_address }}</span>
        </template>
      </el-table-column>

       <!-- <el-table-column
        label="模块审核"
        align="center"
        width="250"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="success" size="mini" @click="access(row.s_id)">
            综合测评
          </el-button>
        
          <el-button type="success" size="mini" @click="apply(row.s_id)">
            贫困申请
          </el-button>
        </template>
      </el-table-column> -->

      <el-table-column
        label="操作"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleDelete(row.s_id)">
            删除
          </el-button>
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

  </div>
</template>

<script>
import { getAllStudent ,StudentList,deleteStudent} from '@/api/student'
//导出excel
import Blob from '@/vendor/Blob'
const { export_json_to_excel } = require('@/vendor/Export2Excel');

export default {
  name: "ComplexTable",
  inject:['reload'],
  data() {
    return {
      listLoading: true,
      studentList: [],
      listQuery: {
        majorClass:[],
        name: "",
        number:""
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
      pageNo:1,//表格页码
      pageCount:10,//数据数
      currentNo:1,//当前页码
      allData:[],//全部数据
      totalPage:1,//总页码
      multipleSelection: [],
      downloadLoading:false
    };
  },
  created() {
    this.StudentList()
    this.getPageTotal();
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
            // 将字符串转为数组
          val.s_college=JSON.parse(val.s_college)
          }
            // console.log(  val ,'  res.data   res.data ')
         // this.$set(val,'s_college',JSON.parse(val.s_college))
          // val.s_college=JSON.parse(val.s_college)
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
    // 删除
    handleDelete(id){
      console.log("row的id是啥？"+id);
      let data = {s_id:id}
      deleteStudent(data).then((res)=>{
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
      }
    })
  },
  handleSearch(){
    let data={
      s_name:this.listQuery.name,
      s_number:this.listQuery.number,
      s_college:JSON.stringify(this.listQuery.majorClass),
      page:this.pageNo,
      pageSize:this.pageCount
    }
    StudentList(data).then((res)=>{
      console.log("查询的数据："+res.data)
      res.data.map(val=>{
          if(val.s_college){
          val.s_college=JSON.parse(val.s_college)
          }
            // console.log(  val ,'  res.data   res.data ')
         // this.$set(val,'s_college',JSON.parse(val.s_college))
          // val.s_college=JSON.parse(val.s_college)
        })
 
          this.studentList = res.data
          // this.listLoading = false
      }).catch(error=>{
          console.log(error);
    })
  },
  // 刷新
  handlerefresh(){
    this.listQuery.majorClass=[]
    this.listQuery.name=""
    this.listQuery.number=""
    this.StudentList()
    this.getPageTotal();
  },
  //选择
  handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  // 导出
  //导出的方法
  handleDownload() {
    require.ensure([], () => {
      // 设置Excel的表格第一行的标题
      const tHeader = [
            "学号",
            "姓名",
            "学院专业班级",
            "年龄",
            "性别",
            "手机号码",
            "身份证",
            "家庭住址"
          ];
       const filterVal = [
            "s_number",
            "s_name",
            "s_college",
            "s_age",
            "s_gender",
            "s_telephone",
            "s_idCard",
            "s_address"
          ];
      
      // 数据集
      const list = this.multipleSelection; 
      const data = this.formatJson(filterVal, list);
      // excel名称可自定义
      const excelName = "学生信息表";
      export_json_to_excel(tHeader, data, excelName);
    });
  },
  //格式化json
  formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => v[j]))
  },
    
  }
};
</script>

<style scoped>
.filter-container{
  margin: 10px;
  justify-content: space-around;
}

.filter-item{
  margin-right: 15px;
}

#pagepos{
 /* float:right */
  text-align:center;
  margin-top:10px;
 
}
</style>

