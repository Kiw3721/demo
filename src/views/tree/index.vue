<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.id"
        clearable
        placeholder="id"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />

      <el-input
        v-model="listQuery.nickname"
        clearable
        placeholder="姓名"
        style="width: 150px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-select
        v-model="listQuery.faculty"
        placeholder="学院"
        clearable
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 450px"
        @click="forceRefresh"
      >
        查询
      </el-button>
      <el-button
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        style="margin-right:5px;"
        @click="handleDownload"
      >
        导出
      </el-button>
      <!-- <el-checkbox
        v-model="showCover"
        class="filter-item"
        style="margin-left:5px;"
        @change="changeShowCover"
      >
        显示头像
      </el-checkbox> -->
    </div>
    <el-table
      :key="tableKey"
      ref="multipleTable"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column
        label="id"
        prop="id"
        sortable="custom"
        align="center"
        width="80 "
        :class-name="getSortClass('id')"
      />
      <el-table-column label="学号" prop="sno" align="center" width="120" />
      <el-table-column label="姓名" align="center" width="120">
        <template slot-scope="{ row: { nickname } }">
          <span v-html="nickname" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="学院" prop="faculty" width="150" align="center" />
      <el-table-column label="班级" prop="class" width="150" align="center" />
      <el-table-column label="性别" prop="gender" width="50" align="center" /> -->
      <!-- <el-table-column
        label="联系邮箱"
        prop="email"
        width="180"
        align="center"
      /> -->
      <!-- <el-table-column label="注册平台" prop="platform" align="center" /> -->

      <!-- <el-table-column label="语言" prop="nickName" align="center" /> -->
      <!-- <el-table-column v-if="showCover" label="头像" width="150" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.avatarUrl" target="_blank">
            <img :src="scope.row.avatarUrl" style="width:40px;height:40px" />
          </a>
        </template>
      </el-table-column> -->
      <el-table-column label="申请时间" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createtime | timeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请图书" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出版社" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.publish }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class="reason"
        label="推荐语"
        width="200"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.reson }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
        fixed="right"
      >
        <template slot-scope="{ row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            回复
          </el-button>
          <el-button
            v-if="row.status != '完成'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, '完成')"
          >
            完成
          </el-button>
          <el-button
            v-if="row.status != '未完成'"
            size="mini"
            @click="handleModifyStatus(row, '未完成')"
          >
            未完成
          </el-button>
          <!-- <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button> -->
        </template>
      </el-table-column></el-table
    >
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="refresh"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item label="Type" prop="type"> -->
        <!-- <el-select
            v-model="temp.type"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item.key"
              :label="item.display_name"
              :value="item.key"
            />
          </el-select> -->
        <!-- </el-form-item> -->
        <el-form-item
          label="姓名"
          prop="content
        "
        >
          <el-input v-model="temp.nickname" :disabled="true" />
        </el-form-item>
        <el-form-item
          label="书名"
          prop="content
        "
        >
          <el-input v-model="temp.content" :disabled="true" />
        </el-form-item>
        <!-- <el-form-item label="Imp">
          <el-rate
            v-model="temp.importance"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="3"
            style="margin-top:8px;"
          />
        </el-form-item> -->
        <el-form-item label="申请理由 ">
          <el-input
            v-model="temp.reson"
            :autosize="{ minRows: 1, maxRows: 5 }"
            type="textarea"
            placeholder="请输入"
            :disabled="true"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="预计时间" prop="uploadTime">
          <el-date-picker
            v-model="temp.uploadTime"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="回复">
          <el-input
            v-model="temp.reply"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getApply } from "@/api/book";
import { updateApply } from "@/api/book";
import {
  getSubCategory,
  getsubscriber,
  deletesubscriber
} from "@/api/subscriber";
import waves from "@/directive/waves";
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination";
import PreviewDialog from "./components/PreviewDialog";
import { get } from "js-cookie";

