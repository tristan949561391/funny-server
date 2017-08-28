const Router = require('koa-router');
const homeService = require('./home.service');
module.exports = route = new Router();


route.post('/', async (ctx) => {
  let pagework = ctx.request.body.pagework || {};
  if (!pagework.pageNum) pagework.pageNum = 1;
  if (!pagework.pageSize) pagework.pageSize = 20;
  let filter = ctx.request.body.filter || {};
  let sort = ctx.request.body.sort || {};
  let res = await homeService.getJokers(pagework, filter,sort);
  ctx.body = res;
});
