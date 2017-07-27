const weather = require('./index.js');

const query = process.argv.slice(2).join("/").replace(' ', '_');

weather.get(query);