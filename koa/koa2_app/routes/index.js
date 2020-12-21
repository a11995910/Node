const router = require('koa-router')()
const selldata = require('../mysql/sql')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/echarts1', async (ctx, next) => {
  let data = null;
  ctx.body = await selldata.nowDaySellData()
})
router.get('/echarts2', async (ctx, next) => {
  let data = null;
  ctx.body = await selldata.yesterdaySellDate()
})
router.get('/all_kinds',async (ctx)=>{
  ctx.body = await selldata.allKindsDate()
})
router.get('/verbmonth',async (ctx)=>{
  ctx.body = await selldata.verbmonth()
})
router.get('/nowdayKindsDate',async(ctx)=>{
  ctx.body = await selldata.nowdayKindsDate()
})
router.get('/top10',async(ctx)=>{
  ctx.body = await selldata.top10()
})

module.exports = router
