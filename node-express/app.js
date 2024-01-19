require('dotenv').config();
const statsig = require('statsig-node');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(cookieParser());
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

/**
* global middleware to set a cookie if it doesn't exist
* passes the uuid down to route handlers on req object
*/
app.use(async (req, res, next) => {
  let statsigDeviceID;
  if (req.cookies['statsig_uuid']) {
    statsigDeviceID = req.cookies['statsig_uuid'];
  }
  else {
    statsigDeviceID = uuidv4();
    res.cookie('statsig_uuid', statsigDeviceID);
  }
  req.statsigDeviceID = statsigDeviceID;
  next();
})

app.get('/', async (req, res) => {
  const user = {
    // use the random uuid in cookie as the userID
    // in practice, you'd use a known userID here
    userID: req.statsigDeviceID,
    country: 'US',
    custom: {
      employee: true
    }
  };
  const testGroup = statsig.getExperimentSync(user, 'express_app_test').get('variant', 'control');
  const backgroundFeatureEnabled = statsig.checkGate(user, 'express_app_bg');
  res.render('index.hbs', { 
    testGroup,
    backgroundFeatureEnabled
  });
});

app.listen(port, async () => {
  const runtimeEnv = process.env.STATSIG_ENV_TIER || 'production';
  await statsig.initialize(process.env.STATSIG_SERVER_KEY, {
    environment: { tier: runtimeEnv },
  });
  console.log(`Example app listening in ${runtimeEnv} on port ${port}`);
})