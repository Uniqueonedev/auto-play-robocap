const express = require('express');
const https = require('https');
const encryptTxt = require('./script');

const app = express();
const router = express.Router();
const port = process.env.PORT || 1973;

async function getLife() {
  let getLifeLine;

  const optionsGetLifeLine = {
    hostname: 'www.lazyplay.io',
    path: '/api/v1/user_adv/view_adv',
    method: 'POST',
    headers: {
      'User-Agent': 'okhttp/4.5.0',
      Accept: 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': 103,
      Authorization: 'Bearer',
      LangCd: 'en',
      Platform: 'LAZY',
      Os: 'AOS',
      Ver: '1.1.7',
      Adid: 'f77cf11b-8775-45bb-94e3-bcf6f25ca9ee',
      Ssid: '8cf798bd629c26f7',
    },
  };

  const reqGetLifeLine = https
    .request(optionsGetLifeLine, (res) => {
      let data = '';

      console.log('Status Code:', res.statusCode);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // console.log('Body: ', JSON.parse(data));
        console.log(`Got Lifeline`);
        getLifeLine = JSON.parse(data);
        console.log(`getLifeLine : ${JSON.stringify(getLifeLine)}`);
      });
    })
    .on('error', (err) => {
      console.log('Error: ', err.message);
    });
  reqGetLifeLine.write(
    'usrIdx=936810&advCorp=adpopcorn&advKind=video&advIdx=LAZY_FULL_BANNER_NONSKIP&deviceId=8ct798bd627h5s9v'
  );
  reqGetLifeLine.end();

  await new Promise((resolve, reject) => {
    const lifecheckpoint = setInterval(() => {
      console.log(`waiting for Life line`);
      if (getLifeLine) {
        // console.log(`done`);
        clearInterval(lifecheckpoint);
        resolve();
      }
    }, 100);
  });
}
async function Main() {
  let result;

  const options = {
    hostname: 'www.lazyplay.io',
    path: '/api/v1/game/start_game?gameIdx=7&usrIdx=936810',
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      Referer:
        'https://www.lazyplay.io/games/stackBuild_4/index.html?usrIdx=936810&gameIdx=7&api_game_url=https://www.lazyplay.io',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': 2,
      Origin: 'https://www.lazyplay.io',
      Cookie:
        '_ga=GA1.1.918315794.1662743096; __gads=ID=2a51911a9e20d804-229f4b2964d6002d:T=1662743097:RT=1662743097:S=ALNI_MbqkO5nGTyJnVTWxzfj2dY09BJpLw; __gpi=UID=000009a425816044:T=1662743097:RT=1662743097:S=ALNI_MbPWrI_kUpjCbSA_meYVwDz2AhhDA; ch-veil-id=e045d389-0ef0-4df2-975b-a47918d70bf7; JSESSIONID=C1B8BC3845193379DB495922FE5089BE; ch-session-97975=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiI5Nzk3NS02MzFiNzIzYTZmYWU3M2Y2MjJiMSIsImlhdCI6MTY2Mjc0MzI4MCwiZXhwIjoxNjY1MzM1MjgwfQ.P_8tH6ppOWnv7tshu27tOFGLD6aFAaE1SeVwpdsiK2g; _ga_LPFJETZ4SG=GS1.1.1662743096.1.1.1662743664.0.0.0',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
    },
  };

  const req = https
    .request(options, (res) => {
      console.log(`result getting`);
      let data = '';

      console.log('Status Code:', res.statusCode);

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        // console.log('Body: ', JSON.parse(data));
        console.log(`Start game API response arrived`);
        result = JSON.parse(data);
      });
    })
    .on('error', (err) => {
      console.log('Error: ', err.message);
    });

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function automate() {
    console.log(`wait for 3 second...`);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(`wait finished`);
        resolve();
      }, 3000);
    });

    req.write(JSON.stringify({}));
    req.end();

    await new Promise((resolve, reject) => {
      const checkpoint = setInterval(() => {
        console.log(`waiting for Start game API response`);
        if (result) {
          // console.log(`done`);
          clearInterval(checkpoint);
          resolve();
        }
      }, 100);
    });
    console.log(`result: ${JSON.stringify(result)}`);
    const newEncKey = result.data.encKey.substring(0, 20);
    console.log(`newEncKey ${newEncKey}`);
    const points = randomIntFromInterval(190, 210);
    console.log(`Points : ${points}`);
    const text =
      points + '^' + points + '^' + 936810 + '^' + 7 + '^' + newEncKey;
    console.log(text);
    const finalKey = await encryptTxt('bItOnE0414!AgAMe', text);
    console.log(`Data : ${finalKey}`);

    let result2;
    const scoreOptions = {
      hostname: 'www.lazyplay.io',
      path: `/api/v1/game/insertScore_game?encKey=${finalKey}%0A`,
      method: 'POST',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
        Accept: '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        Referer:
          'https://www.lazyplay.io/games/stackBuild_4/index.html?usrIdx=936810&gameIdx=7&api_game_url=https://www.lazyplay.io',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 2,
        Origin: 'https://www.lazyplay.io',
        Connection: 'close',
        Cookie:
          '_ga=GA1.1.918315794.1662743096; __gads=ID=2a51911a9e20d804-229f4b2964d6002d:T=1662743097:RT=1662743097:S=ALNI_MbqkO5nGTyJnVTWxzfj2dY09BJpLw; __gpi=UID=000009a425816044:T=1662743097:RT=1662743097:S=ALNI_MbPWrI_kUpjCbSA_meYVwDz2AhhDA; ch-veil-id=e045d389-0ef0-4df2-975b-a47918d70bf7; JSESSIONID=C1B8BC3845193379DB495922FE5089BE; ch-session-97975=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiI5Nzk3NS02MzFiNzIzYTZmYWU3M2Y2MjJiMSIsImlhdCI6MTY2Mjc0MzI4MCwiZXhwIjoxNjY1MzM1MjgwfQ.P_8tH6ppOWnv7tshu27tOFGLD6aFAaE1SeVwpdsiK2g; _ga_LPFJETZ4SG=GS1.1.1662743096.1.1.1662743664.0.0.0',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
    };
    const req2 = https
      .request(scoreOptions, (res) => {
        let data = '';

        console.log('Status Code:', res.statusCode);

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          // console.log('Body: ', JSON.parse(data));
          result2 = JSON.parse(data);
        });
      })
      .on('error', (err) => {
        console.log('Error: ', err.message);
      });

    console.log('Playing game for 5 seconds');
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });

    req2.write(JSON.stringify({}));
    req2.end();

    await new Promise((resolve, reject) => {
      const checkpoint = setInterval(() => {
        console.log(`waiting for Insert score game API response`);

        if (result2) {
          console.log(`Insert score game API response arrived`);
          clearInterval(checkpoint);
          resolve();
        }
      }, 100);
    });

    console.log(result2);
    result = null;
  }

  await automate();
}
try {
  async function call() {
    for (let a = 0; true; a++) {
      console.log(`Iteration : ${a + 1}`);
      await getLife();
      await Main();
      console.log(`Request Successful : ${a + 1}, Waiting for 20 second`);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`wait finished`);
          resolve();
        }, 20000);
      });
    }
  }

  app.use('/', router);
  router.get('/start', (req, res) => {
    console.log(`Project started......`);
    await call();
    res.send('Project Started');
  });
} catch (error) {
  console.error(error);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
