// file to randomly generate records to be processed

const rs = require('randomstring'),
      addZero = require('add-zero');

// random number generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRecord() {

  const airports = [
    'YYZ',
    'LAX',
    'LHR',
    'YHM',
    'HND',
    'FR'
  ]

  // 1-3 random upper case characters
  const ICAO = airports[getRandomInt(0,airports.length - 1)];

  // ensuring single digits are padded as required
  const timestamp = '' + addZero(getRandomInt(1,31),2) + addZero(getRandomInt(0,23)) + addZero(getRandomInt(0,59)) + 'Z';

  // adding randomness to gusts being added
  const gusts = (Math.random() >= 0.5) ? 'G' + addZero(getRandomInt(1,99),2) : '';
  const unit = (Math.random() >= 0.7) ? 'KT' : 'MPS';

  // putting the pieces together
  const windInfo = '' + addZero(getRandomInt(1,999),3) 
                      + addZero(getRandomInt(0,999),2)
                      + gusts
                      + unit;

  return ICAO + ' ' + timestamp + ' ' + windInfo;
}

const records = process.argv[2];

for (var index = 0; index < records; index++) {
  console.log(generateRecord());
}