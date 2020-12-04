const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  console.log(ctx);
  ctx.body = {
    code:1,
    title: 'koa2 json'
  }
})

router.get('/echarts1', async (ctx, next) => {
  console.log(ctx)
  // let data = null;
  ctx.body = {
    code:1,
    // data: data
  }
})

module.exports = router
