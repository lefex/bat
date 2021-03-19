#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# 发布到 lefex.github.io/fe-mini-course 下
# git push -f git@github.com:lefex/fe-mini-course.git master:gh-pages
# 发布到 lefex.github.io 下
git push -f git@github.com:lefex/bat.git master:gh-pages

cd -