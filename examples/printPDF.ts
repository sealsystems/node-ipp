'use strict';

const ipp = require('./../ipp');
const PDFDocument = require('pdfkit');
const concat = require('concat-stream');

const doc = new PDFDocument({ margin: 0 });
doc.text('.', 0, 0);

doc.pipe(
  concat((data) => {
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
    printer.execute('Print-Job', msg, (err, res) => {
      console.log(err);
      console.log(res);
    });
  })
);
doc.end();
