
/*
	Poll the printer for a limited set of attributes
*/

import ipp from './../ipp';

const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
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
    // eslint-disable-next-line handle-callback-err
  printer.execute('Get-Printer-Attributes', msg, (err, res) => {
    console.log(JSON.stringify(res['printer-attributes-tag'], null, 2));
    setTimeout(printer_info, 1);
  });
}
printer_info();
