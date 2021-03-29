<template>
  <div id="app-container">
    <div class="filter-container">
        <el-date-picker
      v-model="listQuery.time"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
       class="filter-item">
    </el-date-picker>


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

 <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-refresh"
        @click="handlerefresh"
      >
        重置
      </el-button>

    </div>

    <el-table
      v-loading="listLoading"
      :data="healthList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="studentId"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{row}"  >
          <span>{{ row.studentId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="name" min-width="100px">
        <template slot-scope="{row}">
            <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学号" prop="number" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.number }}</span>
        </template>
      </el-table-column>


 <el-table-column label="性别" prop="gender" width="50px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.gender }}</span>
        </template>
      </el-table-column>

       <el-table-column label="手机号码" prop="telephone" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>

       <el-table-column label="填报时间" prop="time" width="200px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.time }}</span>
        </template>
      </el-table-column>


       <el-table-column label="温度" prop="temperature" width="180px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.temperature }}</span>
        </template>
      </el-table-column>

       <el-table-column label="是否有咳嗽、呼吸困难等症状" prop="ill" width="230px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.ill }}</span>
        </template>
      </el-table-column>

    <el-table-column label="所在区域" prop="region" width="200px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.region }}</span>
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
import { healthList } from '@/api/health'

export default {
  name: "health",
  inject:['reload'],
  data() {
    return {
      listLoading: true,
      healthList: [],
      listQuery: {
        time:"",
        name: "",
        number:""
      },
      pageNo:1,//表格页码
      pageCount:10,//数据数
      currentNo:1,//当前页码
      allData:[],//全部数据
      totalPage:1//总页码
    };
  },
  created() {
    this.getHealthList()
    this.getPageTotal();
  },
  methods: {
    getHealthList(index){
      this.listLoading = true
      this.pageNo = index || this.pageNo
      console.log("当前页面是第几页？"+this.pageNo)
      let data = {
       page:this.pageNo,
       pageSize:this.pageCount
       }
       console.log("页面个数！"+this.pageCount)
      healthList(data).then((res)=>{
        console.log("分页的数据"+res.data);
          this.healthList = res.data
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
        this.getHealthList(this.currentNo)
    },
        //获取总页数
    getPageTotal(){
        this.listLoading = true
         healthList().then((res)=>{
              console.log("msgggg"+res.msg)
              this.allData = res.list;
              this.totalPage = Math.ceil(this.allData.length / this.pageCount) * 10;
              console.log("获取总页数"+this.totalPage);
              this.listLoading = false
          }).catch(error=>{
            console.log(error)
      })
    },
  handleSearch(){
    let data={
      time:this.listQuery.time,
      name:this.listQuery.name,
      number:this.listQuery.number,
      page:this.pageNo,
      pageSize:this.pageCount
    }
    healthList(data).then((res)=>{
      console.log("查询的数据："+res.data)
      this.healthList = res.data
    // this.listLoading = false
      }).catch(error=>{
          console.log(error);
    })
  },
  handlerefresh(){
    this.listQuery.majorClass=[]
    this.listQuery.name=""
    this.listQuery.number=""
    this.getHealthList()
    this.getPageTotal();
  }

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

