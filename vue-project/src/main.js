import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// const http = require("http");
// const WebSocket = require("ws");
// const server = http.createServer(app);

const app = createApp(App)

// const websocketServer = new WebSocket.Server({ port: 3000 });


app.use(router)

// server.listen(3000, () => {
app.mount('#app')
// })
