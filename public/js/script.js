var socket = io('http://localhost:3000');

var airportData,
    lastRecords = [];

var airportTable = new Vue({
    el: '#airportTable',
    data: {
        airportData: {}
    },
    created: function() {
      socket.on('airportData', function (data) {
        this.airportData = JSON.parse(data);
    }.bind(this));
    }
});

var lastRecordList = new Vue({
  el: '#lastRecordList',
  data: {
    records: lastRecords
  },
  created: function() {
    socket.on('record', function (record) {
      console.log(lastRecords);
      lastRecords.unshift(record);
      if (lastRecords.length > 10) {
        lastRecords.length = 10;
      }
      this.records = lastRecords;  
    }.bind(this));
  }
});