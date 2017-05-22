const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
const recordCreator = require('./recordCreator');
const metar = require('./metar');

const airportData = {};
let count = 0;

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname, 'public/')));

function updateRecords(data) {
  return new Promise((resolve, reject) => {

    const record = metar.parse(data);

    if (!record) reject(Error('Unable to parse record'));

    if (!airportData[record.ICAO]) {
      airportData[record.ICAO] = {};
      airportData[record.ICAO].totalWindSpeed = 0;
      airportData[record.ICAO].count = 0;
    }

    airportData[record.ICAO].totalWindSpeed += record.windInfo.normalizedSpeed;
    airportData[record.ICAO].count += 1;
    airportData[record.ICAO].averageWindSpeed = parseFloat(airportData[record.ICAO].totalWindSpeed / airportData[record.ICAO].count).toFixed(2);
    airportData[record.ICAO].currentWindSpeed = parseFloat(record.windInfo.normalizedSpeed);
    resolve(record);
  });
}

function updateStatus() {
  count = count + 1;
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write("Records generated: " + count);
}

io.on('connection', function (socket) {
  setInterval(() => {
    recordCreator.generateRecord()
    .then(record => {
      socket.emit('record', record);
      updateRecords(record);
      updateStatus();
    })
    .then( record => {
      socket.emit('airportData', JSON.stringify(airportData));
    })
    .catch( err => {
      console.error(err);
    });
  },1000);
});

http.listen(app.get('port'), function() {
  console.log('Listening on *:' + app.get('port'));
});