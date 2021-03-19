<template>
    <div class="footer-wrap">
        <div class="content">
            <div class="qrcode"></div>
            <div class="des-box">
                <div class="title">帮助 10W 人入门并进阶前端</div>
                <div class="title">微信扫码关注我，和我一起成长</div>
                <div class="copyright">Copyright © 2020 素燕</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'footer-bar',
    props: {
        msg: String
    }
};
</script>

<style lang="stylus">
.footer-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    background-color: $themeBgColor3;
    .content {
        display: flex;
        margin: 1.875rem auto;
        .qrcode {
            display: inline-block;
            flex-shrink: 0;
            width: 7.5rem;
            height: 7.5rem;
            background-image: url(//s1.ax1x.com/2020/10/10/06VvOx.png);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 0 0;
        }
        .des-box {
            display: inline-block;
            height: 100%;
            margin: 0 1.25rem 0;
            .title {
                color: #222;
                font-size: 1.125rem;
                padding: 0.5rem 0;
            }
            .copyright {
                color: #222;
                font-size: 0.875rem;
                padding-top: 0.5rem;
            }
        }
    }
}
@media (max-width: $MQMobile)
  .footer-wrap
    .content
      flex-direction column
      justify-content center
      align-items center
      .des-box
        text-align center

</style>