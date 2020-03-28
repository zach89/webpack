// interface formData {
//   params?: object;
// }
const HttpClient = function(method, url, data = {}) {
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
    client.onload = function() {
      if (this.status === 200) {
        const { response } = this;
        resolve(response && JSON.parse(response));
      } else {
        client.onerror();
      }
    };
    client.onerror = function() {
      const { status, response } = this;
      reject({ status, response: response && JSON.parse(response) });
    };
    client.send(clientData);
    // client.onreadystatechange
    // client.onprogress
  });
};

HttpClient.get = function(url, data) {
  return HttpClient('GET', url, data);
};
HttpClient.post = function(url, data) {
  return HttpClient('POST', url, data);
};
HttpClient.put = function(url, data) {
  return HttpClient('PUT', url, data);
};
HttpClient.delete = function(url, data) {
  return HttpClient('DELETE', url, data);
};

export default HttpClient;
