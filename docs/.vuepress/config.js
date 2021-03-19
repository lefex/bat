/**
 * @file config.js
 * @author wangsuyan
 * @description 网站配置文件
 */
const {description} = require('../../package');

module.exports = {
    title: '挑战BAT前端面试',
    description: description,
    base: '/bat/',

    head: [
        ['meta', {name: 'theme-color', content: '#3e77e9'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],

    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        nav: [
            {
                text: '关于本站',
                link: 'https://lefex.gitee.io/bat/about.html'
            },
            {
                text: 'github',
                link: 'https://github.com/lefex/bat'
            }
        ]
    },

    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom'
    ]
};

