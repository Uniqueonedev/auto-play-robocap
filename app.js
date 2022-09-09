const express = require('express');
const https = require('https');
const encryptTxt = require('./script');

const app = express();
const port = process.env.PORT || 5000;

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
    'usrIdx=935872&advCorp=adpopcorn&advKind=video&advIdx=LAZY_FULL_BANNER_NONSKIP&deviceId=8cf798bd627h5s9v'
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
    path: '/api/v1/game/start_game?gameIdx=7&usrIdx=935872',
    method: 'POST',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:104.0) Gecko/20100101 Firefox/104.0',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      Referer:
        'https://www.lazyplay.io/games/stackBuild_4/index.html?usrIdx=935872&gameIdx=7&api_game_url=https://www.lazyplay.io',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': 2,
      Origin: 'https://www.lazyplay.io',
      Cookie:
        '_ga=GA1.1.575998546.1662609691; JSESSIONID=33697A37EAAD08E8AF13C8A27CF85187; __gads=ID=460b340d89935062-22765ad74fd60094:T=1662609743:RT=1662609743:S=ALNI_MYSnmL7K5lF13Je6pTARvmdvMMpYw; __gpi=UID=00000994a896dbcd:T=1662609743:RT=1662609743:S=ALNI_MYDgnmR9xISMMJYKFqAZ77tYZ595w; ch-veil-id=3012ba22-792e-45c9-bb32-55d9f50fd208; ch-session-97975=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiI5Nzk3NS02MzE5Njk1MGRlYTYzMTM2OTZjNyIsImlhdCI6MTY2MjYwOTc0NCwiZXhwIjoxNjY1MjAxNzQ0fQ.x6M2wzVHvCi8G1rVERXKVWhwtZSHMRsJAzNsL4_xpPw; _ga_LPFJETZ4SG=GS1.1.1662609691.1.1.1662609898.0.0.0',
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
      points + '^' + points + '^' + 935872 + '^' + 7 + '^' + newEncKey;
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
          'https://www.lazyplay.io/games/stackBuild_4/index.html?usrIdx=935872&gameIdx=7&api_game_url=https://www.lazyplay.io',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': 2,
        Origin: 'https://www.lazyplay.io',
        Connection: 'close',
        Cookie:
          '_ga=GA1.1.575998546.1662609691; JSESSIONID=33697A37EAAD08E8AF13C8A27CF85187; __gads=ID=460b340d89935062-22765ad74fd60094:T=1662609743:RT=1662609743:S=ALNI_MYSnmL7K5lF13Je6pTARvmdvMMpYw; __gpi=UID=00000994a896dbcd:T=1662609743:RT=1662609743:S=ALNI_MYDgnmR9xISMMJYKFqAZ77tYZ595w; ch-veil-id=3012ba22-792e-45c9-bb32-55d9f50fd208; ch-session-97975=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzZXMiLCJrZXkiOiI5Nzk3NS02MzE5Njk1MGRlYTYzMTM2OTZjNyIsImlhdCI6MTY2MjYwOTc0NCwiZXhwIjoxNjY1MjAxNzQ0fQ.x6M2wzVHvCi8G1rVERXKVWhwtZSHMRsJAzNsL4_xpPw; _ga_LPFJETZ4SG=GS1.1.1662609691.1.1.1662609898.0.0.0',
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

    console.log('Playing game for 60 seconds');
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 60000);
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
      console.log(`Request Successful : ${a + 1}, Waiting for 25 second`);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(`wait finished`);
          resolve();
        }, 25000);
      });
    }
  }
  call();

  setInterval(function () {
    https.get('https://auto-play.herokuapp.com/');
    console.log('Ping Our Application....To make it alive........');
  }, 300000); // every 5 minutes (300000)
} catch (error) {
  console.error(error);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
