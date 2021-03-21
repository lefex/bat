/**
 * @author 公众号素燕
 * @description 网络第1题：前端网络请求都有哪些方式？webSocket 是什么？
 * @site 网站：https://lefex.github.io/bat/
 * @xiaoke 前端小课，帮助10W人入门并进阶前端
 */

// 同步请求
function requestSyncWithXHR1() {
    let xhr = new XMLHttpRequest();
    // 准备发起请求
    xhr.open('get', '/api/user', false);
    // 立即发起请求
    xhr.send(null);
    // 获取 xhr 的状态码
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        alert(xhr.responseText);
    }
    else {
        alert('request error: ' + xhr.status);
    }
}

// 异步请求
function requestAsyncWithXHR1() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = e => {
        if (xhr.readyState === 4) {
            // 获取 xhr 的状态码
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                alert(xhr.responseText);
            }
            else {
                alert('request error: ' + xhr.status);
            }
        }
    };
    // 异步请求
    xhr.open('get', '/api/user', true);
    xhr.send(null);
}

function requestAsyncWithXHR2() {
    let xhr = new XMLHttpRequest();
    // 设置超时时间
    xhr.timeout = 5000;
    // 设置 HTTP Header
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function(e) {
        // 获取 xhr 的状态码
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            alert(xhr.responseText);
        }
        else {
            alert('request error: ' + xhr.status);
        }
    };
    // 监听进度，比如监听文件上传进度
    xhr.onprogress = function(e) {

    };
    xhr.open('post', '/user/add', true);
    // post 请求的 body
    let formData = new FormData();
    formData.set('name', 'suyan');
    formData.set('pwd', '123suyan');
    xhr.send(formData);
}

// 更现代的 fetch api
function requestWithFetch() {
    const header = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    fetch('/add/user', {
        method: 'POST',
        body: JSON.stringify({
            name: 'suyan'
        }),
        headers: header
    }).then(res => {
        if ((res.status >= 200 && res.status < 300) || res.status === 304) {
            alert('success!')
        }
        else {
            alert('error: ' + res.status);
        }
    })
}

function beaconApi() {
    navigator.sendBeacon('https://lefex.gitee.io/', '{name: "suyan"}');
}

function websocket() {
    let socket = new WebSocket("ws://lefex.gitee.io/server.php");
    socket.onopen = function() {
        // socket open
    };
    socket.onerror = function() {
        // socket error
    };
    socket.onclose = function() {
        // socker close
    };
    let stringData = "suyan nihao";
    // 发送消息
    socket.send(stringData);
    let buffer = Uint8Array.from([1, 2, 3]);
    socket.send(buffer);
    // 接收到消息
    socket.onmessage = function(e) {
        let data = e.data;
    }
}