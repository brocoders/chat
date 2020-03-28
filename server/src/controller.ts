import Koa from 'koa';

import { getToken } from './twilio';

export function auth(this: Koa.Context, ctx: Koa.Context) {
  const { user } = ctx.request.body;
  if (!user) {
    ctx.response.status = 403;
    ctx.body = 'Forbidden';
  } else {
    ctx.body = {
      token: getToken(user),
    };
  }
}
