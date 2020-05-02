const express = require('express');

const appPort = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
	res.send('hello world');
});

app.listen(appPort);
console.log(`app is running. port: ${appPort}`);
console.log(`http://127.0.0.1:${appPort}/`);
