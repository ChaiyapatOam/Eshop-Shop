import axios from 'axios'
var data = JSON.stringify({
  "qrType": "PP",
  "ppType": "BILLERID",
  "ppId": "875147368312544",
  "amount": "1.00",
  "ref1": "REFERENCE1",
  "ref2": "REFERENCE2",
  "ref3": "SCB"
});

var config = {
  method: 'post',
  url: 'https://api-sandbox.partners.scb/partners/sandbox/v1/payment/qrcode/create',
  headers: { 
    'Content-Type': 'application/json', 
    'accept-language': 'EN', 
    'authorization': 'Bearer de6b9c23-fbcc-4836-87a8-d31684cf048d', 
    'requestUId': '1b01dff2-b3a3-4567-adde-cd9dd73c8b6d', 
    'resourceOwnerId': 'l72c003a1a84454b0886dd105590474cf5', 
    'Cookie': 'TS01e7ba6b=01a990b48eda1572c3d3bb0a9c62ab0a3b4f53de6a53ece2b024e6879b5246c91149c7673be2461be9296d570680037489468187f3'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
