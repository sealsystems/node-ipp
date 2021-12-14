'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'attributes... Remove this comment to see the full error message
const attributes = require('../../lib/attributes');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('attributes', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(attributes).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('Operation', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an object', (done: any) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Operation' does not exist on type '{}'.
      assert.that(attributes.Operation).is.ofType('object');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('job-uri is an uri', (done: any) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'Operation' does not exist on type '{}'.
      assert.that(attributes.Operation['job-uri']).is.equalTo({ type: 'uri', tag: 0x45, max: 1023 });
      done();
    });
  });
});
