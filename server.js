const express = require('express');
const app = express();
const axios = require('axios');
const _ = require('lodash');

app.use(express.static('public'));

app.set('view engine', 'pug')

app.get('/', async function(request, response) {
  response.render(
    'index',
    {
      predictions: await getBusPredictions()
    }
  );
});

async function getBusPredictions() {
  
  const url = `http://ctabustracker.com/bustime/api/v2/getpredictions?key=${process.env.CTA_KEY}&rt=50&stpid=14963,8905&format=json`;
  
  const response = await axios.get(url);
  
  console.dir(JSON.stringify(response.data));
  
  return _.orderBy(response.data['bustime-response']['prd'], ['stpnm', 'prdctdn'])
}

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
