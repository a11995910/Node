const router = require('koa-router')();

// 设置本js根目录为/users
router.prefix('/users')

//页面路由
router.get('/', async function(ctx){
  await ctx.render('user/index')
})
router.get('/bar', function (ctx, next) {
  var uid = ctx.query.uid;
  console.log(ctx.query)
  console.log(`查询：用户id：${uid}`);
  ctx.body = 'this is a users/bar response'
})

module.exports = router
