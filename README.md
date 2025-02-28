# device-managment-dashboard

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev //goto http://localhost:3000/

```

### If request daily limit is reached

```sh
npm run server

```

In case the limit of requests is reached replace on vite.config.ts file >vproxy >taget: proxy http://localhost:5000/ and run npm run server so you can use the local json server

```sh
npm run build
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
