'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('./../ipp');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'PDFDocumen... Remove this comment to see the full error message
const PDFDocument = require('pdfkit');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const concat = require('concat-stream');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'doc'.
const doc = new PDFDocument({ margin: 0 });
doc.text('.', 0, 0);

doc.pipe(
  concat((data: any) => {
    const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
    const msg = {
      'operation-attributes-tag': {
        'requesting-user-name': 'Bumblebee',
        'job-name': 'whatever.pdf',
        'document-format': 'application/pdf'
      },
      'job-attributes-tag': {
        'media-col': {
          'media-source': 'tray-2'
        }
      },
      data
    };
    printer.execute('Print-Job', msg, (err: any, res: any) => {
      console.log(err);
      console.log(res);
    });
  })
);
doc.end();
