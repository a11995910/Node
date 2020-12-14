/**
 * 创建路由实例，完成后露出 至app.js引用渲染至中间件
 */
const router = require('koa-router')()   //引入与实例化

//ctx,上下文，包含了request response等信息
router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
//get传值
/**
 * ctx.query :json形式输出请求参数
 * ctx.querystring：字符串形式输出请求参数  uis=123&ic=sss
 * ctx.url:获取url地址  /data?uis=123&ic=sss
 */
router.get('/data', async (ctx, next) => {
  console.log(ctx.query);
  ctx.body = ctx.query
})

//动态路由
/**
 * :key可以捕获url最后动态的传值
 */
router.get('/catch/:keywords',async(ctx)=>{
  console.log(ctx.params);
  var keywords = ctx.params.keywords;
  ctx.body = `动态路由${keywords}`
})



module.exports = router
