'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parser'.
const parser = require('../../lib/parser');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('parser', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is a function', (done: any) => {
    assert.that(parser).is.ofType('function');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('throw error if ipp message is cut before group', (done: any) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
        '00000001', // reqid
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    assert
      .that(() => {
        parser(data);
      })
      .is.throwing('NotEnoughData');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('throw error if ipp message is cut before group attributes', (done: any) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
        '01', // operation-attributes-tag
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    assert
      .that(() => {
        parser(data);
      })
      .is.throwing('NotEnoughData');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('throw error if ipp message is cut inside group attributes', (done: any) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const baseData = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
        '01', // operation-attributes-tag
      'hex'
    );
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const attributes = Buffer.from(
      '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    /* eslint-disable no-loop-func */
    for (let l = 1; l <= attributes.length; l++) {
      assert
        .that(() => {
          // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
          const data = Buffer.concat([baseData, attributes.slice(0, l)]);

          parser(data);
        })
        .is.throwing('NotEnoughData');
    }
    /* eslint-enable no-loop-func */
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

    assert.that(parser(data)).is.equalTo({
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

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('can parse CUPS-Get-Printers', (done: any) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const data = Buffer.from(
      '0200' + // version 2.0
      '4002' + // CUPS-Get-Printers
      '00000001' + // reqid
      '01' + // operation-attributes-tag
        // blah blah the required bloat of this protocol
        '470012617474726962757465732d6368617273657400057574662d3848001b617474726962757465732d6e61747572616c2d6c616e67756167650002656e' +
        '03', // end-of-attributes-tag
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    assert.that(parser(data)).is.equalTo({
      version: '2.0',
      operation: 'CUPS-Get-Printers',
      statusCode: undefined,
      id: 1,
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en'
      }
    });
    done();
  });
});
