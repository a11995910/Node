const router = require('koa-router')()
const selldata = require('../oracle/sql')

router.prefix('/market');

//页面路由
router.get('/', async function (ctx) {
    await ctx.render('market', {
        title: 'Hello Koa 2!'
    });
})

router.get('/echarts1', async (ctx, next) => {
    console.log(selldata.nowDaySellData())
    ctx.body = await selldata.nowDaySellData()
})
// router.get('/echarts2', async (ctx, next) => {
//     let data = null;
//     ctx.body = await selldata.yesterdaySellDate()
// })
// router.get('/all_kinds', async (ctx) => {
//     ctx.body = await selldata.allKindsDate()
// })
// router.get('/verbmonth', async (ctx) => {
//     ctx.body = await selldata.verbmonth()
// })
// router.get('/nowdayKindsDate', async (ctx) => {
//     ctx.body = await selldata.nowdayKindsDate()
// })
// router.get('/top10', async (ctx) => {
//     ctx.body = await selldata.top10()
// })

module.exports = router
