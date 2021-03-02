<template>
  <div id="box" class="container">
    <form role="form">
      <div class="form-group">
        <label for="name">活动名称:</label>
        <input id="name" v-model="name" type="text" class="form-control" placeholder="输入名称">
      </div>
      <div class="form-group">
        <label for="score">分数:</label>
        <input id="score" v-model="score" type="text" class="form-control" placeholder="所得分数">
      </div>
      <div class="form-group">
        <label for="proof">证明:</label>
        <input id="proof" v-model="proof" type="text" class="form-control" placeholder="上传图片">
      </div>
      <!-- // action提交的地址为后台转为存放图片文件的一个接口地址http://localhost:9528/ -->
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
        </template>
      </el-upload>
      <div class="form-group">
        <input type="button" value="添加" class="btn btn-primary" style="margin:0 10px" @click="add()">
        <input type="reset" value="重置" class="btn btn-danger">
      </div>
    </form>
    <hr>
    <table class="table table-bordered table-hover">
      <caption class="h3 text-info">活动来源表</caption>
      <tr class="text-danger">
        <th class="text-center">序号</th>
        <th class="text-center">活动名称</th>
        <th class="text-center">所得分数</th>
        <th class="text-center">图片</th>
        <th class="text-center">操作</th>
      </tr>
      <tr v-for="(item,key) in myData" :key="key" class="text-center">
        <td>{{ key+1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.score }}</td>
        <td>{{ item.proof }}</td>
        <td>
          <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#layer" @click="nowIndex=$index">删除</button>
        </td>
      </tr>
      <tr v-show="myData.length!=0">
        <td colspan="4" class="text-right">
          <button class="btn btn-danger btn-sm" data-toggle="modal" data-target="#layer" @click="nowIndex=-2">删除全部</button>
        </td>
      </tr>
      <tr v-show="myData.length==0">
        <td colspan="4" class="text-center text-muted">
          <p>暂无数据....</p>
        </td>
      </tr>
    </table>

    <!--模态框 弹出框-->
    <div id="layer" role="dialog" class="modal fade bs-example-modal-sm">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
            <h4 class="modal-title">确认删除么?</h4>
          </div>
          <div class="modal-body text-right">
            <button data-dismiss="modal" class="btn btn-primary btn-sm">取消</button>
            <button data-dismiss="modal" class="btn btn-danger btn-sm" @click="deleteMsg(nowIndex)">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      myData: [],
      name: '',
      score: '',
      proof: '',
      nowIndex: -100,
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' },
        { name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择一张图片证明`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    add: function() {
      if (this.name === '') {
        alert('活动名称不能为空')
      } else if (this.score === '') {
        alert('所得分数不能为空')
      } else if (this.proof === '') {
        alert('还没上传证明图片')
      } else {
        this.myData.push({
          name: this.name,
          score: this.score,
          proof: this.proof
        })

        this.name = ''
        this.score = ''
        this.proof = ''
      }
      //   alert('添加')
    },
    deleteMsg(n) {
      if (n === -2) {
        this.myData = []
      } else {
        this.myData.splice(n, 1)
      }
    }
  }
}
</script>

<style>
#box{
    width: 1000px;
}
.form-control{
    width: 500px;
}

</style>
