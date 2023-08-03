import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// import cors from 'cors';
// import express from 'express';

// const http = require("http");
// const WebSocket = require("ws");
// const server = http.createServer(app);

const app = createApp(App)
// app.use(express);

// var whitelist = ['http://127.0.0.1:3000/createBlog', 'http://localhost:5173/']
// var corsOptions = {
//     origin: 
//     function (origin, callback) {
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1
//         callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
//       }
    // optionsSuccessStatus: 200
// };

// const websocketServer = new WebSocket.Server({ port: 3000 });
// app.use(cors(corsOptions));

// app.use('/', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for a whitelisted domain.'})
//   })

app.use(router)

// server.listen(3000, () => {
app.mount('#app');
// })
