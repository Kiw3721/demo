<template>
  <div class="dashboard-container">
      <div class="title-container">
        <h3>欢迎{{ account }}进入该系统</h3>
      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "demo",
  data() {
    return {
     
    };
  },
  computed: {
    ...mapGetters(["account"])
  },
  created() {
   
  },
  methods: {
   
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    position: relative;
    width: 620px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  &-text {
    font-size: 25px;
    line-height: 46px;
    text-align: center;
    margin: 10px 0;
  }

}
</style>
