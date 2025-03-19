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
    getAccessToken()
      .then(accessToken => {
        // 使用 fetch 進行 GET 請求，並加上 Authorization Header
        fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept-Encoding': 'gzip, deflate, br',  // 可選：減少數據傳輸
          },
        })
          .then(response => {
            if (!response.ok) {
              reject(`Request failed with status ${response.status}`);
            } else {
              return response.json();
            }
          })
          .then(data => resolve(data))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

export const getTransportData = {
  get: function (paramObj) {
    return get("https://ptx.transportdata.tw/MOTC/v2/Rail/TRA/Station?$top=10&$format=JSON", paramObj);
  }
}

export const getActiveData = {
  get: function (paramObj) {
    return get("https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24top=10&%24format=JSON", paramObj);
  }
}

export const getHotSpot = {
  get: function (paramObj) {
    return get("https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24top=10&%24", paramObj);
  }
}
// 2025 swagger: https://tdx.transportdata.tw/api-service/swagger/basic/cd0226cf-6292-4c35-8a0d-b595f0b15352#/
export const filterCity = {
  get: function (city, paramObj) {
    return get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${city}?%24top=30&%24format=JSON`, paramObj);
  }
}

export const filterActivity = {
  get: function (ActivityID, paramObj) {
    return get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity?%24filter=contains(ActivityID%2C%20'${ActivityID}')&%24format=JSON`, paramObj);
  }
}

export const filterHotScenicSpot = {
  get: function (ScenicSpotID, paramObj) {
    return get(`https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?%24filter=contains(ScenicSpotID%2C%20'${ScenicSpotID}')&%24format=JSON`, paramObj);
  }
}

async function getAccessToken() {
  const tokenUrl = 'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token';
  const clientId = process.env.VUE_APP_CLIENT_ID;
  const clientSecret = process.env.VUE_APP_CLIENT_SECRET;  // 填入你的 Client Secret

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const data = await response.json();
  return data.access_token;
}

