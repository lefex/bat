<template>
  <div class="main-min-card-wrap">
    <el-row :gutter="20">
      <el-col :span="4" v-for="item in cards" :key="item.title">
          <div class="main-card-item" @click="open(item)">
              <el-image
                style="width: 100%; height: 100px"
                :src="item.logo"
                :fit="cover">
            </el-image>
            <p class="title">{{item.title}}</p>
            <p class="des">{{item.des}}</p>
          </div>
      </el-col>
      <el-col :span="4" v-for="item in cards2" :key="item.title">
          <div class="main-card-item" @click="open(item)">
              <el-image
                style="width: 100%; height: 100px"
                :src="item.logo"
                :fit="cover">
            </el-image>
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
        this.cards = this.$page.frontmatter.mainCards;
        this.cards2 = this.$page.frontmatter.mainCards2;
    },
    methods: {
        open(item) {
            window.open(item.link, '_blank');
        }
    }
}
</script>

<style lang="stylus">
.main-min-card-wrap
  margin-top 20px
.el-row
  margin-bottom 0
  &:last-child
    margin-bottom 0
.el-col
  border-radius: 4px
  margin-bottom 20px
.main-card-item
  border-radius 6px
  min-height 100px
  background-color #fff
  cursor pointer
  transition .55s all
  &:hover
    color $accentColor
  .title
    padding 0 16px
    font-weight 700
    margin-block 0
    margin 8px 0 0 0
    font-size 14px
  .des
    padding 0 16px 16px 16px
    font-size 14px
    margin 8px 0 0 0
</style>
