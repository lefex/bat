<template>
  <div class="thrid-card-wrap">
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in cards" :key="item.title">
          <div class="third-card-item" @click="open(item)">
            <p class="title">{{item.title}}</p>
            <p class="des">{{item.des}}</p>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            cards: []
        }
    },
    mounted() {
        this.cards = this.$page.frontmatter.titleDesLinks;
    },
    methods: {
        open(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

<style lang="stylus">
.thrid-card-wrap
   margin-top 20px
.el-row
  margin-bottom 20px
  &:last-child
    margin-bottom 0
.el-col
  border-radius: 4px
.third-card-item
  padding 16px
  border-radius 4px
  min-height 80px
  background #fff
  cursor pointer
  transition .55s all
  &:hover
    color $accentColor
  .title
    font-weight 700
    margin-block 0
    margin 0
    font-size 14px
  .des
    font-size 14px
    margin 8px 0 0 0
</style>
