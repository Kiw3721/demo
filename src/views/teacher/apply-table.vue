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
        style="width: 130px;"
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
      style="width: 100%;"
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
        <template>
          <el-button type="primary" size="mini">
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
        <template >
          <el-button type="primary" size="mini">
            未审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
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
        name: undefined
      },
      collageOptions: ['信科院', '管院', '艺设'],
      classOptions: ['计算机171', '信管171', '物联网182'],
      list: [
        {
          id: 1,
          sno: 2017,
          name: "123"
        },
        {
          id: 2,
          sno: 2018,
          name: "123456"
        },
        {
          id: 2,
          sno: 2019,
          name: "123"
        }
      ]
    };
  },
  created() {},
  methods: {}
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
</style>