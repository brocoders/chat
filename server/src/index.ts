import Koa from 'koa';
import route from 'koa-route';
import bodyParser from 'koa-bodyparser';
import { getToken } from './twilio';

const app = new Koa();
app.use(bodyParser());

app.use(route.post('/auth/', (ctx) => {
  const { user } = ctx.request.body;
  if (!user) {
    ctx.response.status = 403;
    ctx.body = 'Forbidden';
  } else {
    ctx.body = {
      token: getToken(user),
    };
  }
}));

app.listen(4000);
console.log('listening on port 4000');