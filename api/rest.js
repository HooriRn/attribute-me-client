const express = require('express');
const axios = require('axios');
const app = express();
const URL = require("url").URL;
const validUrls = ['https://m.thorchain.org/', 'https://www.thorchain.org/']
const cors = require('cors');

const corsOptions = {
  origin: ['https://www.attribute.me', 'attribute-me-client-git-main-skald.vercel.app']
}

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors(corsOptions))

function checkValid(url) {
  if (validUrls.some(u => url.startsWith(u)))
    return true
  return false
}

function createExpressApp() {

  app.post('/api/link', async (req, res)=>{
    try{
      console.log('links is called!');
      headers = {
        'Content-Type': 'application/json',
        'apikey': process.env.REBRANDLY_API,
        'workspace': process.env.REBRANDLY_WORKSPACE //thorchain.org workspace
      }
      const url = new URL(req.body.preview);
      url.searchParams.append(`utm_source`, req.body.channel);
      url.searchParams.append(`utm_medium`, req.body.handle);
      url.searchParams.append(`utm_campaign`, req.body.campaign);
      if (!checkValid(url.href)) {
        throw new Error('The link is not vaild!');
      }
      let rebrandlyRes = await axios.post('https://api.rebrandly.com/v1/links', {
        'destination': url.href,
        'domain': {
          id: '4c39ef7ca92849d6aa93e6440973a31e', //click.thorchain.link
          fullName: 'click.thorchain.link'
        }
      }, { headers });
      res.json(rebrandlyRes.data.shortUrl);
    }
    catch(e){
      console.error(e)
      res.status(400).send(e)
    }
  })

  return app
}

module.exports = createExpressApp()
