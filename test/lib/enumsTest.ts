'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'enums'.
const enums = require('../../lib/enums');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('enums', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(enums).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('document-state', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['document-state']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('completed is 0x09', (done: any) => {
      assert.that(enums['document-state'].completed).is.equalTo(0x09);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('finishings', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums.finishings).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('trim-after-job is 0x3f', (done: any) => {
      assert.that(enums.finishings['trim-after-job']).is.equalTo(0x3f);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('operations-supported', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['operations-supported']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('Validate-Document is 0x3d', (done: any) => {
      assert.that(enums['operations-supported']['Validate-Document']).is.equalTo(0x3d);
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('Startup-All-Printers is 0x64', (done: any) => {
      assert.that(enums['operations-supported']['Startup-All-Printers']).is.equalTo(0x64);
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('CUPS-Get-Default is undefined', (done: any) => {
      assert.that(enums['operations-supported']['CUPS-Get-Default']).is.undefined();
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('lookup returns undefined for operation greater 0x64', (done: any) => {
      assert.that(enums['operations-supported'].lookup[0x4001]).is.undefined();
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('cups-operations-supported', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['cups-operations-supported']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('CUPS-Get-Default is 0x4001', (done: any) => {
      assert.that(enums['cups-operations-supported']['CUPS-Get-Default']).is.equalTo(0x4001);
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('CUPS-Get-Printers is 0x4002', (done: any) => {
      assert.that(enums['cups-operations-supported']['CUPS-Get-Printers']).is.equalTo(0x4002);
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('CUPS-Move-Job is 0x400d', (done: any) => {
      assert.that(enums['cups-operations-supported']['CUPS-Move-Job']).is.equalTo(0x400d);
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('CUPS-Create-Local-Printer is 0x4028', (done: any) => {
      assert.that(enums['cups-operations-supported']['CUPS-Create-Local-Printer']).is.equalTo(0x4028);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('job-collation-type', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['job-collation-type']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('uncollated-documents is 0x05', (done: any) => {
      assert.that(enums['job-collation-type']['uncollated-documents']).is.equalTo(0x05);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('job-state', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['job-state']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('completed is 0x09', (done: any) => {
      assert.that(enums['job-state'].completed).is.equalTo(0x09);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('orientation-requested', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['orientation-requested']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('none is 0x07', (done: any) => {
      assert.that(enums['orientation-requested'].none).is.equalTo(0x07);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('print-quality', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['print-quality']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('high is 0x05', (done: any) => {
      assert.that(enums['print-quality'].high).is.equalTo(0x05);
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('printer-state', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      assert.that(enums['printer-state']).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('stopped is 0x05', (done: any) => {
      assert.that(enums['printer-state'].stopped).is.equalTo(0x05);
      done();
    });
  });
});
