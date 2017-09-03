import request from '../utils/request';

export function postJson(url, option) {
  let optiondata = option || {};
  let data = {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
    body: objToString(optiondata)
  };
  return request(url, data);
}

export function getJson(url) {
  let data = {
    method: 'get',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
  };
  return request(url);
}


function objToString(obj) {
  let strArray = [];
  for (let i in obj) {
    strArray.push(i + "=" + encodeURIComponent(obj[i]))
  }
  return strArray.join("&")
}
