# calculator

Кроме *Login* остальное API не удалось подключить из-за ограничений *CORS*
```
Access to fetch at 'http://185.185.69.80:8081/' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.
```
Для работы с *HttpOnly токеном*, в fetch я включил флаг *credentials:include*.
В ответе сервера 'Access-Control-Allow-Credentials' должен быть в значении 'true'.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
