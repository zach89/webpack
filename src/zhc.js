const httpClient = function(method, url, data = {}) {
  return new Promise(function(resolve, reject) {
    const client = new XMLHttpRequest();
    let clientUrl = url;
    let clientData = null;
    if (method.toLowerCase() == "get") {
      const { params = {} } = data; //for getJson
      Object.keys(params).forEach((k, i) => {
        clientUrl += `${i === 0 ? "?" : "&"}${k}=${params[k]}`;
      });
    } else {
      clientData = JSON.stringify(data);
    }
    client.open(method, clientUrl);
    client.setRequestHeader("content-type", "application/json; charset=UTF-8");
    if (typeof data === "string") {
      client.setRequestHeader(
        "content-type",
        "application/x-www-form-urlencoded"
      );
      clientData = data;
    }
    client.send(clientData);
    // client.onreadystatechange
    // client.onprogress
    client.onload = function() {
      if (this.status === 200) {
        const { response } = this;
        resolve(response && JSON.parse(this.response));
      } else {
        client.onerror();
      }
    };
    client.onerror = function() {
      const { response, status } = this;
      reject({ status, response: response && JSON.parse(response) });
    };
  });
};
httpClient.get = function(url, data) {
  return httpClient("GET", url, data);
};
httpClient.post = function(url, data) {
  return httpClient("POST", url, data);
};
httpClient.put = function(url, data) {
  return httpClient("PUT", url, data);
};
httpClient.delete = function(url, data) {
  return httpClient("DELETE", url, data);
};

export default httpClient;
