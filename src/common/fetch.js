const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json;charset=utf-8');

export default {
  url: "http://185.185.69.80:8081/",
  init: {
    mode: "cors",
    credentials: "include",
    headers: myHeaders
  }
}