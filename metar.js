exports.parse = (line) => {
  // match the first 2-3 letters
  const ICAO = line.match(/^[a-zA-Z]{2,3}/g);
  
  // pull out the timestamp. not doing more parsing from here, as we're
  // currently not doing anything with the time.
  const timestamp = line.match(/\s\d{6}Z/g)[0].replace('Z','').trim();

  const windInfoRaw = /\dZ\s(\S*)/g.exec(line)[1];
  const windInfo = {
    direction: windInfoRaw.match(/^\d{3}/g),
    speed: /^\d{3}(\d{2,3})/g.exec(windInfoRaw)[1],
    gusts: windInfoRaw.includes('G') ? /G(\d{2})/g.exec(windInfoRaw)[1] : null,
    unit: windInfoRaw.match(/KT$|MPS$/g)
  };

  return {
    ICAO,
    timestamp,
    windInfo
  }
}