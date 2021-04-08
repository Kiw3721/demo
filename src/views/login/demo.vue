<template>
  <div class="dashboard-container">
  
    <el-carousel indicator-position="none" arrow="always" :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in dataimg" :key="index">
          <el-row>
            <el-col :span="24" class="banner_img">
              <h4>欢迎{{ account }}进入该系统</h4>
              <!-- <span>{{item.tet2}}</span> -->
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
						src: require('../../assets/images/w1.png'),
						txt2: '图1',
					},
					{
						src: require('../../assets/images/w2.png'),
						txt2: '图2',
					},
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

h4{
  margin-left: 20px;
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
