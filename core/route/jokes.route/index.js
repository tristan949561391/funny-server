const Router = require('koa-router');
const jokesService = require('./jokes.service');
module.exports = route = new Router().prefix('/jokes');


route.post('/list', async (ctx) => {
  let pagework = ctx.request.body.pagework || {};
  if (!pagework.pageNum) pagework.pageNum = 1;
  if (!pagework.pageSize) pagework.pageSize = 20;
  let filter = ctx.request.body.filter || {};
  let sort = ctx.request.body.sort || {};
  let res = await jokesService.getJokers(pagework, filter, sort);
  ctx.body = res;
});


route.post('/type/list', async (ctx) => {
  let res = []
  res.push({name: "全部", type: 0});
  let ts = await jokesService.getJokerTypes();
  ts.forEach((t) => {
    res.push(t);
  });
  ctx.body = res;
});

route.post("/praise/:_id", async (ctx) => {
  let joke = await jokesService.praiseJoker(ctx.params._id);
  ctx.body = joke
});
