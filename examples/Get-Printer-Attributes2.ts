'use strict';

/*
	Poll the printer for a limited set of attributes
*/

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'msg'.
const msg = {
  'operation-attributes-tag': {
    'document-format': 'application/pdf',
    'requested-attributes': [
      'queued-job-count',
      'marker-levels',
      'printer-state',
      'printer-state-reasons',
      'printer-up-time'
    ]
  }
};
function printer_info() {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'err' implicitly has an 'any' type.
  // eslint-disable-next-line handle-callback-err
  printer.execute('Get-Printer-Attributes', msg, (err, res) => {
    console.log(JSON.stringify(res['printer-attributes-tag'], null, 2));
    setTimeout(printer_info, 1);
  });
}
printer_info();
