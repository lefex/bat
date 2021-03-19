<template>
  <div class="submin-card-item-wrap">
    <el-row :gutter="16">
      <el-col :span="4" v-for="item in cards" :key="item.title">
          <div class="submin-card-item">{{item.title}}</div>
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
        this.cards = this.$page.frontmatter.titleLinks;
    },
    methods: {
        open(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

<style lang="stylus">
.submin-card-item-wrap
   margin-top 20px
   background-color #fff
   padding 20px
.el-row
  margin-bottom 20px
  &:last-child
    margin-bottom 0
.el-col
  border-radius: 4px
.submin-card-item
  background #f8f8f8
  border-radius 4px
  min-height 40px
  text-align center
  line-height 40px
  font-size 14px
  cursor pointer
  transition .55s all
  &:hover
    color $accentColor

</style>
