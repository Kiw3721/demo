<template>
  <div class="dashboard-container">
      <div class="title-container">
        <h3>欢迎{{ account }}进入该系统</h3>
      </div>
  
    <el-carousel indicator-position="none" arrow="always" :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in dataimg" :key="index">
          <el-row>
            <el-col :span="24" class="banner_img">
              <span>{{item.tet2}}</span>
              <img ref="image" :src="item.src" alt="" @load="imageLoaded" class="img">
            </el-col>
          </el-row>
        </el-carousel-item>
    </el-carousel>

  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "demo",
  data() {
    return {
      bannerHeight:"",
     dataimg: [{
						src: require('../../assets/images/lb1.jpg'),
						txt2: '图1',
					},
					{
						src: require('../../assets/images/lb2.jpg'),
						txt2: '图2',
					},
					{
						src: require('../../assets/images/lb3.jpg'),
						txt2: '图3',
					}
				]
    };
  },
  computed: {
    ...mapGetters(["account"])
  },
  created() {
   
  },
  methods: {
   imageLoaded(){
       this.$nextTick(()=>{
         this.bannerHeight = this.$refs.image[0].height
         console.log(this.$refs.image[0].height)
       })
     
   }
  },
  mounted () {
    this.imageLoaded();
    window.addEventListener( 'resize', () => {
      this.bannerHeight = this.$refs.image[0].height
      this.imageLoaded();
      }, false)
      }, 
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    position: relative;
    width: 100%px;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
  }

}
h3{
  font-size: 24px;
  text-align: center;
}

.el-carousel__item span {
    color: #475669;
    font-size: 25px;
    opacity: 0.75;
    line-height: 30px;
    margin: 0 auto;
  }

  .img{
    display: inline-block; 
    width: 100%; 
    max-width: 100%; 
    height: auto;
  }

</style>
