import Koa from 'koa';
import route from 'koa-route';
import bodyParser from 'koa-bodyparser';
import { auth } from './controller';


const app = new Koa();
app.use(bodyParser());

app.use(route.post('/auth/', auth));

app.listen(4000);
console.log('listening on port 4000');