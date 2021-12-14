'use strict';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'assert'.
const assert = require('assertthat');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'moment'.
const moment = require('moment');

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'suite'. Do you need to install t... Remove this comment to see the full error message
suite('attributes', () => {
  // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('create correct iso time', async () => {
    const sign = '+';
    const timezone = 120;
    const dateTime = moment();
    dateTime.utcOffset(sign === '+' ? -1 * timezone : timezone);
    dateTime.month(4);
    dateTime.date(30);
    dateTime.hour(14);
    dateTime.minute(26);
    dateTime.second(0);
    dateTime.millisecond(0);
    dateTime.year(2021);

    const result = new Date(dateTime.toISOString()).toISOString();

    assert.that(result).is.equalTo('2021-05-30T16:26:00.000Z');
  });
});
