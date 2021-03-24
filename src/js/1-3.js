/**
 * @author 公众号素燕
 * @description 几道面试题让你搞懂 Promise
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

function vipActivity() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, 100);
    });
}

function sign() {
    return false;
}
