exports.parse = (line) => {
  // match the first 2-3 letters
  const ICAO = line.match(/^[a-zA-Z]{2,3}/g);
  
  // pull out the timestamp. not doing more parsing from here, as we're
  // currently not doing anything with the time.
  const timestamp = /\s(\d{6})Z/g.exec(line)[1];

  // parse the raw wind information to start
  const windInfoRaw = /\dZ\s(\S*)/g.exec(line)[1];
  
  // calculate the individual pieces
  const direction = windInfoRaw.match(/^\d{3}/g)[0];
  const unit = windInfoRaw.match(/KT$|MPS$/g)[0];
  const speed = parseInt(/^\d{3}(\d{2,3})/g.exec(windInfoRaw)[1]);
  const gusts = windInfoRaw.includes('G') ? /G(\d{2})/g.exec(windInfoRaw)[1] : null;
  const normalizedSpeed = ('KT' === unit) ? (speed / 2) : speed;

  const windInfo = {
    direction,
    gusts,
    speed,
    unit,
    normalizedSpeed
  };

  return {
    ICAO,
    timestamp,
    windInfo
  }
}