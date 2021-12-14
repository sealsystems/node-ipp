'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'statusCode... Remove this comment to see the full error message
const statusCodes = require('../../lib/statusCodes');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('statusCodes', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('is an object', (done: any) => {
    assert.that(statusCodes).is.ofType('object');
    done();
  });

  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('server-error-busy is 0x0507', (done: any) => {
    assert.that(statusCodes['server-error-busy']).is.equalTo(0x0507);
    done();
  });
});
