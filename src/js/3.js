/**
 * @author 公众号素燕
 * @description 第3题：事件循环
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

// 事件循环
function eventLoop() {
    var eventLoop = [];
    var event;
    while(true) {
        if (eventLoop.length > 0) {
            event = eventLoop.shift();

            try {
                event();
            } catch (e) {
                
            }
        }
    }
}