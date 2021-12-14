'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ipp'.
const ipp = require('../ipp.js');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('ipp', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(ipp).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('ipp.parse()', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is a function', (done: any) => {
      assert.that(ipp.parse).is.ofType('function');
      done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('can parse Get-Printer-Attributes', (done: any) => {
      /* eslint-disable line-comment-position */
      /* eslint-disable no-inline-comments */
      // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
      const data = Buffer.from(
        '0200' + // version 2.0
        '000B' + // Get-Printer-Attributes
        '00000001' + // reqid
        '01' + // operation-attributes-tag
          // blah blah the required bloat of this protocol
          '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
          '03', // end-of-attributes-tag
        'hex'
      );
      /* eslint-enable line-comment-position */
      /* eslint-enable no-inline-comments */

      assert.that(ipp.parse(data)).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('ipp.StreamParser', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is a function', (done: any) => {
      assert.that(ipp.StreamParser).is.ofType('function');
      done();
    });
  });
});
