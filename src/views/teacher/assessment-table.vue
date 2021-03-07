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
      <el-table-column label="学院" prop="collage" width="200px" align="center">
      </el-table-column>
       <el-table-column label="专业班级" prop="class" width="200px" align="center">
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
        <template >
          <el-button type="primary" size="mini">
            未审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>



    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

      <el-dialog :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type"  placeholder="Please select">
            <el-option v-for="item in collageOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="Imp">
          <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3" style="margin-top:8px;" />
        </el-form-item>
        <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary">
          Confirm
        </el-button>
      </div>
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
      ],
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      statusOptions: ['published', 'draft', 'deleted'],
    };
  },
  created() {},
  methods: {
    watchStudent(row){
      this.dialogFormVisible = true
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
</style>