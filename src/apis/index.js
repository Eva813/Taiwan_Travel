import axios from 'axios'
import jsSHA from "jssha"

//Vue & Axios 封裝,https://ithelp.ithome.com.tw/articles/10204698
//jsSHA,https://segmentfault.com/a/1190000038684337

// axios.get(
//   'https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON',
//   {
//     headers: getAuthorizationHeader()
//   }
// )
//   .then(function (response) {
//     console.log(JSON.stringify(response.data))
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

export function get(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: getAuthorizationHeader()
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export const getTransportData = {
  get: function (paramObj) {
    return get("https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON", paramObj);
  }
}

export const getActiveData = {
  get: function (paramObj) {
    return get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?%24top=10&%24format=JSON", paramObj);
  }
}

function getAuthorizationHeader() {
  //  填入自己 ID、KEY 開始
  let AppID = '366051c0c1b74b03beaab80a9b7af7b7';
  let AppKey = 'IFAvXgau9Z9-Cwztbu98F53jkpM';
  //  填入自己 ID、KEY 結束
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update('x-date: ' + GMTString);
  let HMAC = ShaObj.getHMAC('B64');
  let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
  return { 'Authorization': Authorization, 'X-Date': GMTString };
}
