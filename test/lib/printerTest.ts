'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const proxyquire = require('proxyquire');

let lastWriteableStream: any;
let requestError: any;
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printer'.
const printer = proxyquire('../../lib/printer', {
  './request'(url: any, buf: any, writeableStream: any, cb: any) {
    if (!cb) {
      cb = writeableStream;
      writeableStream = null;
    }
    lastWriteableStream = writeableStream;
    cb(requestError);
  }
});

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('printer', () => {
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'setup'.
  setup(async () => {
    requestError = null;
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is a function', async () => {
    assert.that(printer).is.ofType('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('printer.execute is a function', async () => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    assert.that(ippPrinter.execute).is.ofType('function');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('uses protocol from url', async () => {
    const url = 'hugo://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(url);

    assert.that(ippPrinter.uri).is.equalTo('hugo://localhost:6631/ipp/print/foo');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('uses protocol from options.uri', async () => {
    const url = 'hugo://localhost:6631/ipp/print/foo';
    const options = { uri: 'hansi://localhost:6631/ipp/print/bar' };
    const ippPrinter = printer(url, options);

    assert.that(ippPrinter.uri).is.equalTo('hansi://localhost:6631/ipp/print/bar');
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('printer.execute calls request without output stream', (done: any) => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    const msg = {
      'operation-attributes-tag': {
        'requesting-user-name': 'William',
        'job-name': 'My Test Job',
        'document-format': 'application/pdf'
      },
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
      data: Buffer.from('huhu')
    };
    ippPrinter.execute('op', msg, (err: any) => {
      assert.that(err).is.null();
      assert.that(lastWriteableStream).is.undefined();
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('printer.execute calls request with output stream', (done: any) => {
    const uri = 'ipp://localhost:6631/ipp/print/foo';
    const ippPrinter = printer(uri);

    const msg = {
      'operation-attributes-tag': {
        'requesting-user-name': 'William',
        'job-name': 'My Test Job',
        'document-format': 'application/pdf'
      },
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
      data: Buffer.from('huhu'),
      output: { outputStream: true }
    };
    ippPrinter.execute('op', msg, (err: any) => {
      assert.that(err).is.null();
      assert.that(lastWriteableStream).is.equalTo({ outputStream: true });
      done();
    });
  });
});
