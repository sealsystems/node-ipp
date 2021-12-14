'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tags'.
const tags = require('../../lib/tags');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('tags', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(tags).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('job-attributes-tag is 0x02', (done: any) => {
    assert.that(tags['job-attributes-tag']).is.equalTo(0x02);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('integer is 0x21', (done: any) => {
    assert.that(tags.integer).is.equalTo(0x21);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('uri is 0x45', (done: any) => {
    assert.that(tags.uri).is.equalTo(0x45);
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('memberAttrName is 0x4a', (done: any) => {
    assert.that(tags.memberAttrName).is.equalTo(0x4a);
    done();
  });
});
