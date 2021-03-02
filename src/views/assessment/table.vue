<template>
  <div class="table-container">
    <!-- <div style="font-size:25px;padding:15px;text-align: center;">思想品德分(20分)-自评</div> -->
    <table class="moralTable" :model="moralTable" cellpadding="20" cellspacing="0">
      <caption>
        <span>思想品德分(20分)-自评</span>
        <el-button size="mini">提交</el-button>
      </caption>
      <tbody>
        <tr>
          <td>思想政治观念(15分)</td>
          <td contenteditable="true" />
          <td>纪律观念(14分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>集体观念(13分)</td>
          <td contenteditable="true" />
          <td>基础文明修养(13分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>学生公寓表现(15分)</td>
          <td contenteditable="true" />
          <td>社会实践(15分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>奖分+(15分)</td>
          <!-- <td>
            <el-popover
              ref="moral1"
              placement="top-start"
              title="标题"
              :width="200"
              trigger="hover"
              content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
            >
              <template v-popover:moral1>
                <el-button type="text">奖分+(15分)</el-button>
              </template>
            </el-popover>
          </td> -->
          <td contenteditable="true" />
          <td>扣分-</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>小计(*20%前)</td>
          <td contenteditable="true" />
          <td>思想品德分得分(*20%后)</td>
          <td contenteditable="true" />
        </tr>
      </tbody>
    </table>

    <!-- <div style="font-size:25px;padding:15px;text-align: center;"></div> -->
    <table class="studyTable" :model="studyTable" cellpadding="20" cellspacing="0">
      <caption>
        <span>学业分(70分)-自评</span>
        <el-button size="mini" @click="getStudy">提交</el-button>
      </caption>
      <tbody>
        <tr>
          <td>学习成绩(90分)</td>
          <td id="test" contenteditable="true" />
        </tr>
        <tr>
          <td>奖分+(10分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>扣分-</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>小计(*70%前)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>学业分得分(*70%后)</td>
          <td contenteditable="true" />
        </tr>
      </tbody>
    </table>
    <!-- <div style="font-size:25px;padding:15px;text-align: center;"></div> -->
    <table class="sportTable" :model="studyTable" cellpadding="20" cellspacing="0">
      <caption>
        <span>文体表现分(10分)-自评</span>
        <el-button size="mini">提交</el-button>
      </caption>
      <tbody>
        <tr>
          <td>体育课分(60分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>文体活动分(10分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>奖分+(30分)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>扣分-</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>小计(*10%前)</td>
          <td contenteditable="true" />
        </tr>
        <tr>
          <td>文体表现分得分(*10%后)</td>
          <td contenteditable="true" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    getStudy() {
      var obj = document.getElementById('test')

      alert(obj.textContent)
    }
  }
}
</script>

<style>
.table-container{
    position: relative;
    width: 900px;
    max-width: 100%;
    margin: 20px auto;
    overflow: hidden;
    padding: 10px;
}

.moralTable
.studyTable
.sportTable{
 margin: 15px auto;
 text-align: center;
}

.moralTable td{
 border: 1px solid #a2b1c4;
 width: 300px;
}

.studyTable td,
.sportTable td{
  width: 500px;
  border: 1px solid #a2b1c4;
  margin-top: 20px;
}

caption span{
  font-size:25px;
  padding:15px 30px;
}

</style>
