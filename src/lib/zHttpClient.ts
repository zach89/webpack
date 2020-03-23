// eslint-disable-next-line func-names
interface formData {
  params?: object;
}
const HttpClient = function(method: string, url: string, data: formData = {}) {
  return new Promise((resolve, reject) => {
    const client = new XMLHttpRequest();
    let clientUrl = url;
    let clientData = null;
    if (method.toLowerCase() === 'get') {
      const { params = {} } = data;
      Object.keys(params).forEach((k, i) => {
        clientUrl += `${i === 0 ? '?' : '&'}${k}=${params[k]}`;
      });
    } else {
      clientData = JSON.stringify(data);
    }
    client.open(method, clientUrl);
    client.setRequestHeader('content-type', 'application/json;charset=UTF-8');
    if (typeof data === 'string') {
      client.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      clientData = data;
    }
    client.send(clientData);
    // client.onreadystatechange
    // client.onprogress
    // eslint-disable-next-line func-names
    client.onload = function() {
      if (this.status === 200) {
        const { response } = this;
        resolve(response && JSON.parse(response));
      } else {
        // client.onerror();
      }
    };
    // eslint-disable-next-line func-names
    client.onerror = function() {
      const { status, response } = this;
      // eslint-disable-next-line prefer-promise-reject-errors
      reject({ status, response: response && JSON.parse(response) });
    };
  });
};

// eslint-disable-next-line func-names
HttpClient.get = function(url: string, data: formData) {
  return HttpClient('GET', url, data);
};
// eslint-disable-next-line func-names
HttpClient.post = function(url: string, data: formData) {
  return HttpClient('POST', url, data);
};
// eslint-disable-next-line func-names
HttpClient.put = function(url: string, data: formData) {
  return HttpClient('PUT', url, data);
};
// eslint-disable-next-line func-names
HttpClient.delete = function(url: string, data: formData) {
  return HttpClient('DELETE', url, data);
};

export default HttpClient;
