'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'msg'.
const msg = {
  'operation-attributes-tag': {
    'job-uri': 'ipp://CP01.local/ipp/printer/0186'
  }
};
function go() {
  // eslint-disable-next-line handle-callback-err
  printer.execute('Get-Job-Attributes', msg, (err: any, res: any) => {
    console.log(res);
    setTimeout(go, 0);
  });
}
go();
