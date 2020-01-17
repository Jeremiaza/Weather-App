const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";
const targetCity = process.env.TARGET_CITY || "Helsinki,fi";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};
const fetchMyWeather = async (lon, lat) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

router.get('/api/myweather', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchMyWeather(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData : {};
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
