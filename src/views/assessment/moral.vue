<template>
  <div id="box" class="container">
    <form role="form">
      <div id="form-group">
      <label for="activityType" style="margin-right:15px">活动类型:</label>
      <el-select v-model="activityType" placeholder="请选择类型">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </div>
      <div class="form-group">
        <label for="activityName">活动名称:</label>
        <input
          id="activityName"
          v-model="activityName"
          type="text"
          class="form-control"
          placeholder="输入名称"
        />
      </div>
      <div class="form-group">
        <label for="activityNum">分数:</label>
        <input
          id="activityNum"
          v-model="activityNum"
          type="text"
          class="form-control"
          placeholder="所得分数"
        />
      </div>
      <div class="form-group">
        <label for="activityProofName">证明:</label>
        <input
          id="activityProofName"
          v-model="activityProofName"
          type="text"
          class="form-control"
          placeholder="上传图片"
        />
      </div>
      <!-- // action提交的地址为后台转为存放图片文件的一个接口地址http://localhost:9528/ -->
      <!-- on-preview	点击文件列表中已上传的文件时的钩子	function(file) //实现图片预览
           on-remove	文件列表移除文件时的钩子	function(file, fileList)  //点击删除图片
            on-success	文件上传成功时的钩子	function(response, file, fileList) //监听图片上传成功	-->
      <el-upload
        class="upload-demo"
        action="/uploads/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-change="onBeforeUpload"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        :on-success="handleSuccess"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件，且不超过 1MB
          </div>
        </template>
      </el-upload>
      <div class="form-group">
        <input
          type="button"
          value="添加"
          class="btn btn-primary"
          style="margin: 0 10px"
          @click="add"
        />
        <!-- <input type="reset" value="重置" class="btn btn-danger" @click="reset"/> -->
      </div>
    </form>
    <hr />
    <table class="table table-bordered table-hover">
      <caption class="h3 text-info" style="margin-bottom:10px;">
        <span>活动来源表</span>
        <el-badge value="new" class="item">
            <el-button size="mini" @click="dialogVisible = true">审核状态</el-button>
        </el-badge>
      </caption>
      <tr class="text-danger">
        <th class="text-center">序号</th>
        <th class="text-center">活动类型</th>
        <th class="text-center">活动名称</th>
        <th class="text-center">所得分数</th>
        <th class="text-center">图片</th>
        <th class="text-center">操作</th>
      </tr>
      <tr v-for="(item, key) in myData" :key="key" class="text-center">
        <td>{{ key + 1 }}</td>
        <td>{{ item.activityType }}</td>
        <td>{{ item.activityName }}</td>
        <td>{{ item.activityNum }}</td>
        <td @click="Proofshow(item.activityProofPath)"><a href="javascript:"> {{ item.activityProofPic }}</a></td>
        <td>
          <button
            class="btn btn-primary btn-sm"
            data-toggle="modal"
            data-target="#layer"
            @click="nowIndex = key"
          >
            删除
          </button>
        </td>
      </tr>

      <tr v-show="myData.length == 0">
        <td colspan="4" class="text-center text-muted">
          <p>暂无数据....</p>
        </td>
      </tr>
    </table>

    <!-- 图片预览窗口 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" class="previewImg" />
    </el-dialog>

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
            <button data-dismiss="modal" class="btn btn-primary btn-sm" style="margin-left:10px">
              取消
            </button>
            <button
              data-dismiss="modal"
              class="btn btn-danger btn-sm"
              @click="deleteMsg(nowIndex)"
            >
              确认
            </button>
          </div>
        </div>
      </div>
    </div>

          <!-- 审核状态弹出款 -->
      <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>审核状态：{{status}}</span>
      <br>
      <span>反馈信息：{{message}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addProof, deleteProof,searchProof} from "@/api/activityProof";
import { deleteFiles} from "@/api/files";

