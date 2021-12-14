'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// eslint-disable-next-line handle-callback-err
printer.execute('Get-Printer-Attributes', null, (err: any, res: any) => {
  console.log(res);
});
