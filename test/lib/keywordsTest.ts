'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keywords'.
const keywords = require('../../lib/keywords');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('keywords', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(keywords).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('printer-state-reasons', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an array', (done: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      assert.that(keywords['printer-state-reasons']).is.ofType('array');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('printer-state-reasons has cover-open', (done: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      assert.that(keywords['printer-state-reasons']).is.containing('cover-open');
      done();
    });
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
  suite('media', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('is an array', (done: any) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'media' does not exist on type '{}'.
      assert.that(keywords.media).is.ofType('array');
      done();
    });
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('media has iso-a0', (done: any) => {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'media' does not exist on type '{}'.
      assert.that(keywords.media).is.containing('iso-a0');
      done();
    });
  });
});