export default {
  name: "BookList",
  components: { Pagination, PreviewDialog },
  directives: { waves },

  filters: {
    statusFilter(status) {
      const statusMap = {
        完成: "success",
        未完成: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    },
    timeFilter(time) {
      if (time) {
        return parseTime(time, "{y}-{m}-{d} {h}:{i}");
      } else {
        return "无";
      }
    },
    valueFilter(value) {
      if (value) {
        return value;
      } else {
        return "无";
      }
    }
  },
  data() {
    return {
      dialogPvVisible: false,
      statusOptions: ["完成", "未完成", "deleted"],
      multipleSelection: [],
      tableKey: 0,
      pvData: [],
      list: null,
      total: 0,
      listLoading: true,
      downloadLoading: false,
      listQuery: {},
      showCover: true,
      categoryList: [],
      dialogStatus: "",
      status: "完成",
      dialogFormVisible: false,
      rules: {
        type: [
          { required: false, message: "type is required", trigger: "change" }
        ],
        createtime: [
          {
            type: "date",
            required: false,
            message: "createtime is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      temp: {
        // id: undefined,
        nickname: "",
        // importance: 1,
        reply: "",
        reson: "",
        uploadTime: new Date(),
        createtime: new Date(),
        content: "",
        type: "",
        status: "完成"
      },
      textMap: {
        update: "回复",
        create: "Create"
      }
    };
  },
  created() {
    this.parseQuery();
  },
  mounted() {
    this.getApplyList();
    // this.getCategoryList();
    // this.getSubscriberList();
    this.getSubscriberCategory();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === from.path) {
      const newQuery = Object.assign({}, to.query);
      const oldQuery = Object.assign({}, from.query);
      if (JSON.stringify(newQuery) !== JSON.stringify(oldQuery)) {
        this.getSubscriberList();
      }
    }
    next();
  },
  methods: {
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);

          tempData.uploadTime = +new Date(tempData.uploadTime); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // tempData.replytime = +new Date(tempData.replytime); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          console.log(tempData);
          updateApply(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Update Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;

      const info = { id: row.id, status: status };
      updateApply(info).then(res => {
        console.log(res);
      });
    },
    wrapperKeyword(k, v) {
      function highlight(value) {
        return '<span style="color: #1890ff">' + value + "</span>";
      }
      if (!this.listQuery[k]) {
        return v;
      } else {
        return v.replace(new RegExp(this.listQuery[k], "ig"), v =>
          highlight(v)
        );
      }
    },

    parseQuery() {
      // 收集查询条件
      const query = Object.assign({}, this.$route.query);
      let listQuery = {
        page: 1,
        pageSize: 20,
        sort: "-id"
      };
      if (query) {
        query.page && (query.page = Number(query.page));
        query.pageSize && (query.pageSize = Number(query.pageSize));
        listQuery = {
          ...listQuery,
          ...query
        };
      }
      this.listQuery = listQuery;
    },
    refresh() {
      this.$router.push({
        path: "/subscriber/list",
        query: this.listQuery
      });
    },
    changeShowCover(value) {
      this.showCover = value;
    },
    getCategoryList() {
      getCategory().then(response => {});
    },
    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            "学号",
            "姓名",
            "注册平台",
            "手机号码",
            "学院",
            "班级"
          ];
          const filterVal = [
            "id",
            "nickname",
            "platform",
            "phone",
            "faculty",
            "class"
          ];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: "table-list"
          });
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "请选择",
          type: "warning"
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getSubscriberCategory() {
      getSubCategory().then(res => {
        this.categoryList = res.data;
        // console.log(this.categoryList)
      });
    },
    getApplyList() {
      this.listLoading = true;
      getApply(this.listQuery).then(response => {
        const { data, total } = response;
        this.list = data;
        this.total = total;
        this.listLoading = false;
        this.list.forEach(book => {
          book.nickname = this.wrapperKeyword("title", book.nickname);
          // book.authorWrapper = this.wrapperKeyword("author", book.author);
        });
      });
    },

    handleFilter() {
      this.listQuery.page = 1;
      this.refresh();
    },
    forceRefresh() {
      window.location.reload();
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    // handleCreate() {
    //   this.$router.push("/book/create");
    // },
    handleUpdate(row) {
      // this.$router.push(`/book/edit/${row.id}`);
      this.temp = Object.assign({}, row); // copy obj
      this.temp.createtime = new Date(this.temp.createtime);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deletesubscriber(row.id).then(response => {
          this.$notify({
            title: "成功",
            message: response.msg || "删除成功",
            type: "success",
            duration: 2000
          });
          this.handleFilter();
        });
      });
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}`
        ? "ascending"
        : sort === `-${key}`
        ? "descending"
        : "";
    }
  }
};
</script>
<style lang="scss">
.reason {
  /deep/.el-tooltip__popper {
    width: 80%; /*修改宽度*/
    background: gray !important; /*背景色  !important优先级*/
    opacity: 0.5 !important; /*背景色透明度*/
    color: #ffffff !important; /*字体颜色*/
  }
}
</style>
