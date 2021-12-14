'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'StreamPars... Remove this comment to see the full error message
const StreamParser = require('../../lib/StreamParser');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'serialize'... Remove this comment to see the full error message
const serialize = require('../../lib/serializer');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('StreamParser', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is a function', (done: any) => {
    assert.that(StreamParser).is.ofType('function');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('returns no attributes and streams no data if ipp message is incomplete', (done: any) => {
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

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const streamParser = new StreamParser();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('attributes', () => {
      assert.that('the attributes').is.equalTo('should not be emitted');
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('data', () => {
      assert.that('the data stream').is.equalTo('should not emit data');
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('end', () => {
      done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'StreamParse... Remove this comment to see the full error message
    streamParser.end();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('omits unknown tags', (done: any) => {
    const data = serialize({
      operation: 'CUPS-Get-Printers',
      'operation-attributes-tag': {
        'attributes-charset': 'utf-8',
        'attributes-natural-language': 'en',
        schrott: 'hugo'
      }
    });

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const streamParser = new StreamParser();
    let attrCalled = false;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('attributes', (attr: any) => {
      attrCalled = true;
      assert.that(attr['operation-attributes-tag']['attributes-charset']).is.equalTo('utf-8');
      assert.that(attr['operation-attributes-tag']['attributes-natural-language']).is.equalTo('en');
      assert.that(attr['operation-attributes-tag'].schrott).is.undefined();
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'StreamParser... Remove this comment to see the full error message
    streamParser.on('data', () => {
      assert.that('the data stream').is.equalTo('should not emit data');
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('end', () => {
      assert.that(attrCalled).is.true();
      done();
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('error', (err: any) => {
      done(err);
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'StreamParse... Remove this comment to see the full error message
    streamParser.end();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('returns no data if tag is unknown', (done: any) => {
    /* eslint-disable line-comment-position */
    /* eslint-disable no-inline-comments */
    // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'Buffer'. Do you need to install ... Remove this comment to see the full error message
    const data = Buffer.from(
      '0200' + // version 2.0
      '000B' + // Get-Printer-Attributes
      '00000001' + // reqid
      '01' + // operation-attributes-tag
        // unknown attribute
        '1200147072696e7465722d67656f2d6c6f636174696f6e0000',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const streamParser = new StreamParser();
    let dataEmitted = false;

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('attributes', () => {
      assert.that('the attributes').is.equalTo('should not be emitted');
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'StreamParser... Remove this comment to see the full error message
    streamParser.on('data', () => {
      dataEmitted = true;
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('end', () => {
      assert.that(dataEmitted).is.equalTo(false);
      done();
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('error', (err: any) => {
      assert.that(err.message).is.startingWith('This should not happen.');
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'StreamParse... Remove this comment to see the full error message
    streamParser.end();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('returns message and data if send in one chunk', (done: any) => {
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
      '03' + // end-of-attributes-tag
        '54657374',
      'hex'
    );
    /* eslint-enable line-comment-position */
    /* eslint-enable no-inline-comments */

    let attributesOk = false;
    let dataOk = false;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const streamParser = new StreamParser();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('attributes', (attributes: any) => {
      assert.that(attributes).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      attributesOk = true;
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'StreamParser... Remove this comment to see the full error message
    streamParser.on('data', (chunk: any) => {
      assert.that(chunk.length).is.equalTo(4);
      assert.that(chunk.toString('utf8')).is.equalTo('Test');
      dataOk = true;
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('end', () => {
      assert.that(attributesOk).is.true();
      assert.that(dataOk).is.true();
      done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'StreamParse... Remove this comment to see the full error message
    streamParser.end();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('returns message and data if send in two chunks', (done: any) => {
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

    let attributesOk = false;
    let dataOk = false;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    const streamParser = new StreamParser();

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('attributes', (attributes: any) => {
      assert.that(attributes).is.equalTo({
        version: '2.0',
        operation: 'Get-Printer-Attributes',
        id: 1,
        'operation-attributes-tag': {
          'attributes-charset': 'utf-8',
          'attributes-natural-language': 'en'
        }
      });
      attributesOk = true;
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'on' does not exist on type 'StreamParser... Remove this comment to see the full error message
    streamParser.on('data', (chunk: any) => {
      assert.that(chunk.length).is.equalTo(4);
      assert.that(chunk.toString('utf8')).is.equalTo('Test');
      dataOk = true;
    });
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'once' does not exist on type 'StreamPars... Remove this comment to see the full error message
    streamParser.once('end', () => {
      assert.that(attributesOk).is.true();
      assert.that(dataOk).is.true();
      done();
    });

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(data);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'write' does not exist on type 'StreamPar... Remove this comment to see the full error message
    streamParser.write(Buffer.from('54657374', 'hex'));
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'end' does not exist on type 'StreamParse... Remove this comment to see the full error message
    streamParser.end();
  });
});