export default {
  data() {
    return {
      myData: [],
      activityType: "",
      activityName: "",
      activityNum: "",
      activityProofName: "",
      nowIndex: -100,
      //控制图片预览窗口的显示与隐藏
      previewVisible: false,
      //图片地址
      previewPath: "",
      fileList: [],
      options: [{
          value: '思想分',
          label: '思想分'
        }, {
          value: '学业分',
          label: '学业分'
        }, {
          value: '文体分',
          label: '文体分'
        }],
      title:"审核结果",
      status:"未审核",
      message:"无",
      dialogVisible:false,
    };
  },
  created() {
	this.activityType = this.options[0].value
  this.updateProof()
  },
  methods: {
    // 更新已上传的证明
    updateProof(){
      const studentId = JSON.parse(localStorage.getItem("userInfo")).s_id;
        let data = {
          activityName: this.activityName,
          activityNum: this.activityNum,
          activityProofPic: this.activityProofName,
          activityType: this.activityType,
          studentId: studentId,
        };
      searchProof(data).then((res)=>{
        this.myData = res.data
        })
    },
    // 上传设置
    onBeforeUpload(file)
    {
      let testFile = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()
      console.log("file的类型:"+testFile)
      const isIMAGE = testFile === 'jpg' || testFile === 'png';
      console.log("file的类型:"+isIMAGE)
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isIMAGE) {
        this.$message.warning('上传文件只能是图片格式!');
        this.fileList = []
        return false;
      }
      if (!isLt1M) {
        this.$message.warning('上传文件大小不能超过 1MB!');
        this.fileList = []
        return false;
      }
      return isIMAGE && isLt1M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`只能选择一张图片证明`);
    },
    handleRemove(file, fileList) {
      this.activityProofName = "";
      this.deleteFile(file.pic)
      console.log("11111111", file, fileList);
    },
    // 删除图片接口
    deleteFile(proofPath){
      console.log(proofPath,"zzzzz")
      let data ={
        path:proofPath
      }
      deleteFiles(data).then((res)=>{
        var code = res.statusCode;
        var msg = res.msg;
        if (code == 200) {
            this.$message({
              message: msg,
              type: "success",
            });
          } 
      })
    },
    //触发图片预览
    handlePreview(file) {
      const files = JSON.stringify(file);
      console.log("file:" + files);
      this.previewPath = "http://localhost:3000/"+file.pic;
      console.log("1231221" + this.previewPath);
      this.previewVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //监听图片上传成功
    handleSuccess(response) {
      //拼接得到图片信息对象
      const picInfo = { name: response.data.name, pic: response.data.path2 };
      // // 将修改后的综合测评信息存入浏览器localStorage
      localStorage.setItem("Proof", JSON.stringify(picInfo));
      console.log("图片信息：" + picInfo);
      //将图片信息对象，push到pics数组中
      this.fileList.push(picInfo);
      this.activityProofName = picInfo.name;
      console.log("图片信息：" + this.fileList);
    },
    Proofshow(path){
      console.log("1111"+path)
      this.previewVisible = true;
      this.previewPath = "http://localhost:3000/"+path;
    },
    // 上传证明信息
    add() {
      if (this.activityName === "") {
        alert("活动名称不能为空");
      } else if (this.activityNum === "") {
        alert("所得分数不能为空");
      } else if (this.activityProofName === "") {
        alert("还没上传证明图片");
      } else {
        const studentId = JSON.parse(localStorage.getItem("userInfo")).s_id;
        const proofPic = JSON.parse(localStorage.getItem("Proof")).pic;
        console.log("66666" + proofPic);
        let data = {
          activityName: this.activityName,
          activityNum: this.activityNum,
          activityProofPic: this.activityProofName,
          activityProofPath: proofPic,
          activityType: this.activityType,
          studentId: studentId,
        };
        addProof(data).then((res) => {
          var code = res.statusCode;
          var msg = res.msg;
          if (code == 200) {
            this.$message({
              message: msg,
              type: "success",
            });
          } else {
            this.$message({
              message: msg,
              type: "error",
            });
          }
        });
        this.myData.push({
          activityType: this.activityType,
          activityName: this.activityName,
          activityNum: this.activityNum,
          activityProofPic: this.activityProofName,
        });

        this.activityName = "";
        this.activityNum = "";
        this.activityProofName = "";
        this.fileList.splice(0, this.fileList.length); //清空数组
      }
      //   alert('添加')
    },
    // 删除证明信息
    deleteMsg(n) {
      console.log("qwqedwfew",this.myData[n].activityName)
        let data = {
          activityName: this.myData[n].activityName
        };
        console.log(data)
      deleteProof(data).then((res)=>{
         var code = res.statusCode;
          var msg = res.msg;
          var proofPath=res.data
          if (code == 200) {
            this.$message({
              message: msg,
              type: "success",
            });
            this.deleteFile(proofPath)
          } else {
            this.$message({
              message: msg,
              type: "error",
            });
          }
      })
      this.myData.splice(n, 1);
    },
  },
};
</script>

<style>
#box {
  width: 1000px;
  
}
.form-control {
  width: 500px;
}
.item {
  margin-left: 20px;
}

.previewImg{
  width: 100%;
  height: 100%;
}
</style>
