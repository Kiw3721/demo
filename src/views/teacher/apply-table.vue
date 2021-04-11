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
      :data="applyList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        label="ID"
        prop="stuentId"
        sortable="custom"
        align="center"
        width="80"
      >
        <template slot-scope="{row}"  >
          <span>{{ row.studentId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="学号" prop="number" width="150px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.number }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" prop="name" min-width="150px">
        <template slot-scope="{row}">
            <span>{{ row.name }}</span>
        </template>
      </el-table-column>

       <el-table-column label="学院" prop="majorClass" width="200px" align="center">
        <template slot-scope="{row}">
            <span>{{row.majorClass?row.majorClass[0]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="专业"  width="180px" align="center">
        <template slot-scope="{row}">
            <span>{{row.majorClass?row.majorClass[1]:'' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="班级"  width="80px" align="center">
        <template slot-scope="{row}">
            <span>{{row.majorClass?row.majorClass[2]:'' }}</span>
        </template>
      </el-table-column>

 <el-table-column label="性别" prop="gender" width="80px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.gender }}</span>
        </template>
      </el-table-column>

       <el-table-column label="手机号码" prop="telephone" width="180px" align="center">
        <template slot-scope="{row}">
            <span>{{ row.telephone }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="贫困资料"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleWatch(row)">
            查看
          </el-button>
        </template>
      </el-table-column>

       <el-table-column
        label="审核情况"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" v-if="row.state==null"> 未审核 </el-button>
          <el-button type="success" size="mini" v-if="row.state==1"> 通过审核 </el-button> 
          <el-button type="info" size="mini" v-if="row.state==2"> 拒绝通过 </el-button> 
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


<!-- 贫困申请的表单 -->
 <el-dialog title="审核信息" :visible.sync="dialogFormVisible" width="700px">
  <el-form label-width="220px" >

    <el-form-item label="学院-专业-班级：">
       {{ poorApply.majorClass}}
      </el-form-item>

    <el-form-item label="姓名">
      {{ poorApply.name}}
    </el-form-item>

    <el-form-item label="学号：">
       {{ poorApply.number}}
      </el-form-item>

      <el-form-item label="性别：" prop="gender">
        {{ poorApply.gender}}
      </el-form-item>

      <el-form-item label="身份证号：">
        {{poorApply.idCard}}
      </el-form-item>

      <el-form-item label="家庭住址：">
        {{poorApply.region}}
      </el-form-item>

      <el-form-item label="联系电话：">
         {{poorApply.telephone}}
      </el-form-item>

      <el-form-item label="学生本人是否患重大疾病：">
        {{poorApply.sick}}
      </el-form-item>

      <el-form-item label="是否特困供养员：">
        {{poorApply.difficultPerson}}
      </el-form-item>

      <el-form-item label="是否城镇低收入困难家庭：" >
        {{poorApply.difficultFamily}}
      </el-form-item>

      <el-form-item label="是否城乡低收入保障户：" >
        {{poorApply.security}}
      </el-form-item>

      <el-form-item label="是否建档立卡家庭：">
        {{poorApply.modelCard}}
      </el-form-item>


      <el-form-item label="是否特困职工子女：">
        {{poorApply.difficultChild}}
      </el-form-item>

      <el-form-item label="是否孤儿：">
        {{poorApply.orphan}}
      </el-form-item>

      <el-form-item label="是否优抚对象：" >
        {{poorApply.entitledGroup}}
      </el-form-item>

      <el-form-item label="父母不能履行抚养义务的儿童：">
        {{poorApply.foster}}
      </el-form-item>

      <el-form-item label="是否因公牺牲警察子女：">
        {{poorApply.policeChild}}
      </el-form-item>

      <el-form-item label="学生本人是否残疾：">
        {{poorApply.disability}}
      </el-form-item>

      <el-form-item label="是否父母一方抚养：" >
        {{poorApply.fosterOne}}
      </el-form-item>

      <el-form-item label="赡养人口数：">
        {{poorApply.support}}
      </el-form-item>

      <el-form-item label="赡养老人：">
        {{poorApply.supportOld}}
      </el-form-item>

      <el-form-item label="家庭成员失业人数：">
        {{poorApply.noWork}}
      </el-form-item>

      <el-form-item label="父母从业情况：">
        {{poorApply.parentWork}}
      </el-form-item>

      <el-form-item label="父母从业情况：">
        {{poorApply.culture}}
      </el-form-item>

      <el-form-item label="父母年龄：" >
        {{poorApply.parentAge}}
      </el-form-item>

      <el-form-item label="劳动力人口数：" >
        {{poorApply.workPerson}}
      </el-form-item>

      <el-form-item label="家庭人口数：">
        {{poorApply.familyPerson}}
      </el-form-item>

      <el-form-item label="家庭在读人数：">
        {{poorApply.studyPerson}}
      </el-form-item>

      <el-form-item label="家庭人均年收入：" >
        {{poorApply.yearInput}}
      </el-form-item>

       <el-form-item label="附件：">
         <a href="javascript:">{{poorApply.fujianName}}</a>
         <el-button icon="el-icon-download" @click.native="download"> </el-button>
      </el-form-item>

    <el-form-item label="备注" label-width="200px">
      <el-input v-model="beizhu" ></el-input>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="stateok(1)">通过</el-button>
        <el-button type="primary" @click="stateok(2)">拒绝</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import { ApplyList,updateApply} from '@/api/apply'
import { downloadFile} from "@/api/files";

export default {
  name: "ApplyTable",
  inject:['reload'],
  data() {
    return {
      listLoading: true,
      applyList: [],
      poorApply:[],
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
      dialogFormVisible:false,
      beizhu:''
    };
  },
  created() {
    this.getApplyList()
    this.getPageTotal();
  },
  methods: {
    getApplyList(index){
      this.listLoading = true
      this.pageNo = index || this.pageNo
      console.log("当前页面是第几页？"+this.pageNo)
      let data = {
       page:this.pageNo,
       pageSize:this.pageCount
       }
       console.log("页面个数！"+this.pageCount)
      ApplyList(data).then((res)=>{
        console.log("分页的数据"+res.data);
        res.data.map(val=>{
          if(val.majorClass){
            // 将字符串转为数组
          val.majorClass=JSON.parse(val.majorClass)
          }
          
        })
          this.applyList = res.data
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
        this.getApplyList(this.currentNo)
    },
        //获取总页数
    getPageTotal(){
        this.listLoading = true
         ApplyList().then((res)=>{
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
      name:this.listQuery.name,
      number:this.listQuery.number,
      majorClass:JSON.stringify(this.listQuery.majorClass),
      page:this.pageNo,
      pageSize:this.pageCount
    }
    ApplyList(data).then((res)=>{
      console.log("查询的数据："+res.data)
      res.data.map(val=>{
          if(val.majorClass){
          val.majorClass=JSON.parse(val.majorClass)
          }
        })
 
          this.applyList = res.data
          // this.listLoading = false
      }).catch(error=>{
          console.log(error);
    })
  },
  handlerefresh(){
    this.listQuery.majorClass=[]
    this.listQuery.name=""
    this.listQuery.number=""
    this.getApplyList()
    this.getPageTotal();
  },
  // 审核
    handleWatch(v){
    this.poorApply=v
    console.log("班级",this.poorApply.majorClass,typeof this.poorApply.majorClass)
    var major = ""
    for(var i=0;i<this.poorApply.majorClass.length;i++){
       major += this.poorApply.majorClass[i]
    }
    console.log("简写班级",major)
    this.poorApply.majorClass = major
    this.dialogFormVisible=true
  },
    // 贫困申请的状态
  stateok(sum){
      let data ={
      studentId:this.poorApply.studentId,
      state:sum,
      beizhu:this.beizhu,
    }
    updateApply(data).then((res)=>{
        var code = res.statusCode
        var msg = res.msg
        if( code == 200) {
         this.$message({
            message: msg,
            type: "success"
          });
          this.dialogFormVisible=false
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

