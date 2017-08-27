const Koa = require('koa');
const Koa_logger = require('koa-logger');
const Koa_parser = require('koa-bodyparser');
const Koa_error=require('koa-json-error');
const Koa_cors=require('kcors');
module.exports = app = new Koa();


app.use(Koa_logger());
app.use(Koa_parser());
app.use(Koa_error());
app.use(Koa_cors());


app.use(async (ctx) => {

    ctx.body = 'hello world'
});