const linereader = require('line-by-line'),
      metar = require('./metar'),
      lr = new linereader('report.txt'),
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
  airports[record.ICAO].averageWindSpeed = parseFloat(airports[record.ICAO].totalWindSpeed / airports[record.ICAO].count).toFixed(2);
  count+=1;
  airports[record.ICAO].currentWindSpeed = record.windInfo.normalizedSpeed + ' MPS';
});

lr.on('end', function () {
  console.log('AIRPORT | COUNT | AVERAGE (MPS) | CURRENT (MPS)');
  console.log('===============================================')
  for (let airport in airports) {
    console.log(airport +'\t| ' + airports[airport].count + '\t| ' + airports[airport].averageWindSpeed + ' \t| ' + airports[airport].currentWindSpeed);
  }
  console.log('\nProcessing complete. Completed %d records', count);
  console.timeEnd('Execution time');
});