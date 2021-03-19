<template>
  <main
    class="home"
  >
    <TopBanner/>
    <MainCard/>
    <Content class="theme-default-content custom"/>
    <Footer/>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import TopBanner from '@theme/components/TopBanner.vue'
import MainCard from '@theme/components/MainCard.vue'
import SubMainCard from '@theme/components/SubMainCard.vue'
import Footer from '@theme/components/Footer.vue'
import ThirdCard from '@theme/components/ThirdCard.vue'

export default {
  name: 'Home',

  components: {
    NavLink,
    TopBanner,
    MainCard,
    SubMainCard,
    Footer,
    ThirdCard
  },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width $homePageWidth
  margin 0px auto
  display block
  .content-card
    margin-top 20px
    background-color #fff
    padding 20px
    border-radius 8px
    .title
      font-size 24px
      font-weight 500
      color #222
    .features
      display flex
      flex-wrap wrap
      align-items flex-start
      justify-content flex-start
      border-radius 8px
      padding 10px
    .feature
      box-sizing content-box
      flex-grow 1
      flex-basis 16.85%
      max-width 16.85%
      border 1px solid $borderColor
      border-radius 8px
      padding 8px
      margin 10px 20px 0 0
      cursor pointer
      .sutitle
        font-size 18px
        font-weight 500
        border-bottom none
        padding 0
        color #333
      .des
        color #555
        padding 0

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
