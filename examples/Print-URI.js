'use strict';

const ipp = require('./../ipp');
const PDFDocument = require('pdfkit');

//make a PDF document
const doc = new PDFDocument({ margin: 0 });
doc.text('.', 0, 0);
//doc.addPage();
//doc.text(".", 0, 0);

const printer = ipp.Printer('http://cp02.local.:631/ipp/printer');
const msg = {
  'operation-attributes-tag': {
    'requesting-user-name': 'William',
    'job-name': 'My Test Job',
    'document-format': 'application/pdf',
    'document-uri': 'http://192.168.20.114:5000/check'
  }
};

// eslint-disable-next-line handle-callback-err
printer.execute('Print-URI', msg, (err, res) => {
  console.log(res);
});
