const router = require('koa-router')()

router.prefix('/login')

router.get('/',(ctx,next)=>{
    ctx.body = 'this is login！'
})

module.exports = router