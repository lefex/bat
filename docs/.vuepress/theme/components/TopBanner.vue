<template>
  <div class="top-banner-wrap">
    <el-carousel height="200px" :interval="6000">
      <el-carousel-item v-for="item in banners" :key="item.title">
        <div @click="open(item)">
          <h3 class="title">{{item.title}}</h3>
          <h3 class="des">{{item.des}}</h3>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
    data() {
        return {
            banners: []
        }
    },
    mounted() {
        this.banners = this.$page.frontmatter.banners;
    },
    methods: {
        open(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

<style lang="stylus">
.top-banner-wrap
   margin-top 6px
.el-carousel__item
  color #fff
  border-radius 4px
  margin 0
  text-align center
  cursor pointer
  .title
    font-size 38px
    font-weight 700
  .des
    font-size 20px
.el-carousel__item:nth-child(2n)
  background-color #409EFF

.el-carousel__item:nth-child(2n+1)
  background-color #F56C6C
</style>
