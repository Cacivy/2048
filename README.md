# <img src="./src/assets/images/logo.png" alt="logo" width="50" height="50" />
[![Build Status](https://travis-ci.org/Cacivy/2048.svg?branch=master)](https://travis-ci.org/Cacivy/2048)
[![codecov](https://codecov.io/gh/Cacivy/2048/branch/master/graph/badge.svg)](https://codecov.io/gh/Cacivy/2048)
[![codebeat badge](https://codebeat.co/badges/4e11cf73-62e2-4321-8a67-195c555618cf)](https://codebeat.co/projects/github-com-cacivy-2048-master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](#badge)

+ style-components　可以说是非常好用了，相对于css modules
+ mobx-state-tree 实现状态管理，以及回退功能(Time travel)
+ travis + gh-pages 自动构建打包发布git pages
+ codecov


### DEV

```
npm i / yarn

yarn start

yarn build

yarn reploy / git subtree push --prefix build origin gh-pages
```

### TODO

- [x] UI优化
- [x] 移动端适配
- [x] localStorage
- [ ] 成功/失败提示优化
- [ ] Timer
- [x] PWA
- [x] i18n
- [x] Test

### THANKS

样式/i18n 参考 [React-2048-game](https://github.com/devrsi0n/React-2048-game)

### License

[MIT](https://opensource.org/licenses/MIT)
