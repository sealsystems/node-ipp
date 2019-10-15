'use strict';

const ipp = require('./../ipp');

const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// eslint-disable-next-line handle-callback-err
printer.execute('Get-Printer-Attributes', null, (err, res) => {
  console.log(res);
});
