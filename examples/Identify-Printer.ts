'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'msg'.
const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'William',
    message: 'These are not the droids you are looking for'
  }
};
// eslint-disable-next-line handle-callback-err
printer.execute('Identify-Printer', msg, (err: any, res: any) => {
  console.log(res);
});
