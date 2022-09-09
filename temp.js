const https = require('https');
let result;
const options = {
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
      console.log(`result : ${JSON.stringify(result)}`);
    });
  })
  .on('error', (err) => {
    console.log('Error: ', err.message);
  });
req.write(
  'usrIdx=933249&advCorp=adpopcorn&advKind=video&advIdx=LAZY_FULL_BANNER_NONSKIP&deviceId=8cf798bd627h5s9v'
);
req.end();

// {
//   usrIdx: 933249,
//   advCorp: 'adpopcorn',
//   advKind: 'video',
//   advIdx: 'LAZY_FULL_BANNER_NONSKIP',
//   deviceId: '8cf798bd638h5s9v',
// }
