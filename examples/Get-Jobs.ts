'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('ipp://cp02.local.:631/ipp/printer');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'msg'.
const msg = {
  'operation-attributes-tag': {
    //use these to view completed jobs...
    //	"limit": 10,
    'which-jobs': 'completed',

    'requested-attributes': [
      'job-id',
      'job-uri',
      'job-state',
      'job-state-reasons',
      'job-name',
      'job-originating-user-name',
      'job-media-sheets-completed'
    ]
  }
};

printer.execute('Get-Jobs', msg, (err: any, res: any) => {
  if (err) {
    return console.log(err);
  }
  console.log(res['job-attributes-tag']);
});
