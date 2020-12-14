const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

//路由引入
const index = require('./routes/index')
const login = require('./routes/login')
const users = require('./routes/users')

// error handler
onerror(app)

// 中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 静态资源路径
app.use(require('koa-static')(__dirname + '/public'))

// 前端路径与模板语法
app.use(views(__dirname + '/views', {
  extension: 'html'
  // extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
//传递路由文件至此，添加至中间件
app.use(login.routes(), login.allowedMethods()) //allowedMethods 配置响应头
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
