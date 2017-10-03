const CryptoJS = require("crypto-js");
const http = require('axios');

var d = new Date;
var expiration = 3600; // 1 hour,
var unixtime = parseInt(d.getTime() / 1000);
var future_unixtime = unixtime + expiration;
var publicKey = "c86565c999";
var privateKey = "c9dd51e8b7dfa86";
var method = "GET";
var form_id = 4;
var route = `forms/${form_id}/entries`;
var page_size = 1000;
var host = 'https://social7s.com.au/gravityformsapi';

stringToSign = publicKey + ":" + method + ":" + route + ":" + future_unixtime;
sig = CalculateSig(stringToSign, privateKey);

var url = `${host}/${route}?api_key=${publicKey}&signature=${sig}&expires=${future_unixtime}&paging[page_size]=${page_size}`;

/*
   get entries from old website
*/
http.get(url)
.then(function (result) {
  console.log(JSON.stringify(result.data.response.entries))
})

//calculate the signature needed for authentication
function CalculateSig(stringToSign, privateKey){
    var hash = CryptoJS.HmacSHA1(stringToSign, privateKey);
    var base64 = hash.toString(CryptoJS.enc.Base64);
    return encodeURIComponent(base64);
}
