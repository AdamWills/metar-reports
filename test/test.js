const assert = require('assert');
const metar = require('../metar');
const examples = ['YYZ 122201Z 12023MPS', 'LAX 022355Z 09332G78KT', 'FR 110232Z 001100G121MPS'];

describe('Metar Parsing', () =>  {

  describe('Error catching', () => {
    it('should gracefully fail with no data', () => {
      assert.equal(null, metar.parse());
      assert.equal(null, metar.parse(''));
    });

    it('should gracefully fail with improper data', () => {
      assert.equal(null, metar.parse('YYZ'));
      assert.equal(null, metar.parse('YYZ 22201 12023MPS'));
      assert.equal(null, metar.parse('YYZ22201Z12023MPS'));
      assert.equal(null, metar.parse('YYZ 122201Z 12023ERR'));
    });

  })

  describe('# ICAO Code', () => {

    it('should parse three letters ', () => {
      assert.equal('YYZ', metar.parse(examples[0]).ICAO);
      assert.equal('LAX', metar.parse(examples[1]).ICAO);
    });
    
    it('should parse two letters ', () => {
      assert.equal('FR', metar.parse(examples[2]).ICAO);
    });

  });

  describe('# Timestamp', () => {
    it('should parse the timestamp', () => {
      assert.equal('122201', metar.parse(examples[0]).timestamp);
    });
  });

  describe('# Wind Info', () => {
    it('should pull the direction', () => {
      assert.equal(120, metar.parse(examples[0]).windInfo.direction);
      assert.equal(93, metar.parse(examples[1]).windInfo.direction);
      assert.equal(1, metar.parse(examples[2]).windInfo.direction);
    });

    it('should pull the speed', () => {
      assert.equal(23, metar.parse(examples[0]).windInfo.speed);
      assert.equal(32, metar.parse(examples[1]).windInfo.speed);
      assert.equal(100, metar.parse(examples[2]).windInfo.speed);
    });

    it('should pull the gusts', () => {
      assert.equal(null, metar.parse(examples[0]).windInfo.gusts);
      assert.equal(78, metar.parse(examples[1]).windInfo.gusts);
      assert.equal(121, metar.parse(examples[2]).windInfo.gusts);
    });

    it('should pull the unit', () => {
      assert.equal('MPS', metar.parse(examples[0]).windInfo.unit);
      assert.equal('KT', metar.parse(examples[1]).windInfo.unit);
      assert.equal('MPS', metar.parse(examples[2]).windInfo.unit);
    });

    it('should normalize the speed', () => {
      assert.equal(23, metar.parse(examples[0]).windInfo.normalizedSpeed);
      assert.equal(16, metar.parse(examples[1]).windInfo.normalizedSpeed);
      assert.equal(100, metar.parse(examples[2]).windInfo.normalizedSpeed);
    });
  });

});