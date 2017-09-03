import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  else if (response.status == 302) {
    console.log('buc.....');
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, _options) {

  const options = _options||{};

  let optiondata = Object.assign(options, {
    credentials: 'include'
  });


  const response = await fetch(url, optiondata);

  checkStatus(response);

  const message = await response.json();
  if (message)
    return message;
  else {
    throw new Error('data format error,');
  }
}
