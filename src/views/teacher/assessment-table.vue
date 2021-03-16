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
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
      >
        搜索
      </el-button>
      <!-- @click="handleFilter" -->

      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
      >
        下载
      </el-button>
      <!-- @click="handleDownload" -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      >
        <!-- :class-name="getSortClass('id')" -->
        <!-- <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="学院" prop="collage" width="200px" align="center">
      </el-table-column>
      <el-table-column
        label="专业班级"
        prop="class"
        width="200px"
        align="center"
      >
      </el-table-column>
      <el-table-column label="学号" prop="sno" width="150px" align="center">
        <!-- <template slot-scope="{row}">
            <span>{{ row.sno }}</span>
           <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template> -->
      </el-table-column>
      <el-table-column label="姓名" prop="name" min-width="150px">
        <!-- <template slot-scope="{row}">
            <span>{{ row.sname }}</span>
           <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span> -->
        <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> 
        </template> -->
      </el-table-column>
      <el-table-column label="学生自评" width="110px" align="center">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="watchStudent(row)">
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

    <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
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
export default {
  name: "ComplexTable",
  data() {
    return {
      // listLoading: true,
      listQuery: {
        collage: undefined,
        class: undefined,
        name: undefined,
      },
      collageOptions: ["信科院", "管院", "艺设"],
      classOptions: ["计算机171", "信管171", "物联网182"],
      list: [
        {
          id: 1,
          collage: "信科院",
          class: "信管171",
          sno: 2017,
          name: "123",
        },
        {
          id: 2,
          collage: "信科院",
          class: "信管171",
          sno: 2018,
          name: "123456",
        },
        {
          id: 3,
          collage: "信科院",
          class: "计算机171",
          sno: 2019,
          name: "123",
        },
        {
          id: 4,
          collage: "管院",
          class: "管理171",
          sno: 2019,
          name: "123呃3",
        },
        {
          id: 5,
          collage: "信科院",
          class: "物联网182",
          sno: 2019,
          name: "123",
        },
      ],
      dialogTableVisible: false,
      tableData: [
        {
          content: "思想分",
          sort: "思想政治观念(15分)",
          score: "15",
        },
        {
          content: "思想分",
          sort: "纪律观念(14分)",
          score: "14",
        },
        {
          content: "思想分",
          sort: "基础文明修养(13分)",
          score: "13",
        },
        {
          content: "思想分",
          sort: "集体观念(13分)",
          score: "13",
        },
        {
          content: "思想分",
          sort: "学生公寓表现(15分)",
          score: "12",
        },
        {
          content: "思想分",
          sort: "社会实践(15分)",
          score: "12",
        },
        {
          content: "思想分",
          sort: "奖分+(15分)",
          score: "12",
        },
        {
          content: "思想分",
          sort: "扣分-",
          score: "12",
        },
        {
          content: "思想分",
          sort: "小计(*20%前)",
          score: "12",
        },
        {
          content: "思想分",
          sort: "思想品德分得分(*20%后)",
          score: "12",
        },

        {
          content: "学业分",
          sort: "学习成绩(90分)",
          score: "88",
        },
        {
          content: "学业分",
          sort: "奖分+(10分)",
          score: "88",
        },
        {
          content: "学业分",
          sort: "扣分-",
          score: "88",
        },
        {
          content: "学业分",
          sort: "小计(*20%前)",
          score: "88",
        },
        {
          content: "学业分",
          sort: "学业分得分(*70%后)",
          score: "88",
        },
        {
          content: "文体分",
          sort: "体育课分(60分)",
          score: "88",
        },
        {
          content: "文体分",
          sort: "文体活动分(10分)",
          score: "88",
        },
        {
          content: "文体分",
          sort: "奖分+(30分)",
          score: "88",
        },
        {
          content: "文体分",
          sort: "扣分-",
          score: "88",
        },
        {
          content: "文体分",
          sort: "小计(*10%前)",
          score: "88",
        },

        {
          content: "文体分",
          sort: "文体分得分(*10%后)",
          score: "88",
        },
      ],
      currentPage: 5,
    };
  },
  created() {
    this.getRowSpan();
  },
  methods: {
    watchStudent(row) {
      this.dialogTableVisible = true;
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
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
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

.block{
  margin: 15px 15px;
  
}
</style>