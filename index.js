const linereader = require('line-by-line'),
      metar = require('./metar'),
      lr = new linereader('records.txt'),
      airports = [];

let count = 0;

console.time('Execution time');

lr.on('error', function (err) {
	console.log('There was an error reading from the source file');
});

lr.on('line', function (line) {
  const record = metar.parse(line);
  
  if (!airports[record.ICAO]) {
    airports[record.ICAO] = {};
    airports[record.ICAO].totalWindSpeed = 0;
    airports[record.ICAO].count = 0;
  }

  airports[record.ICAO].totalWindSpeed += record.windInfo.normalizedSpeed;
  airports[record.ICAO].count += 1;
  airports[record.ICAO].averageWindSpeed = airports[record.ICAO].totalWindSpeed / airports[record.ICAO].count;
  count+=1;
  airports[record.ICAO].currentWindSpeed = record.windInfo.normalizedSpeed + ' MPS';
});

lr.on('end', function () {
  console.log(airports);
  console.log('Processing complete. Completed %d records', count);
  console.timeEnd('Execution time');
});
