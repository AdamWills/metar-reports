exports.parse = (line) => {

  if (!line) return null;

  const parsedData = /(^[a-zA-Z]{2,3})\s(\d{6})Z\s(\d{3})(\d{2,3})(G\d{2,3})?(KT$|MPS$)/g.exec(line);

  if (!parsedData) return null;

  const ICAO = parsedData[1];
  const timestamp = parsedData[2];
  const direction = parseInt(parsedData[3]);
  const speed = parseInt(parsedData[4]);
  const gusts = (parsedData[5]) ? parseInt(parsedData[5].replace('G','')) : null;
  const unit = parsedData[6];
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