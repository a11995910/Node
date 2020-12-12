const router = require('koa-router')()

// 设置本js根目录为/users
router.prefix('/users')

//页面路由
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
