const recordCreator = require('./recordCreator');

const count = process.argv[2] || 1000;

recordCreator.generateRecords(count);
console.log(count + ' records created in report.txt.');
