'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PDFDocumen... Remove this comment to see the full error message
const PDFDocument = require('pdfkit');

//make a PDF document
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'doc'.
const doc = new PDFDocument({ margin: 0 });
doc.text('.', 0, 0);
//doc.addPage();
//doc.text(".", 0, 0);

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'msg'.
const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'William',
    'job-name': 'My Test Job',
    'document-format': 'application/pdf',
    'document-uri': 'http://192.168.20.114:5000/check'
  }
};
// eslint-disable-next-line handle-callback-err
printer.execute('Print-URI', msg, (err: any, res: any) => {
  console.log(res);
});
