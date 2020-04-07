'use strict';

const assert = require('assertthat');
const proxyquire = require('proxyquire');

let lastWriteableStream;
let requestError;
const printer = proxyquire('../../lib/printer', {
  './request'(url, buf, writeableStream, cb) {
    if (!cb) {
      cb = writeableStream;
      writeableStream = null;
    }
    lastWriteableStream = writeableStream;
    cb(requestError);
  }
});

suite('printer', () => {
  setup(async () => {
    requestError = null;
  });

  test('is a function', async () => {
    assert.that(printer).is.ofType('function');
  });

  test('printer.execute is a function', async () => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    assert.that(ippPrinter.execute).is.ofType('function');
  });

  test('printer.execute calls request without output stream', (done) => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    const msg = {
      'operation-attributes-tag': {
        'requesting-user-name': 'William',
        'job-name': 'My Test Job',
        'document-format': 'application/pdf'
      },
      data: Buffer.from('huhu')
    };
    ippPrinter.execute('op', msg, (err) => {
      assert.that(err).is.null();
      assert.that(lastWriteableStream).is.undefined();
      done();
    });
  });

  test('printer.execute calls request with output stream', (done) => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    const msg = {
      'operation-attributes-tag': {
        'requesting-user-name': 'William',
        'job-name': 'My Test Job',
        'document-format': 'application/pdf'
      },
      data: Buffer.from('huhu'),
      output: { outputStream: true }
    };
    ippPrinter.execute('op', msg, (err) => {
      assert.that(err).is.null();
      assert.that(lastWriteableStream).is.equalTo({ outputStream: true });
      done();
    });
  });
});
